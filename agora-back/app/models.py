from pydantic import BaseModel
from typing import List, Optional, Any


# ---- Модели для веб-интерфейса ----

# Пропсы на фронт
class WebPropsModel(BaseModel):
    key: str
    value: str


# Айтем общий на фронт
class WebOutputItemModel(BaseModel):
    name: str
    nulls: List[str] = []
    props: List[WebPropsModel] = []


# Объект из одного эталона и x > 0, где x => айтемы похожие на эталон
class WebOutputModel(BaseModel):
    referenceItem: Optional[WebOutputItemModel]
    item: WebOutputItemModel


# ---- Модели для организаторов хакатона ----

class HackOutputItemModel(BaseModel):
    id: str
    reference_id: Optional[str]


# ---- Общие моедли ----

class InputItemModel(BaseModel):
    id: str = "d7edb35aee64cc0b"
    name: str = "Встраиваемая стиральная машина Bosch WIW-24340oe"
    props: List[str] = ["Защита от протечек, от детей, от скачков питания", "Скорость   отжима\t1200 об/мин",
                        "Доп.функции  контроль за уровнем пены, интеллектуальное управление стиркой, выбор скорости "
                        "отжима, выбор температуры стирки, сигнал окончания стирки, контроль баланса"]

