SELECT
    lb.weenie_Class_Id as classId,
    wi_itemtype.value as itemType,
    ws.value as name,
    /* wi.value as bitmask, */
    LPAD(HEX(lb.obj_Cell_Id), 8, '0') as cell,
    lb.origin_X as x,
    lb.origin_Y as y,
    lb.origin_Z as z,
    LPAD(HEX(wp.obj_Cell_Id), 8, '0') as destCell,
    wp.origin_X as destX,
    wp.origin_Y as destY,
    wp.origin_Z as destZ,
    wi_uieffects.value as iconOutline,
    LPAD(HEX(wdid_icon.value), 8, '0') as icon,
    wdid_iconoverlay.value as iconOverlay,
    wdid_iconunderlay.value as iconUnderlay
FROM
    landblock_instance lb
    LEFT JOIN weenie w ON lb.weenie_Class_Id = w.class_Id
    LEFT JOIN weenie_properties_string ws ON lb.weenie_Class_Id = ws.object_Id
    LEFT JOIN weenie_properties_int wi ON lb.weenie_Class_Id = wi.object_Id
    LEFT JOIN weenie_properties_position wp ON lb.weenie_Class_Id = wp.object_Id
    LEFT JOIN weenie_properties_int wi_uieffects ON lb.weenie_Class_Id = wi_uieffects.object_Id
    AND wi_uieffects.type = 18
    LEFT JOIN weenie_properties_int wi_itemtype ON lb.weenie_Class_Id = wi_itemtype.object_Id
    AND wi_itemtype.type = 1
    LEFT JOIN weenie_properties_d_i_d wdid_icon ON lb.weenie_Class_Id = wdid_icon.object_Id
    AND wdid_icon.type = 8
    LEFT JOIN weenie_properties_d_i_d wdid_iconoverlay ON lb.weenie_Class_Id = wdid_iconoverlay.object_Id
    AND wdid_iconoverlay.type = 50
    LEFT JOIN weenie_properties_d_i_d wdid_iconunderlay ON lb.weenie_Class_Id = wdid_iconunderlay.object_Id
    AND wdid_iconunderlay.type = 52
WHERE
    w.type = 7
    /* portals */
    AND lb.is_Link_Child = 0
    AND ws.type = 1
    /* name string key*/
    AND wi.type = 133
    /* showable on radar */
    AND wi.value = 4
    /* ShowAlways */
    AND wp.position_Type = 2
    /* portal destination */
    AND LEFT(LPAD(HEX(lb.obj_Cell_Id), 8, '0'), 4) NOT IN (?)
ORDER BY
    lb.weenie_Class_Id ASC