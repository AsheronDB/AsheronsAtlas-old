SELECT
    lb.guid as guid,
    lb.weenie_Class_Id as wcid,
    'lifestone' as `category`,
    w.type as weenieType,
    w_int_itemtype.value as itemType,
    w_string_use.value as useString,
    w_string_name.value as name,
    w_did_icon.value as icon,
    w_int_uieffect.value as uiEffect,
    w_int_underlay.value as iconUnderlay,
    lb.obj_Cell_Id as objCellId,
    lb.origin_X as originX,
    lb.origin_Y as originY,
    lb.origin_Z as originZ
FROM
    landblock_instance AS lb
    LEFT JOIN weenie AS w ON lb.weenie_Class_Id = w.class_Id
    LEFT JOIN weenie_properties_string AS w_string_name ON lb.weenie_Class_Id = w_string_name.object_Id AND w_string_name.type = 1
    LEFT JOIN weenie_properties_string AS w_string_use ON lb.weenie_Class_Id = w_string_use.object_Id AND w_string_use.type = 14
    LEFT JOIN weenie_properties_int AS w_int_itemtype ON lb.weenie_Class_Id = w_int_itemtype.object_Id
    AND w_int_itemtype.type = 1
    LEFT JOIN weenie_properties_int AS w_int_uieffect ON lb.weenie_Class_Id = w_int_uieffect.object_Id AND w_int_uieffect.type = 18
    LEFT JOIN weenie_properties_int AS w_int_underlay ON lb.weenie_Class_Id = w_int_underlay.object_Id AND w_int_underlay.type = 52
    LEFT JOIN weenie_properties_d_i_d AS w_did_icon ON lb.weenie_Class_Id = w_did_icon.object_Id AND w_did_icon.type = 8
WHERE
    w.type = 25
    AND LEFT(LPAD(HEX(lb.obj_Cell_Id), 8, '0'), 4) NOT IN (?)