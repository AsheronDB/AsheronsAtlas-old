SELECT
    lb1.guid as slumGuid,
    lb2.obj_Cell_Id as objCellId,
    w_string.value as name,
    lb1.weenie_Class_Id as slumWcid,
    lb1.origin_X as slumOriginX,
    lb1.origin_Y as slumOriginY,
    lb1.origin_Z as slumOriginZ,
    'house' as `category`,
    lb1.obj_Cell_Id as slumObjCellId,
    lb2.guid as guid,
    lb2.weenie_Class_Id as wcid,
    lb2.origin_X as originX,
    lb2.origin_Y as originY,
    lb2.origin_Z as originZ,
    w_int_house_types.value as houseType,
    w_did_icon.value as icon
FROM
    landblock_instance AS lb1
    LEFT JOIN weenie AS w ON lb1.weenie_Class_Id = w.class_Id
    LEFT JOIN landblock_instance_link AS lb_link ON lb_link.child_GUID = lb1.guid
    LEFT JOIN landblock_instance AS lb2 ON lb2.guid = lb_link.parent_GUID
    LEFT JOIN weenie_properties_int AS w_int_house_types ON lb2.weenie_Class_Id = w_int_house_types.object_Id
    AND w_int_house_types.type = 155
    LEFT JOIN weenie_properties_string AS w_string ON lb2.weenie_Class_Id = w_string.object_Id
    LEFT JOIN weenie_properties_d_i_d AS w_did_icon ON lb2.weenie_Class_Id = w_did_icon.object_Id
    AND w_did_icon.type = 8
WHERE
    w.type = 55
    AND w_int_house_types.value IN ('1', '2', '3')