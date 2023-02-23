SELECT
    lb.guid as guid,
    lb.weenie_Class_Id as wcid,
    w.type as weenieType,
    w_int_itemtype.value as itemType,
    w_string_name.value as name,
    'portal' as `category`,
    lb.obj_Cell_Id as objCellId,
    lb.origin_X as originX,
    lb.origin_Y as originY,
    lb.origin_Z as originZ,
    w_pos.obj_Cell_Id as destObjCellId,
    w_pos.origin_X as destOriginX,
    w_pos.origin_Y as destOriginY,
    w_pos.origin_Z as destOriginZ,
    w_did_icon.value as icon
FROM
    landblock_instance AS lb
    LEFT JOIN weenie AS w ON lb.weenie_Class_Id = w.class_Id
    LEFT JOIN weenie_properties_string AS w_string_name ON lb.weenie_Class_Id = w_string_name.object_Id AND w_string_name.type = 1
    LEFT JOIN weenie_properties_position AS w_pos ON lb.weenie_Class_Id = w_pos.object_Id
    LEFT JOIN weenie_properties_int AS w_int_itemtype ON lb.weenie_Class_Id = w_int_itemtype.object_Id
    AND w_int_itemtype.type = 1
    LEFT JOIN weenie_properties_d_i_d AS w_did_icon ON lb.weenie_Class_Id = w_did_icon.object_Id
    AND w_did_icon.type = 8
    LEFT JOIN weenie_properties_int AS w_int_radar_show ON lb.weenie_Class_Id = w_int_radar_show.object_Id AND w_int_radar_show.type = 133
WHERE
    w.type = 7
    /* portals */
    AND lb.is_Link_Child = 0
    AND w_int_radar_show.value = 4 /* Radar - ShowAlways */
    AND w_pos.position_Type = 2 /* portal destination */
    AND LEFT(LPAD(HEX(lb.obj_Cell_Id), 8, '0'), 4) NOT IN (?)