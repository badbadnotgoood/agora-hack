import json
import re
import os
import random
from typing import Union, List, Dict

# import simplemma
# from syntok.tokenizer import Tokenizer
import numpy as np
from sklearn.decomposition import TruncatedSVD
from sklearn.feature_extraction.text import *
from sklearn.neighbors import NearestNeighbors

import models

with open(os.environ.get('DATASET_PATH', default='data/agora_hack_products.json')) as f:
    train_dataset = json.load(f)

train_dict = {x['product_id']: x for x in train_dataset}

clear_string = lambda x: re.sub(' +', ' ', re.sub(r"[^а-яА-Яa-zA-Z\d\s\,.:!?]", "",
                                                  x.replace('\t', ': ').replace('-', ' - ').replace('/',
                                                                                                    ' / '))).strip()

combined_dict = dict()
for (id, x) in train_dict.items():
    combined_dict[id] = clear_string(x['name']) + " | " + clear_string(" ".join(x['props']))

reference_ids = set([x for x, y in train_dict.items() if y['is_reference']])
non_reference_ids = [x for x, y in train_dict.items() if not y['is_reference']]

only_refs_texts = list(map(lambda x: x[1], filter(lambda x: x[0] in reference_ids, combined_dict.items())))

tfidf_vectorizer = TfidfVectorizer(max_df=0.5, min_df=1, ngram_range=(3, 3), smooth_idf=False, sublinear_tf=True,
                                   decode_error='ignore', analyzer='char_wb')
tf_idf_matrix = tfidf_vectorizer.fit_transform(only_refs_texts)

tsvd = TruncatedSVD(n_components=len(only_refs_texts))
tf_idf_vectors = tsvd.fit_transform(tf_idf_matrix)

enumerated_dataset = dict(zip(range(len(train_dict)), train_dict.keys()))
ref_num_ids = np.array([x for x, y in enumerated_dataset.items() if y in reference_ids])

nn = NearestNeighbors(n_neighbors=1)
nn.fit(tf_idf_vectors)

SIMILARITY_THRESH = os.environ.get('SIMILARITY_THRESH', default=0.9)


def _calc_prediction_uid(item: models.InputItemModel) -> Union[str, None]:
    text = clear_string(item.name) + " | " + clear_string(" ".join(item.props))
    vector = tsvd.transform(tfidf_vectorizer.transform([text]))
    ref_neibs = nn.kneighbors(vector)
    if ref_neibs[0][0][0] > SIMILARITY_THRESH:
        return None
    real_ref_id = ref_num_ids[ref_neibs[1][0][0]]
    prediction_uid = enumerated_dataset[real_ref_id]
    return prediction_uid


def _props_generator(props_list: List[str]) -> Dict[str, Union[List[str], List[models.WebPropsModel]]]:
    nulls = []
    props = []
    for text in props_list:
        splitted = text.split('\t', maxsplit=1)
        if len(splitted) == 1:
            nulls.append(clear_string(splitted[0]))
        else:
            props.append(models.WebPropsModel(key=clear_string(splitted[0]), value=clear_string(splitted[1])))
    return {'props': props, 'nulls': nulls}


def web_work_examples(count=10) -> List[models.WebOutputModel]:
    samples = []
    random_ids = random.choices(non_reference_ids, k=count)
    for id in random_ids:
        info = train_dict[id]
        model = models.InputItemModel(id=id, name=clear_string(info['name']), props=info['props'])
        samples.append(model)
    return list(map(web_process_item, samples))


def web_process_item(item: models.InputItemModel) -> models.WebOutputModel:
    prediction_uid = _calc_prediction_uid(item)
    item_model = models.WebOutputItemModel(name=item.name, **_props_generator(item.props))
    if not prediction_uid:
        return models.WebOutputModel(item=item_model, referenceItem=None)
    reference_info = train_dict[prediction_uid]
    reference_model = models.WebOutputItemModel(name=clear_string(reference_info['name']),
                                                **_props_generator(reference_info['props']))
    return models.WebOutputModel(item=item_model, referenceItem=reference_model)


def hack_process_item(item: models.InputItemModel) -> models.HackOutputItemModel:
    prediction_uid = _calc_prediction_uid(item)
    if not prediction_uid:
        return models.HackOutputItemModel(id=item.id, reference_id=None)
    return models.HackOutputItemModel(id=item.id, reference_id=prediction_uid)

