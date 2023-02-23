const { pick } = require('lodash');

exports.ASHERONDB_API_DOCS_URL = 'https://asherondb.com/api';
exports.STRAPI_URL = 'http://asherondb-strapi:1337/api';


exports.GLOBAL_COORDS_MAX = 48960;
exports.GLOBAL_COORDS_MIN = 0;
exports.BLOCK_LENGTH = 192;
exports.CELL_SIDE = 8;
exports.CELL_LENGTH = 24;
exports.DERETH_MAP_TILE_SIZE = 256;
exports.DERETH_MAP_MAX_ZOOM = 11;
exports.DERETH_MAP_MIN_ZOOM = 0;

exports.LOCATION_TYPES = {
    VENDOR: 'vendor',
    LIFESTONE: 'lifestone',
    NPC: 'npc',
    HOUSE: 'house',
    // SETTLEMENT: 'settlement',
    SETTLEMENT_PORTAL_HUB: 'settlement_portal_hub',
    PORTAL: 'portal',
    BINDSTONE: 'bindstone'
};


exports.HOUSE_TYPES = {
    1: 'cottage',
    2: 'villa',
    3: 'mansion'
}


exports.CREATURE_TYPES = {
    1: "Olthoi",
    2: "Banderling",
    3: "Drudge",
    4: "Mosswart",
    5: "Lugian",
    6: "Tumerok",
    7: "Mite",
    8: "Tusker",
    9: "Phyntos Wasp",
    10: "Rat",
    11: "Auroch",
    12: "Cow",
    13: "Golem",
    14: "Undead",
    15: "Gromnie",
    16: "Reedshark",
    17: "Armoredillo",
    18: "Fae",
    19: "Virindi",
    20: "Wisp",
    21: "Knathtead",
    22: "Shadow",
    23: "Mattekar",
    24: "Mumiyah",
    25: "Rabbit",
    26: "Sclavus",
    27: "Shallows Shark",
    28: "Monouga",
    29: "Zefir",
    30: "Skeleton",
    31: "Human",
    32: "Shreth",
    33: "Chittick",
    34: "Moarsman",
    36: "Slithis",
    38: "Fire Elemental",
    39: "Snowman",
    41: "Bunny",
    42: "Lightning Elemental",
    44: "Grievver",
    45: "Niffis",
    46: "Ursuin",
    47: "Crystal",
    48: "Hollow Minion",
    49: "Scarecrow",
    50: "Idol",
    51: "Empyrean",
    52: "Hopeslayer",
    53: "Doll",
    54: "Marionette",
    55: "Carenzi",
    56: "Siraluun",
    57: "Aun Tumerok",
    58: "Hea Tumerok",
    59: "Simulacrum",
    60: "Acid Elemental",
    61: "Frost Elemental",
    62: "Elemental",
    63: "Statue",
    64: "Wall",
    65: "Altered Human",
    66: "Device",
    67: "Harbinger",
    68: "Dark Sarcophagus",
    69: "Chicken",
    70: "Gotrok Lugian",
    71: "Margul",
    72: "Bleached Rabbit",
    73: "Nasty Rabbit",
    74: "Grimacing Rabbit",
    75: "Burun",
    76: "Target",
    77: "Ghost",
    78: "Fiun",
    79: "Eater",
    80: "Penguin",
    81: "Ruschk",
    82: "Thrungus",
    83: "Viamontian Knight",
    84: "Remoran",
    85: "Swarm",
    86: "Moar",
    87: "Enchanted Arms",
    88: "Sleech",
    89: "Mukkir",
    90: "Merwart",
    91: "Food",
    92: "Paradox Olthoi",
    94: "Energy",
    95: "Apparition",
    96: "Aerbax",
    97: "Touched",
    98: "Blighted Moarsman",
    99: "Gear Knight",
    100: "Gurog",
    101: "A'nekshay",
};

exports.ATTRIBUTES = {
    1: { name: "Strength", icon: "060002C8" },
    2: { name: "Endurance", icon: "060002C4" },
    3: { name: "Quickness", icon: "060002C6" },
    4: { name: "Coordination", icon: "060002C9" },
    5: { name: "Focus", icon: "060002C5" },
    6: { name: "Self", icon: "060002C7" },
};
exports.VITALS = {
    1: {
        name: "Health", icon: "06004C3B", formula: {
            attributes: ['2'],
            divisor: 2
        }
    }, // Max Health
    2: "Health", // Health
    3: {
        name: "Stamina", icon: "06004C3D", formula: {
            attributes: ['2'],
            divisor: 1
        }
    }, // Max Stamina
    4: "Stamina", // Stamina
    5: {
        name: "Mana", icon: "06004C3C", formula: {
            attributes: ['6'],
            divisor: 1
        }
    }, // Max Mana
    6: "Mana", // Mana
};

exports.SKILLS = {
    1: {
        name: "Axe", advancementLevel: 1, icon: "0600015D", formula: {
            attributes: ['1', '4'],
            divisor: 3
        }
    },
    2: {
        name: "Bow", advancementLevel: 1, icon: "0600015F", formula: {
            attributes: ['4'],
            divisor: 2
        }
    },
    3: {
        name: "Crossbow", advancementLevel: 1, icon: "06000160", formula: {
            attributes: ['4'],
            divisor: 2
        }
    },
    4: {
        name: "Dagger", advancementLevel: 1, icon: "06000162", formula: {
            attributes: ['3', '4'],
            divisor: 3
        }
    },
    5: {
        name: "Mace", advancementLevel: 1, icon: "0600016F", formula: {
            attributes: ['1', '4'],
            divisor: 3
        }
    },
    6: {
        name: "Melee Defense", advancementLevel: 1, icon: "06000165", formula: {
            attributes: ['3', '4'],
            divisor: 3
        }
    },
    7: {
        name: "Missile Defense", advancementLevel: 1, icon: "06000164", formula: {
            attributes: ['3', '4'],
            divisor: 5
        }
    },
    8: { name: "Sling", advancementLevel: 1, icon: "" },
    9: {
        name: "Spear", advancementLevel: 1, icon: "06002052", formula: {
            attributes: ['1', '4'],
            divisor: 3
        }
    },
    10: {
        name: "Staff", advancementLevel: 1, icon: "06000178", formula: {
            attributes: ['1', '4'],
            divisor: 3
        }
    },
    11: {
        name: "Sword", advancementLevel: 1, icon: "0600017B", formula: {
            attributes: ['1', '4'],
            divisor: 3
        }
    },
    12: {
        name: "Thrown Weapons", advancementLevel: 1, icon: "0600017C", formula: {
            attributes: ['4'],
            divisor: 2
        }
    },
    13: {
        name: "Unarmed Combat", advancementLevel: 1, icon: "06000167", formula: {
            attributes: ['1', '4'],
            divisor: 3
        }
    },
    14: {
        name: "Arcane Lore", advancementLevel: 1, icon: "0600016E", formula: {
            attributes: ['5'],
            divisor: 3
        }
    },
    15: {
        name: "Magic Defense", advancementLevel: 1, icon: "06000163", formula: {
            attributes: ['6', '5'],
            divisor: 7
        }
    },
    16: {
        name: "Mana Conversion", advancementLevel: 0, icon: "06000170", formula: {
            attributes: ['5', '6'],
            divisor: 6
        }
    },
    17: { name: "Spellcraft", advancementLevel: 1, icon: "" },
    18: {
        name: "Item Tinkering", advancementLevel: 1, icon: "0600209B", formula: {
            attributes: ['5', '4'],
            divisor: 2
        }
    },
    19: { name: "Assess Person", advancementLevel: 0, icon: "0600209F" },
    20: { name: "Deception", advancementLevel: 0, icon: "0600016A" },
    21: {
        name: "Healing", advancementLevel: 0, icon: "06000133", formula: {
            attributes: ['5', '4'],
            divisor: 3
        }
    },
    22: {
        name: "Jump", advancementLevel: 1, icon: "0600016B", formula: {
            attributes: ['1', '4'],
            divisor: 2
        }
    },
    23: {
        name: "Lockpick", advancementLevel: 0, icon: "0600016D", formula: {
            attributes: ['4', '5'],
            divisor: 3
        }
    },
    24: {
        name: "Run", advancementLevel: 1, icon: "06000173", formula: {
            attributes: ['3'],
            divisor: 1
        }
    },
    25: { name: "Awareness", advancementLevel: 1, icon: "" },
    26: { name: "Arms and Armor Repair", advancementLevel: 1, icon: "" },
    27: { name: "Assess Creature", advancementLevel: 0, icon: "0600209E" },
    28: {
        name: "Weapon Tinkering", advancementLevel: 1, icon: "0600209D", formula: {
            attributes: ['5', '1'],
            divisor: 2
        }
    },
    29: {
        name: "Armor Tinkering", advancementLevel: 1, icon: "0600209A", formula: {
            attributes: ['5', '2'],
            divisor: 2
        }
    },
    30: {
        name: "Magic Item Tinkering", advancementLevel: 1, icon: "0600209C", formula: {
            attributes: ['5'],
            divisor: 1
        }
    },
    31: {
        name: "Creature Enchantment", advancementLevel: 0, icon: "06001363", formula: {
            attributes: ['5', '6'],
            divisor: 4
        }
    },
    32: {
        name: "Item Enchantment", advancementLevel: 0, icon: "0600135B", formula: {
            attributes: ['5', '6'],
            divisor: 4
        }
    },
    33: {
        name: "Life Magic", advancementLevel: 0, icon: "06001364", formula: {
            attributes: ['5', '6'],
            divisor: 4
        }
    },
    34: {
        name: "War Magic", advancementLevel: 0, icon: "06001365", formula: {
            attributes: ['5', '6'],
            divisor: 4
        }
    },
    35: { name: "Leadership", advancementLevel: 1, icon: "06001366" },
    36: { name: "Loyalty", advancementLevel: 1, icon: "06001367" },
    37: {
        name: "Fletching", advancementLevel: 0, icon: "06001A55", formula: {
            attributes: ['4', '5'],
            divisor: 3
        }
    },
    38: {
        name: "Alchemy", advancementLevel: 0, icon: "060019E4", formula: {
            attributes: ['4', '5'],
            divisor: 3
        }
    },
    39: {
        name: "Cooking", advancementLevel: 0, icon: "06001A54", formula: {
            attributes: ['4', '5'],
            divisor: 3
        }
    },
    40: { name: "Salvaging", advancementLevel: 1, icon: "060035AE" },
    41: {
        name: "Two Handed Combat", advancementLevel: 1, icon: "06006A00", formula: {
            attributes: ['1', '4'],
            divisor: 3
        }
    },
    42: {
        name: "Gearcraft", advancementLevel: 1, icon: "06006A01", formula: {
            attributes: ['5', '4'],
            divisor: 2
        }
    },
    43: {
        name: "Void Magic", advancementLevel: 0, icon: "06006E8C", formula: {
            attributes: ['5', '6'],
            divisor: 4
        }
    },
    44: {
        name: "Heavy Weapons", advancementLevel: 1, icon: "06007126", formula: {
            attributes: ['1', '4'],
            divisor: 3
        }
    },
    45: {
        name: "Light Weapons", advancementLevel: 1, icon: "06007127", formula: {
            attributes: ['1', '4'],
            divisor: 3
        }
    },
    46: {
        name: "Finesse Weapons", advancementLevel: 1, icon: "06007125", formula: {
            attributes: ['3', '4'],
            divisor: 3
        }
    },
    47: {
        name: "Missile Weapons", advancementLevel: 1, icon: "0600015F", formula: {
            attributes: ['4'],
            divisor: 2
        }
    },
    48: {
        name: "Shield", advancementLevel: 1, icon: "06007128", formula: {
            attributes: ['1', '4'],
            divisor: 2
        }
    },
    49: {
        name: "Dual Wield", advancementLevel: 1, icon: "06007124", formula: {
            attributes: ['4', '4'],
            divisor: 3
        }
    },
    50: {
        name: "Recklessness", advancementLevel: 0, icon: "0600015D", formula: {
            attributes: ['1', '3'],
            divisor: 3
        }
    },
    51: {
        name: "Sneak Attack", advancementLevel: 0, icon: "06007129", formula: {
            attributes: ['4', '3'],
            divisor: 3
        }
    },
    52: {
        name: "Dirty Fighting", advancementLevel: 0, icon: "06007123", formula: {
            attributes: ['1', '4'],
            divisor: 3
        }
    },
    53: { name: "Challenge", advancementLevel: 1 },
    54: {
        name: "Summoning", advancementLevel: 0, icon: "0600740C", formula: {
            attributes: ['2', '6'],
            divisor: 3
        }
    },
};

exports.VALID_SKILLS = pick(exports.SKILLS, '6', '7', '14', '15', '16', '18', '19', '20', '21', '22', '23', '24', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '54');