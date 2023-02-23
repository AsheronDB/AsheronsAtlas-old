SELECT
    lb.guid as guid,
    lb.weenie_Class_Id as wcid,
    w_string_name.value as name,
    w_did_icon.value as icon,
    'settlement_portal_hub' as `category`,
    lb.obj_Cell_Id as objCellId,
    lb.origin_X as originX,
    lb.origin_Y as originY,
    lb.origin_Z as originZ
FROM
    landblock_instance AS lb
    LEFT JOIN weenie AS w ON lb.weenie_Class_Id = w.class_Id
    LEFT JOIN weenie_properties_string AS w_string_name ON lb.weenie_Class_Id = w_string_name.object_Id AND w_string_name.type = 1
    LEFT JOIN weenie_properties_d_i_d AS w_did_icon ON lb.weenie_Class_Id = w_did_icon.object_Id AND w_did_icon.type = 8
WHERE
    lb.weenie_Class_Id = 12774