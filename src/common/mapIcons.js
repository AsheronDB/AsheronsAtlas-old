import L from "leaflet";

import MarkerIcon from "@/assets/img/map/icons/map-marker.png";
import LifestoneIcon from "@/assets/img/map/icons/Lifestone_Marker_Icon.png";
import TownIcon from "@/assets/img/map/icons/town-icon-test.png";
import PoiIcon from "@/assets/img/map/icons/map-poi-test3.png";
import VendorIcon from "@/assets/img/map/icons/map-icon-npc.png";
import PortalIcon from "@/assets/img/map/icons/Lifestone_Portal_Icon.png";
import OutpostIcon from "@/assets/img/map/icons/map-point-outpost.png";
import DungeonIcon from "@/assets/img/map/icons/map-point-gharu-town.png";
import HousingIcon from "@/assets/img/map/icons/house-icon.png";
import SettlementIcon from "@/assets/img/map/icons/Map_Point_Via_Town.png";
import MapPointTestIcon from "@/assets/img/map/icons/Map_Point_Large.png";
import MapMarkerPurpleIcon from "@/assets/img/map/icons/map-marker-purple.png";

export default {
  marker: L.icon({
    iconUrl: MarkerIcon,
    iconSize: [20, 20], // size of the icon
    iconAnchor: [10, 10], // point of the icon which will correspond to marker's location
    popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
    tooltipAnchor: [3, -1],
  }),
  lifestone: L.icon({
    iconUrl: LifestoneIcon,
    iconSize: [35, 35], // size of the icon
    iconAnchor: [17.5, 17.5], // point of the icon which will correspond to marker's location
    tooltipAnchor: [8, 0], // point from which the popup should open relative to the iconAnchor
  }),
  town: L.icon({
    iconUrl: TownIcon,
    iconSize: [20, 18], // size of the icon
    iconAnchor: [10, 9], // point of the icon which will correspond to marker's location
    popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
    tooltipAnchor: [12, 0], // point from which the popup should open relative to the iconAnchor
  }),
  poi: L.icon({
    iconUrl: PoiIcon,
    iconSize: [18, 18], // size of the icon
    iconAnchor: [9, 9], // point of the icon which will correspond to marker's location
    popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
    tooltipAnchor: [12, 0], // point from which the popup should open relative to the iconAnchor
  }),
  vendor: L.icon({
    iconUrl: VendorIcon,
    iconSize: [24, 24], // size of the icon
    iconAnchor: [12, 12], // point of the icon which will correspond to marker's location
    popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
    tooltipAnchor: [12, 0], // point from which the popup should open relative to the iconAnchor
  }),
  portal: L.icon({
    iconUrl: PortalIcon,
    iconSize: [32, 32], // size of the icon
    iconAnchor: [16, 16], // point of the icon which will correspond to marker's location
    popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
    tooltipAnchor: [12, 0], // point from which the popup should open relative to the iconAnchor
  }),
  outpost: L.icon({
    iconUrl: OutpostIcon,
    iconSize: [12, 12], // size of the icon
    iconAnchor: [6, 6], // point of the icon which will correspond to marker's location
    popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
    tooltipAnchor: [12, 0], // point from which the popup should open relative to the iconAnchor
  }),
  dungeon: L.icon({
    iconUrl: DungeonIcon,
    iconSize: [14, 14], // size of the icon
    iconAnchor: [7, 7], // point of the icon which will correspond to marker's location
    popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
    tooltipAnchor: [12, 0], // point from which the popup should open relative to the iconAnchor
  }),
  housing: L.icon({
    iconUrl: HousingIcon,
    iconSize: [12, 12], // size of the icon
    iconAnchor: [6, 6], // point of the icon which will correspond to marker's location
    popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
    tooltipAnchor: [12, 0], // point from which the popup should open relative to the iconAnchor
  }),
  settlement: L.icon({
    iconUrl: SettlementIcon,
    iconSize: [12, 12], // size of the icon
    iconAnchor: [6, 6], // point of the icon which will correspond to marker's location
    popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
    tooltipAnchor: [12, 0], // point from which the popup should open relative to the iconAnchor
  }),
  mapPointTest: L.icon({
    iconUrl: MapPointTestIcon,
    iconSize: [12, 12], // size of the icon
    iconAnchor: [6, 6], // point of the icon which will correspond to marker's location
    popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
    tooltipAnchor: [12, 0], // point from which the popup should open relative to the iconAnchor
  }),
  mapMarkerPurple: L.icon({
    iconUrl: MapMarkerPurpleIcon,
    iconSize: [14, 20], // size of the icon
    iconAnchor: [7, 20], // point of the icon which will correspond to marker's location
    popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
    tooltipAnchor: [12, 0], // point from which the popup should open relative to the iconAnchor
  }),
};

//
//
// gharuTown: L.icon({
//     iconUrl: require('~assets/img/map/icons/map-point-gharu-town.png'),
//     iconSize: [20, 20], // size of the icon
//     iconAnchor: [10, 15], // point of the icon which will correspond to marker's location
//     popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
// }),
// aluvianTown: L.icon({
//     iconUrl: require('~assets/img/map/icons/map-point-aluv-town.png'),
//     iconSize: [20, 20], // size of the icon
//     iconAnchor: [10, 15], // point of the icon which will correspond to marker's location
//     popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
// }),
// shoTown: L.icon({
//     iconUrl: require('~assets/img/map/icons/Map_Point_Sho_Town.png'),
//     iconSize: [20, 20], // size of the icon
//     iconAnchor: [10, 15], // point of the icon which will correspond to marker's location
//     popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
// }),
// viamontTown: L.icon({
//     iconUrl: require('~assets/img/map/icons/Map_Point_Via_Town.png'),
//     iconSize: [20, 20], // size of the icon
//     iconAnchor: [10, 15], // point of the icon which will correspond to marker's location
//     popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
// }),
// town: L.icon({
//     iconUrl: require('~assets/img/map/icons/map-point-aluv-town.png'),
//     iconSize: [15, 15], // size of the icon
//     iconAnchor: [5, 5], // point of the icon which will correspond to marker's location
//     popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
// }),
// 'landmark': L.icon({
//     iconUrl: require('~assets/img/map/icons/map-point-large.png'),
//     iconSize: [20, 20], // size of the icon
//     iconAnchor: [10, 10], // point of the icon which will correspond to marker's location
//     popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
//     tooltipAnchor: [4, 0]
// }),
//
//
//
// 'portal': L.icon({
//     iconUrl: require('~assets/img/map/icons/Map_Point_Portal.png'),
//     iconSize: [35, 35], // size of the icon
//     iconAnchor: [17, 17], // point of the icon which will correspond to marker's location
//     tooltipAnchor: [8, 0] // point from which the popup should open relative to the iconAnchor
// }),
// 'npc': L.icon({
//     iconUrl: require('~assets/img/map/icons/map-icon-npc.png'),
//     iconSize: [40, 40], // size of the icon
//     iconAnchor: [20, 20], // point of the icon which will correspond to marker's location
//     tooltipAnchor: [3, 0] // point from which the popup should open relative to the iconAnchor
// })
//
