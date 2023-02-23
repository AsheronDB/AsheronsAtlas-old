SELECT
    lb.guid as guid,
    lb.weenie_Class_Id as wcid,
    w.type as weenieType,
    w_int_itemtype.value as itemType,
    'npc' as `category`,
    w_string_name.value as name,
    lb.obj_Cell_Id as objCellId,
    lb.origin_X as originX,
    lb.origin_Y as originY,
    lb.origin_Z as originZ,
    w_did_icon.value as icon
FROM
    landblock_instance AS lb
    LEFT JOIN weenie AS w ON lb.weenie_Class_Id = w.class_Id
    LEFT JOIN weenie_properties_string AS w_string_name ON lb.weenie_Class_Id = w_string_name.object_Id AND w_string_name.type = 1
    LEFT JOIN weenie_properties_int AS w_int_radar_color ON lb.weenie_Class_Id = w_int_radar_color.object_Id AND w_int_radar_color.type = 095
    LEFT JOIN weenie_properties_int AS w_int_radar_show ON lb.weenie_Class_Id = w_int_radar_show.object_Id AND w_int_radar_show.type = 133
    LEFT JOIN weenie_properties_int AS wi_uieffects ON lb.weenie_Class_Id = wi_uieffects.object_Id
    AND wi_uieffects.type = 18
    LEFT JOIN weenie_properties_int AS w_int_itemtype ON lb.weenie_Class_Id = w_int_itemtype.object_Id
    AND w_int_itemtype.type = 1
    LEFT JOIN weenie_properties_d_i_d AS w_did_icon ON lb.weenie_Class_Id = w_did_icon.object_Id
    AND w_did_icon.type = 8
WHERE
    w.type = 10
    AND w_int_radar_color.value = 8 /* yellow */
    AND w_int_radar_show.value > 0 /* showable on radar */
    AND LEFT(LPAD(HEX(lb.obj_Cell_Id), 8, '0'), 4) NOT IN (?)