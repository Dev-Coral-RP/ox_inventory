return {

['backpack_common'] = {
    label = 'Backpack (Common)',
    weight = 1200,     
    stack = false,
    consume = 0,        
    rarity = 'uncommon',
},

['backpack_rare'] = {
    label = 'Backpack (Rare)',
    weight = 1400,
    stack = false,
    consume = 0,
    rarity = 'uncommon',
},

['backpack_epic'] = {
    label = 'Backpack (Epic)',
    weight = 1600,
    stack = false,
    consume = 0,
    rarity = 'uncommon',
   
},




    ['testburger'] = {
        label = 'Test Burger',
        weight = 220,
        degrade = 60,
        rarity = 'uncommon',
        client = {
            image = 'burger_chicken.png',
            status = { hunger = 200000 },
            anim = 'eating',
            prop = 'burger',
            usetime = 2500,
            export = 'ox_inventory_examples.testburger'
        },
        server = {
            export = 'ox_inventory_examples.testburger',
            test = 'what an amazingly delicious burger, amirite?'
        },
        buttons = {
            {
                label = 'Lick it',
                action = function(slot)
                    print('You licked the burger')
                end
            },
            {
                label = 'Squeeze it',
                action = function(slot)
                    print('You squeezed the burger :(')
                end
            },
            {
                label = 'What do you call a vegan burger?',
                group = 'Hamburger Puns',
                action = function(slot)
                    print('A misteak.')
                end
            },
            {
                label = 'What do frogs like to eat with their hamburgers?',
                group = 'Hamburger Puns',
                action = function(slot)
                    print('French flies.')
                end
            },
            {
                label = 'Why were the burger and fries running?',
                group = 'Hamburger Puns',
                action = function(slot)
                    print('Because they\'re fast food.')
                end
            }
        },
        consume = 0.3
    },

    ['bandage'] = {
        label = 'Bandage',
        weight = 115,
        rarity = 'common',
    },

    ['burger'] = {
        label = 'Burger',
        weight = 220,
        rarity = 'common',
        client = {
            status = { hunger = 200000 },
            anim = 'eating',
            prop = 'burger',
            usetime = 2500,
            notification = 'You ate a delicious burger'
        },
    },

    ['safe_code_note'] = {
        label = 'Safe Code Note',
        weight = 10,
        stack = false,
        close = true,
        rarity = 'uncommon',
    },

    ['stolen_till'] = {
        label = 'Stolen Till',
        weight = 15000,
        stack = false,
        close = true,
        rarity = 'rare',
    },

    ['sprunk'] = {
        label = 'Sprunk',
        weight = 350,
        rarity = 'common',
        client = {
            status = { thirst = 200000 },
            anim = { dict = 'mp_player_intdrink', clip = 'loop_bottle' },
            prop = { model = `prop_ld_can_01`, pos = vec3(0.01, 0.01, 0.06), rot = vec3(5.0, 5.0, -180.5) },
            usetime = 2500,
            notification = 'You quenched your thirst with a sprunk'
        }
    },

    ['parachute'] = {
        label = 'Parachute',
        weight = 8000,
        stack = false,
        rarity = 'uncommon',
        client = {
            anim = { dict = 'clothingshirt', clip = 'try_shirt_positive_d' },
            usetime = 1500
        }
    },

    ['garbage'] = {
        label = 'Garbage',
        rarity = 'common',
    },

    ['paperbag'] = {
        label = 'Paper Bag',
        weight = 1,
        stack = false,
        close = false,
        consume = 0,
        rarity = 'common',
    },

    ['panties'] = {
        label = 'Knickers',
        weight = 10,
        consume = 0,
        rarity = 'uncommon',
        client = {
            status = { thirst = -100000, stress = -25000 },
            anim = { dict = 'mp_player_intdrink', clip = 'loop_bottle' },
            prop = { model = `prop_cs_panties_02`, pos = vec3(0.03, 0.0, 0.02), rot = vec3(0.0, -13.5, -1.5) },
            usetime = 2500,
        }
    },

    ['lockpick'] = {
        label = 'Lockpick',
        weight = 160,
        rarity = 'uncommon',
    },

    ['phone'] = {
        label = 'Phone',
        weight = 190,
        stack = false,
        consume = 0,
        rarity = 'uncommon',
        client = {
            add = function(total)
                if total > 0 then
                    pcall(function() return exports.npwd:setPhoneDisabled(false) end)
                end
            end,

            remove = function(total)
                if total < 1 then
                    pcall(function() return exports.npwd:setPhoneDisabled(true) end)
                end
            end
        }
    },

    ['mustard'] = {
        label = 'Mustard',
        weight = 500,
        rarity = 'common',
        client = {
            status = { hunger = 25000, thirst = 25000 },
            anim = { dict = 'mp_player_intdrink', clip = 'loop_bottle' },
            prop = { model = `prop_food_mustard`, pos = vec3(0.01, 0.0, -0.07), rot = vec3(1.0, 1.0, -1.5) },
            usetime = 2500,
            notification = 'You... drank mustard'
        }
    },

    ['water'] = {
        label = 'Water',
        weight = 500,
        rarity = 'epic',
        client = {
            status = { thirst = 200000 },
            anim = { dict = 'mp_player_intdrink', clip = 'loop_bottle' },
            prop = { model = `prop_ld_flow_bottle`, pos = vec3(0.03, 0.03, 0.02), rot = vec3(0.0, 0.0, -1.5) },
            usetime = 2500,
            cancel = true,
            notification = 'You drank some refreshing water'
        }
    },

    ['armour'] = {
        label = 'Bulletproof Vest',
        weight = 3000,
        stack = false,
        rarity = 'rare',
        client = {
            anim = { dict = 'clothingshirt', clip = 'try_shirt_positive_d' },
            usetime = 3500
        }
    },

    ['clothing'] = {
        label = 'Clothing',
        consume = 0,
        rarity = 'common',
    },

    ['money'] = {
        label = 'Money',
        rarity = 'common',
    },

    ['backpack'] = {
        label = 'Backpack',
        rarity = 'rare',
    },

    ['black_money'] = {
        label = 'Dirty Money',
        metadata = {
            rarity = 'epic',
        }
    },

    ['id_card'] = {
        label = 'Identification Card',
        rarity = 'common',
    },

    ['driver_license'] = {
        label = 'Drivers License',
        rarity = 'common',
    },

    ['weaponlicense'] = {
        label = 'Weapon License',
        rarity = 'rare',
    },

    ['lawyerpass'] = {
        label = 'Lawyer Pass',
        rarity = 'rare',
    },

    ['radio'] = {
        label = 'Radio',
        weight = 1000,
        allowArmed = true,
        consume = 0,
        rarity = 'uncommon',
        client = {
            event = 'mm_radio:client:use'
        }
    },

    ['jammer'] = {
        label = 'Radio Jammer',
        weight = 10000,
        allowArmed = true,
        rarity = 'epic',
        client = {
            event = 'mm_radio:client:usejammer'
        }
    },

    ['radiocell'] = {
        label = 'AAA Cells',
        weight = 1000,
        stack = true,
        allowArmed = true,
        rarity = 'common',
        client = {
            event = 'mm_radio:client:recharge'
        }
    },

    ['advancedlockpick'] = {
        label = 'Advanced Lockpick',
        weight = 500,
        rarity = 'rare',
    },

    ['screwdriverset'] = {
        label = 'Screwdriver Set',
        weight = 500,
        rarity = 'uncommon',
    },

    ['electronickit'] = {
        label = 'Electronic Kit',
        weight = 500,
        rarity = 'rare',
    },

    ['cleaningkit'] = {
        label = 'Cleaning Kit',
        weight = 500,
        rarity = 'uncommon',
    },

    ['repairkit'] = {
        label = 'Repair Kit',
        weight = 2500,
        rarity = 'uncommon',
    },

    ['advancedrepairkit'] = {
        label = 'Advanced Repair Kit',
        weight = 4000,
        rarity = 'rare',
    },

    ['diamond_ring'] = {
        label = 'Diamond',
        weight = 1500,
        rarity = 'legendary',
    },

    ['rolex'] = {
        label = 'Golden Watch',
        weight = 1500,
        rarity = 'epic',
    },

    ['goldbar'] = {
        label = 'Gold Bar',
        weight = 1500,
        rarity = 'legendary',
    },

    ['goldchain'] = {
        label = 'Golden Chain',
        weight = 1500,
        rarity = 'epic',
    },

    ['crack_baggy'] = {
        label = 'Crack Baggy',
        weight = 100,
        rarity = 'rare',
    },

    ['cokebaggy'] = {
        label = 'Bag of Coke',
        weight = 100,
        rarity = 'rare',
    },

    ['coke_brick'] = {
        label = 'Coke Brick',
        weight = 2000,
        rarity = 'epic',
    },

    ['coke_small_brick'] = {
        label = 'Coke Package',
        weight = 1000,
        rarity = 'rare',
    },

    ['xtcbaggy'] = {
        label = 'Bag of Ecstasy',
        weight = 100,
        rarity = 'rare',
    },

    ['meth'] = {
        label = 'Methamphetamine',
        weight = 100,
        rarity = 'rare',
    },

    ['oxy'] = {
        label = 'Oxycodone',
        weight = 100,
        rarity = 'rare',
    },

    ['weed_ak47'] = {
        label = 'AK47 2g',
        weight = 200,
        rarity = 'uncommon',
    },

    ['weed_ak47_seed'] = {
        label = 'AK47 Seed',
        weight = 1,
        rarity = 'uncommon',
    },

    ['weed_skunk'] = {
        label = 'Skunk 2g',
        weight = 200,
        rarity = 'uncommon',
    },

    ['weed_skunk_seed'] = {
        label = 'Skunk Seed',
        weight = 1,
        rarity = 'uncommon',
    },

    ['weed_amnesia'] = {
        label = 'Amnesia 2g',
        weight = 200,
        rarity = 'uncommon',
    },

    ['weed_amnesia_seed'] = {
        label = 'Amnesia Seed',
        weight = 1,
        rarity = 'uncommon',
    },

    ['weed_og-kush'] = {
        label = 'OGKush 2g',
        weight = 200,
        rarity = 'uncommon',
    },

    ['weed_og-kush_seed'] = {
        label = 'OGKush Seed',
        weight = 1,
        rarity = 'uncommon',
    },

    ['weed_white-widow'] = {
        label = 'OGKush 2g',
        weight = 200,
        rarity = 'uncommon',
    },

    ['weed_white-widow_seed'] = {
        label = 'White Widow Seed',
        weight = 1,
        rarity = 'uncommon',
    },

    ['weed_purple-haze'] = {
        label = 'Purple Haze 2g',
        weight = 200,
        rarity = 'uncommon',
    },

    ['weed_purple-haze_seed'] = {
        label = 'Purple Haze Seed',
        weight = 1,
        rarity = 'uncommon',
    },

    ['weed_brick'] = {
        label = 'Weed Brick',
        weight = 2000,
        rarity = 'rare',
    },

    ['weed_nutrition'] = {
        label = 'Plant Fertilizer',
        weight = 2000,
        rarity = 'common',
    },

    ['joint'] = {
        label = 'Joint',
        weight = 200,
        rarity = 'common',
    },

    ['rolling_paper'] = {
        label = 'Rolling Paper',
        weight = 0,
        rarity = 'common',
    },

    ['empty_weed_bag'] = {
        label = 'Empty Weed Bag',
        weight = 0,
        rarity = 'common',
    },

    ['firstaid'] = {
        label = 'First Aid',
        weight = 2500,
        rarity = 'uncommon',
    },

    ['ifaks'] = {
        label = 'Individual First Aid Kit',
        weight = 2500,
        rarity = 'rare',
    },

    ['painkillers'] = {
        label = 'Painkillers',
        weight = 400,
        rarity = 'uncommon',
    },

    ['firework1'] = {
        label = '2Brothers',
        weight = 1000,
        rarity = 'uncommon',
    },

    ['firework2'] = {
        label = 'Poppelers',
        weight = 1000,
        rarity = 'uncommon',
    },

    ['firework3'] = {
        label = 'WipeOut',
        weight = 1000,
        rarity = 'uncommon',
    },

    ['firework4'] = {
        label = 'Weeping Willow',
        weight = 1000,
        rarity = 'uncommon',
    },

    ['steel'] = {
        label = 'Steel',
        weight = 100,
        rarity = 'common',
    },

    ['rubber'] = {
        label = 'Rubber',
        weight = 100,
        rarity = 'common',
    },

    ['metalscrap'] = {
        label = 'Metal Scrap',
        weight = 100,
        rarity = 'common',
    },

    ['iron'] = {
        label = 'Iron',
        weight = 100,
        rarity = 'common',
    },

    ['copper'] = {
        label = 'Copper',
        weight = 100,
        rarity = 'common',
    },

    ['aluminum'] = {
        label = 'Aluminium',
        weight = 100,
        rarity = 'common',
    },

    ['plastic'] = {
        label = 'Plastic',
        weight = 100,
        rarity = 'common',
    },

    ['glass'] = {
        label = 'Glass',
        weight = 100,
        rarity = 'common',
    },

    ['gatecrack'] = {
        label = 'Gatecrack',
        weight = 1000,
        rarity = 'rare',
    },

    ['cryptostick'] = {
        label = 'Crypto Stick',
        weight = 100,
        rarity = 'rare',
    },

    ['trojan_usb'] = {
        label = 'Trojan USB',
        weight = 100,
        rarity = 'rare',
    },

    ['toaster'] = {
        label = 'Toaster',
        weight = 5000,
        rarity = 'common',
    },

    ['small_tv'] = {
        label = 'Small TV',
        weight = 100,
        rarity = 'uncommon',
    },

    ['security_card_01'] = {
        label = 'Security Card A',
        weight = 100,
        rarity = 'epic',
    },

    ['security_card_02'] = {
        label = 'Security Card B',
        weight = 100,
        rarity = 'legendary',
    },

    ['drill'] = {
        label = 'Drill',
        weight = 5000,
        rarity = 'uncommon',
    },

    ['thermite'] = {
        label = 'Thermite',
        weight = 1000,
        rarity = 'rare',
    },

    ['diving_gear'] = {
        label = 'Diving Gear',
        weight = 30000,
        rarity = 'epic',
    },

    ['diving_fill'] = {
        label = 'Diving Tube',
        weight = 3000,
        rarity = 'uncommon',
    },

    ['antipatharia_coral'] = {
        label = 'Antipatharia',
        weight = 1000,
        rarity = 'rare',
    },

    ['dendrogyra_coral'] = {
        label = 'Dendrogyra',
        weight = 1000,
        rarity = 'rare',
    },

    ['jerry_can'] = {
        label = 'Jerrycan',
        weight = 3000,
        rarity = 'common',
    },

    ['nitrous'] = {
        label = 'Nitrous',
        weight = 1000,
        rarity = 'epic',
    },

    ['wine'] = {
        label = 'Wine',
        weight = 500,
        rarity = 'uncommon',
    },

    ['grape'] = {
        label = 'Grape',
        weight = 10,
        rarity = 'common',
    },

    ['grapejuice'] = {
        label = 'Grape Juice',
        weight = 200,
        rarity = 'common',
    },

    ['coffee'] = {
        label = 'Coffee',
        weight = 200,
        rarity = 'common',
    },

    ['vodka'] = {
        label = 'Vodka',
        weight = 500,
        rarity = 'uncommon',
    },

    ['whiskey'] = {
        label = 'Whiskey',
        weight = 200,
        rarity = 'uncommon',
    },

    ['beer'] = {
        label = 'Beer',
        weight = 200,
        rarity = 'common',
    },

    ['sandwich'] = {
        label = 'Sandwich',
        weight = 200,
        rarity = 'common',
    },

    ['walking_stick'] = {
        label = 'Walking Stick',
        weight = 1000,
        rarity = 'uncommon',
    },

    ['lighter'] = {
        label = 'Lighter',
        weight = 200,
        rarity = 'common',
    },

    ['binoculars'] = {
        label = 'Binoculars',
        weight = 800,
        rarity = 'uncommon',
    },

    ['stickynote'] = {
        label = 'Sticky Note',
        weight = 0,
        rarity = 'common',
    },

    ['empty_evidence_bag'] = {
        label = 'Empty Evidence Bag',
        weight = 200,
        rarity = 'common',
    },

    ['filled_evidence_bag'] = {
        label = 'Filled Evidence Bag',
        weight = 200,
        rarity = 'uncommon',
    },

    ['harness'] = {
        label = 'Harness',
        weight = 200,
        rarity = 'rare',
    },

    ['handcuffs'] = {
        label = 'Handcuffs',
        weight = 200,
        rarity = 'uncommon',
    },
}
