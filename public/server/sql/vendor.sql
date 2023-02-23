SELECT
    lb.guid as guid,
    lb.weenie_Class_Id as classId,
    w.type as weenieType,
    w_string_name.value as name,
    'vendor' as `category`,
    w_int_itemtype.value as itemType,
    lb.obj_Cell_Id as objCellId,
    lb.origin_X as originX,
    lb.origin_Y as originY,
    lb.origin_Z as originZ,
    w_did_icon.value as icon
FROM
    landblock_instance AS lb
    LEFT JOIN weenie AS w ON lb.weenie_Class_Id = w.class_Id
    LEFT JOIN weenie_properties_string AS w_string_name ON lb.weenie_Class_Id = w_string_name.object_Id AND w_string_name.type = 1
    LEFT JOIN weenie_properties_int AS w_int_itemtypes ON lb.weenie_Class_Id = w_int_itemtypes.object_Id
    LEFT JOIN weenie_properties_int AS w_int_minval ON lb.weenie_Class_Id = w_int_minval.object_Id
    LEFT JOIN weenie_properties_int AS w_int_maxval ON lb.weenie_Class_Id = w_int_maxval.object_Id
    LEFT JOIN weenie_properties_float AS w_float_buyprice ON lb.weenie_Class_Id = w_float_buyprice.object_Id
    LEFT JOIN weenie_properties_float AS w_float_sellprice ON lb.weenie_Class_Id = w_float_sellprice.object_Id
    LEFT JOIN weenie_properties_int AS w_int_itemtype ON lb.weenie_Class_Id = w_int_itemtype.object_Id
    AND w_int_itemtype.type = 1
    LEFT JOIN weenie_properties_d_i_d AS w_did_icon ON lb.weenie_Class_Id = w_did_icon.object_Id
    AND w_did_icon.type = 8
WHERE
    w.type = 12
    /* vendors */
    AND w_int_itemtypes.type = 74
    /* Merchandise Item Types */
    AND w_int_minval.type = 75
    /* Merchandise Min Value */
    AND w_int_maxval.type = 76
    /* Merchandise Max Value */
    AND w_float_buyprice.type = 037
    /* Buy Price */
    AND w_float_sellprice.type = 038
    /* Sell Price */
    AND LEFT(LPAD(HEX(lb.obj_Cell_Id), 8, '0'), 4) NOT IN (?)