if (typeof Entry !== "object")
    var Entry = {};

if (typeof exports == "object") {
    var Lang = require('../../extern/lang/ko.js').Lang;
    if (typeof Entry !== "object")
        var Entry = {};
    Entry.Bitbrick = {};
    EntryStatic = {};
}
if (!Entry.block)
    Entry.block = {};

if (!Entry.block.converters)
    Entry.block.converters = {};

if (Entry && Entry.block) {
    Entry.block.converters = {};

    (function(c) {
        c.keyboardCode = function(key, value) {
            var code;
            if(key)
                code = key.toUpperCase();
            return '"()"'.replace('()', code);
        }; 

        c.returnStringKey = function(key, value) {
            if ((!value && typeof value !== 'number') || value === 'null')
                return "None";
            key  = String(key);
            if (value === 'mouse')
                key = 'mouse';
            key = key.replace(/\"/gi, '');
            return '"()"'.replace('()', key);
        };

        c.returnRawStringKey = function(key, value) {
            if ((!value && typeof value !== 'number') || value === 'null')
                return "None";
            key  = String(key);
            if (value === 'mouse')
                key = value;
            key = key.replace(/\"/gi, '');
            return '"()"'.replace('"()"', key);
        };

        c.returnStringValue = function(key, value) {
            return '"()"'.replace('()', value);
        };

        c.returnOperator = function(key, value) {
            var map = {
                "EQUAL": '==',
                "GREATER": '>',
                "LESS": '<',
                "GREATER_OR_EQUAL": '>=',
                "LESS_OR_EQUAL": '<=',
                "PLUS": '+',
                "MINUS": '-',
                "MULTI": '*',
                "DIVIDE": '/',
                '==':"EQUAL",
                '>':"GREATER",
                '<':"LESS",
                '>=':"GREATER_OR_EQUAL",
                '<=':"LESS_OR_EQUAL",
                '+':"PLUS",
                '-':"MINUS",
                '*':"MULTI",
                '/':"DIVIDE"
            };
            return map[value];
        };

        c.returnRawNumberValueByKey = function(key, value) {
            return String(key).replace(/\D/, '');
        };

        c.returnStringOrNumberByValue = function(key, value) {
            if (isNaN(value)) {
                value = value.replace(/\"/gi, '');
                return '"()"'.replace('()', value);
            } else return value;
        };

        c.returnObjectOrStringValue = function(key, value) {
            if (Entry.container && Entry.container.getObject(value))
                return Entry.container.getObject(value).name;
            else {
                value = value.replace(/\"/gi, '');
                return '"()"'.replace('()', value);
            }
        };

    })(Entry.block.converters);
}

Entry.block = {
    "albert_hand_found": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_boolean_field",
        "statements": [],
        "params": [],
        "events": {},
        "def": {
            "params": [],
            "type": "albert_hand_found"
        },
        "class": "albert_sensor",
        "isNotFor": ["albert"],
        "func": function (sprite, script) {
            var pd = Entry.hw.portData
            return pd.leftProximity > 40 || pd.rightProximity > 40;
        },
	"syntax": {"js": [], "py": ["Albert.hand_found()"]}
    },
    "albert_is_oid_value": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_boolean_field",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.ALBERT_front_oid ,"FRONT"],
                    [Lang.Blocks.ALBERT_back_oid,"BACK"]
                ],
                "value": "FRONT",
                "fontSize": 11
            },
            {
                "type": "Block",
                "accept": "string"
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                {
                    "type": "number",
                    "params": [ "0" ]
                }
            ],
            "type": "albert_is_oid_value"
        },
        "paramsKeyMap": {
            "OID": 0,
            "VALUE": 1
        },
        "class": "albert_sensor",
        "isNotFor": [ "albert" ],
        "func": function(sprite, script) {
            var pd = Entry.hw.portData;
            var oid = script.getField("OID", script);
            var value = script.getNumberValue("VALUE");
            if (oid == 'FRONT') {
                return pd.frontOid == value;
            } else {
                return pd.backOid == value;
            }
        }
    },
    "albert_value": {
        "color": "#00979D",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.ALBERT_sensor_left_proximity ,"leftProximity"],
                    [Lang.Blocks.ALBERT_sensor_right_proximity,"rightProximity"],
                    [Lang.Blocks.ALBERT_sensor_acceleration_x, "accelerationX"],
                    [Lang.Blocks.ALBERT_sensor_acceleration_y,"accelerationY"],
                    [Lang.Blocks.ALBERT_sensor_acceleration_z,"accelerationZ"],
                    [Lang.Blocks.ALBERT_sensor_front_oid,"frontOid"],
                    [Lang.Blocks.ALBERT_sensor_back_oid,"backOid"],
                    [Lang.Blocks.ALBERT_sensor_position_x,"positionX"],
                    [Lang.Blocks.ALBERT_sensor_position_y,"positionY"],
                    [Lang.Blocks.ALBERT_sensor_orientation,"orientation"],
                    [Lang.Blocks.ALBERT_sensor_light,"light"],
                    [Lang.Blocks.ALBERT_sensor_temperature, "temperature"],
                    [Lang.Blocks.ALBERT_sensor_battery,"battery"],
                    [Lang.Blocks.ALBERT_sensor_signal_strength,"signalStrength"]
                ],
                "value": "leftProximity",
                "fontSize": 11
            }
        ],
        "events": {},
        "def": {
            "params": [
                null
            ],
            "type": "albert_value"
        },
        "paramsKeyMap": {
            "DEVICE": 0
        },
        "class": "albert_sensor",
        "isNotFor": [ "albert" ],
        "func": function (sprite, script) {
            var pd = Entry.hw.portData;
            var dev = script.getField('DEVICE');
            return pd[dev];
        },
        "syntax": {"js": [], "py": ["Albert.value(%1)"]}
    },
    "albert_move_forward_for_secs": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "text",
                    "params": [ "1" ]
                },
                null
            ],
            "type": "albert_move_forward_for_secs"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "albert_wheel",
        "isNotFor": [ "albert" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            if (!script.isStart) {
                script.isStart = true;
                script.timeFlag = 1;
                sq.leftWheel = 30;
                sq.rightWheel = 30;
                var timeValue = script.getNumberValue("VALUE") * 1000;
                var timer = setTimeout(function() {
                    script.timeFlag = 0;
                    Entry.Albert.removeTimeout(timer);
                }, timeValue);
                Entry.Albert.timeouts.push(timer);
                return script;
            } else if (script.timeFlag == 1) {
                return script;
            } else {
                delete script.isStart;
                delete script.timeFlag;
                Entry.engine.isContinue = false;
                sq.leftWheel = 0;
                sq.rightWheel = 0;
                return script.callReturn();
            }
        },
        "syntax": {"js": [], "py": ["Albert.move_forward_for_secs(%1)"]}
    },
    "albert_move_backward_for_secs": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "text",
                    "params": [
                        "1"
                    ]
                },
                null
            ],
            "type": "albert_move_backward_for_secs"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "albert_wheel",
        "isNotFor": [ "albert" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            if (!script.isStart) {
                script.isStart = true;
                script.timeFlag = 1;
                sq.leftWheel = -30;
                sq.rightWheel = -30;
                var timeValue = script.getNumberValue("VALUE") * 1000;
                var timer = setTimeout(function() {
                    script.timeFlag = 0;
                    Entry.Albert.removeTimeout(timer);
                }, timeValue);
                Entry.Albert.timeouts.push(timer);
                return script;
            } else if (script.timeFlag == 1) {
                return script;
            } else {
                delete script.isStart;
                delete script.timeFlag;
                Entry.engine.isContinue = false;
                sq.leftWheel = 0;
                sq.rightWheel = 0;
                return script.callReturn();
            }
        },
        "syntax": {"js": [], "py": ["Albert.move_backward_for_secs(%1)"]}
    },
    "albert_turn_for_secs": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.ALBERT_turn_left,"LEFT"],
                    [Lang.Blocks.ALBERT_turn_right,"RIGHT"]
                ],
                "value": "LEFT",
                "fontSize": 11
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                {
                    "type": "text",
                    "params": [ "1" ]
                },
                null
            ],
            "type": "albert_turn_for_secs",
            "id": "como"
        },
        "paramsKeyMap": {
            "DIRECTION": 0,
            "VALUE": 1
        },
        "class": "albert_wheel",
        "isNotFor": [ "albert" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            if (!script.isStart) {
                script.isStart = true;
                script.timeFlag = 1;
                var direction = script.getField("DIRECTION", script);
                if (direction == 'LEFT') {
                    sq.leftWheel = -30;
                    sq.rightWheel = 30;
                } else {
                    sq.leftWheel = 30;
                    sq.rightWheel = -30;
                }
                var timeValue = script.getNumberValue("VALUE") * 1000;
                var timer = setTimeout(function() {
                    script.timeFlag = 0;
                    Entry.Albert.removeTimeout(timer);
                }, timeValue);
                Entry.Albert.timeouts.push(timer);
                return script;
            } else if (script.timeFlag == 1) {
                return script;
            } else {
                delete script.isStart;
                delete script.timeFlag;
                Entry.engine.isContinue = false;
                sq.leftWheel = 0;
                sq.rightWheel = 0;
                return script.callReturn();
            }
        },
        "syntax": {"js": [], "py": ["Albert.turn_for_secs(%1, %2)"]}
    },
    "albert_change_both_wheels_by": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "text",
                    "params": [ "10" ]
                },
                {
                    "type": "text",
                    "params": [ "10" ]
                },
                null
            ],
            "type": "albert_change_both_wheels_by"
        },
        "paramsKeyMap": {
            "LEFT": 0,
            "RIGHT": 1
        },
        "class": "albert_wheel",
        "isNotFor": [ "albert" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            var left = script.getNumberValue('LEFT');
            var right = script.getNumberValue('RIGHT');
            sq.leftWheel = sq.leftWheel != undefined ? sq.leftWheel + left : left;
            sq.rightWheel = sq.rightWheel != undefined ? sq.rightWheel + right : right;
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Albert.change_both_wheels(%1, %2)"]}
    },
    "albert_set_both_wheels_to": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "text",
                    "params": [ "30" ]
                },
                {
                    "type": "text",
                    "params": [ "30" ]
                },
                null
            ],
            "type": "albert_set_both_wheels_to"
        },
        "paramsKeyMap": {
            "LEFT": 0,
            "RIGHT": 1
        },
        "class": "albert_wheel",
        "isNotFor": [ "albert" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            sq.leftWheel = script.getNumberValue('LEFT');
            sq.rightWheel = script.getNumberValue('RIGHT');
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Albert.set_both_wheels(%1, %2)"]}
    },
    "albert_change_wheel_by": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.ALBERT_left_wheel,"LEFT"],
                    [Lang.Blocks.ALBERT_right_wheel,"RIGHT"],
                    [Lang.Blocks.ALBERT_both_wheels,"BOTH"]
                ],
                "value": "LEFT",
                "fontSize": 11
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                {
                    "type": "text",
                    "params": [ "10" ]
                },
                null
            ],
            "type": "albert_change_wheel_by"
        },
        "paramsKeyMap": {
            "DIRECTION": 0,
            "VALUE": 1
        },
        "class": "albert_wheel",
        "isNotFor": [ "albert" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            var direction = script.getField('DIRECTION');
            var value = script.getNumberValue('VALUE');
            if (direction == 'LEFT') {
                sq.leftWheel = sq.leftWheel != undefined ? sq.leftWheel + value : value;
            } else if (direction == 'RIGHT') {
                sq.rightWheel = sq.rightWheel != undefined ? sq.rightWheel + value : value;
            } else {
                sq.leftWheel = sq.leftWheel != undefined ? sq.leftWheel + value : value;
                sq.rightWheel = sq.rightWheel != undefined ? sq.rightWheel + value : value;
            }
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Albert.change_wheel(%1, %2)"]}
    },
    "albert_set_wheel_to": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.ALBERT_left_wheel,"LEFT"],
                    [Lang.Blocks.ALBERT_right_wheel,"RIGHT"],
                    [Lang.Blocks.ALBERT_both_wheels,"BOTH"]
                ],
                "value": "LEFT",
                "fontSize": 11
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                {
                    "type": "text",
                    "params": [ "30" ]
                },
                null
            ],
            "type": "albert_set_wheel_to"
        },
        "paramsKeyMap": {
            "DIRECTION": 0,
            "VALUE": 1
        },
        "class": "albert_wheel",
        "isNotFor": [ "albert" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            var direction = script.getField('DIRECTION');
            var value = script.getNumberValue('VALUE');
            if (direction == 'LEFT') {
                sq.leftWheel = value;
            } else if (direction == 'RIGHT') {
                sq.rightWheel = value;
            } else {
                sq.leftWheel = value;
                sq.rightWheel = value;
            }
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Albert.set_wheel(%1, %2)"]}
    },
    "albert_stop": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                null
            ],
            "type": "albert_stop",
            "id": "4adb"
        },
        "class": "albert_wheel",
        "isNotFor": [
            "albert"
        ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            sq.leftWheel = 0;
            sq.rightWheel = 0;
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Albert.stop()"]}
    },
    "albert_set_pad_size_to": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "text",
                    "params": [ "108" ]
                },
                {
                    "type": "text",
                    "params": [ "76" ]
                },
                null
            ],
            "type": "albert_set_pad_size_to",
            "id": "5mhg"
        },
        "paramsKeyMap": {
            "WIDTH": 0,
            "HEIGHT": 1
        },
        "class": "albert_wheel",
        "isNotFor": [ "albert" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            sq.padWidth = script.getNumberValue('WIDTH');
            sq.padHeight = script.getNumberValue('HEIGHT');
            return script.callReturn();
        },
	"syntax": {"js": [], "py": ["Albert.set_pad_size(%1, %2)"]}
    },
    "albert_move_to_x_y_on_board": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "number",
                    "params": [ "0" ]
                },
                {
                    "type": "number",
                    "params": [ "0" ]
                },
                null
            ],
            "type": "albert_move_to_x_y_on_board"
        },
        "paramsKeyMap": {
            "X": 0,
            "Y": 1
        },
        "class": "albert_wheel",
        "isNotFor": [ "albert" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            var pd = Entry.hw.portData;
            var controller = Entry.Albert.controller;
            if (!script.isStart) {
                script.isStart = true;
                script.isMoving = true;
                script.initialized = false;
                script.boardState = 1;
                script.x = -1;
                script.y = -1;
                script.theta = -200;
                script.targetX = script.getNumberValue('X');
                script.targetY = script.getNumberValue('Y');
                controller.clear();
                sq.leftWheel = 0;
                sq.rightWheel = 0;
                return script;
            } else if (script.isMoving) {
                if(pd.positionX >= 0) script.x = pd.positionX;
                if(pd.positionY >= 0) script.y = pd.positionY;
                script.theta = pd.orientation;
                switch(script.boardState) {
                    case 1: {
                        if(script.initialized == false) {
                            if(script.x < 0 || script.y < 0) {
                                sq.leftWheel = 20;
                                sq.rightWheel = -20;
                                return script;
                            }
                            script.initialized = true;
                        }
                        var current = controller.toRadian(script.theta);
                        var dx = script.targetX - script.x;
                        var dy = script.targetY - script.y;
                        var target = Math.atan2(dy, dx);
                        if(controller.controlAngle(current, target) == false)
                            script.boardState = 2;
                        break;
                    }
                    case 2: {
                        if(controller.controlPosition(script.x, script.y, controller.toRadian(script.theta), script.targetX, script.targetY) == false)
                            script.boardState = 3;
                        break;
                    }
                    case 3: {
                        if(controller.controlPositionFine(script.x, script.y, controller.toRadian(script.theta), script.targetX, script.targetY) == false) {
                            sq.leftWheel = 0;
                            sq.rightWheel = 0;
                            script.isMoving = false;
                        }
                        break;
                    }
                }
                return script;
            } else {
                delete script.isStart;
                delete script.isMoving;
                delete script.initialized;
                delete script.boardState;
                delete script.x;
                delete script.y;
                delete script.theta;
                delete script.targetX;
                delete script.targetY;
                Entry.engine.isContinue = false;
                sq.leftWheel = 0;
                sq.rightWheel = 0;
                return script.callReturn();
            }
        }
    },
    "albert_set_orientation_on_board": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "number",
                    "params": [ "0" ]
                },
                null
            ],
            "type": "albert_set_orientation_on_board"
        },
        "paramsKeyMap": {
            "ORIENTATION": 0
        },
        "class": "albert_wheel",
        "isNotFor": [ "albert" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            var pd = Entry.hw.portData;
            var controller = Entry.Albert.controller;
            if (!script.isStart) {
                script.isStart = true;
                script.isMoving = true;
                script.boardState = 1;
                script.theta = -200;
                script.targetTheta = script.getNumberValue('ORIENTATION');
                controller.clear();
                sq.leftWheel = 0;
                sq.rightWheel = 0;
                return script;
            } else if (script.isMoving) {
                script.theta = pd.orientation;
                switch(script.boardState) {
                    case 1: {
                        var current = controller.toRadian(script.theta);
                        var target = controller.toRadian(script.targetTheta);
                        if(controller.controlAngle(current, target) == false)
                            script.boardState = 2;
                        break;
                    }
                    case 2: {
                        var current = controller.toRadian(script.theta);
                        var target = controller.toRadian(script.targetTheta);
                        if(controller.controlAngleFine(current, target) == false) {
                            sq.leftWheel = 0;
                            sq.rightWheel = 0;
                            script.isMoving = false;
                        }
                        break;
                    }
                }
                return script;
            } else {
                delete script.isStart;
                delete script.isMoving;
                delete script.boardState;
                delete script.theta;
                delete script.targetTheta;
                Entry.engine.isContinue = false;
                sq.leftWheel = 0;
                sq.rightWheel = 0;
                return script.callReturn();
            }
        }
    },
    "albert_set_eye_to": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.ALBERT_left_eye,"LEFT"],
                    [Lang.Blocks.ALBERT_right_eye,"RIGHT"],
                    [Lang.Blocks.ALBERT_both_eyes,"BOTH"]
                ],
                "value": "LEFT",
                "fontSize": 11
            },
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.ALBERT_color_red,"4"],
                    [Lang.Blocks.ALBERT_color_yellow,"6"],
                    [Lang.Blocks.ALBERT_color_green,"2"],
                    [Lang.Blocks.ALBERT_color_cyan,"3"],
                    [Lang.Blocks.ALBERT_color_blue,"1"],
                    [Lang.Blocks.ALBERT_color_magenta,"5"],
                    [Lang.Blocks.ALBERT_color_white,"7"]
                ],
                "value": "4",
                "fontSize": 11
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null, null ],
            "type": "albert_set_eye_to"
        },
        "paramsKeyMap": {
            "DIRECTION": 0,
            "COLOR": 1
        },
        "class": "albert_led",
        "isNotFor": [ "albert" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            var direction = script.getField("DIRECTION", script);
            var color = Number(script.getField("COLOR", script));
            if (direction == 'LEFT') {
                sq.leftEye = color;
            } else if (direction == 'RIGHT') {
                sq.rightEye = color;
            } else {
                sq.leftEye = color;
                sq.rightEye = color;
            }
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Albert.set_eye(%1, %2)"]}
    },
    "albert_clear_eye": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.ALBERT_left_eye,"LEFT"],
                    [Lang.Blocks.ALBERT_right_eye,"RIGHT"],
                    [Lang.Blocks.ALBERT_both_eyes,"BOTH"]
                ],
                "value": "LEFT",
                "fontSize": 11
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null ],
            "type": "albert_clear_eye"
        },
        "paramsKeyMap": {
            "DIRECTION": 0
        },
        "class": "albert_led",
        "isNotFor": [ "albert" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            var direction = script.getField("DIRECTION", script);
            if (direction == 'LEFT') {
                sq.leftEye = 0;
            } else if (direction == 'RIGHT') {
                sq.rightEye = 0;
            } else {
                sq.leftEye = 0;
                sq.rightEye = 0;
            }
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Albert.clear_eye(%1)"]}
    },
    "albert_body_led": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ Lang.Blocks.ALBERT_turn_on, "ON" ],
                    [ Lang.Blocks.ALBERT_turn_off, "OFF" ]
                ],
                "value": "ON",
                "fontSize": 11
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null ],
            "type": "albert_body_led"
        },
        "paramsKeyMap": {
            "STATE": 0
        },
        "class": "albert_led",
        "isNotFor": [ "albert" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            var state = script.getField("STATE", script);
            if (state == 'ON') sq.bodyLed = 1;
            else sq.bodyLed = 0;
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Albert.body_led(%1)"]}
    },
    "albert_front_led": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ Lang.Blocks.ALBERT_turn_on, "ON" ],
                    [ Lang.Blocks.ALBERT_turn_off, "OFF" ]
                ],
                "value": "ON",
                "fontSize": 11
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null ],
            "type": "albert_front_led"
        },
        "paramsKeyMap": {
            "STATE": 0
        },
        "class": "albert_led",
        "isNotFor": [ "albert" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            var state = script.getField("STATE", script);
            if (state == 'ON') sq.frontLed = 1;
            else sq.frontLed = 0;
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Albert.front_led(%1)"]}
    },
    "albert_beep": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "albert_beep"
        },
        "class": "albert_buzzer",
        "isNotFor": [ "albert" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            if (!script.isStart) {
                script.isStart = true;
                script.timeFlag = 1;
                sq.buzzer = 440;
                sq.note = 0;
                var timeValue = 0.2 * 1000;
                var timer = setTimeout(function() {
                    script.timeFlag = 0;
                    Entry.Albert.removeTimeout(timer);
                }, timeValue);
                Entry.Albert.timeouts.push(timer);
                return script;
            } else if (script.timeFlag == 1) {
                return script;
            } else {
                delete script.isStart;
                delete script.timeFlag;
                Entry.engine.isContinue = false;
                sq.buzzer = 0;
                return script.callReturn();
            }
        },
        "syntax": {"js": [], "py": ["Albert.beep()"]}
    },
    "albert_change_buzzer_by": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "text",
                    "params": [ "10" ]
                },
                null
            ],
            "type": "albert_change_buzzer_by"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "albert_buzzer",
        "isNotFor": [ "albert" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            var value = script.getNumberValue('VALUE');
            sq.buzzer = sq.buzzer != undefined ? sq.buzzer + value : value;
            sq.note = 0;
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Albert.change_buzzer(%1)"]}
    },
    "albert_set_buzzer_to": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "text",
                    "params": [ "1000" ]
                },
                null
            ],
            "type": "albert_set_buzzer_to"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "albert_buzzer",
        "isNotFor": [ "albert" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            sq.buzzer = script.getNumberValue('VALUE');
            sq.note = 0;
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Albert.set_buzzer(%1)"]}
    },
    "albert_clear_buzzer": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "albert_clear_buzzer"
        },
        "class": "albert_buzzer",
        "isNotFor": [ "albert" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            sq.buzzer = 0;
            sq.note = 0;
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Albert.clear_buzzer()"]}
    },
    "albert_play_note_for": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.ALBERT_note_c + '',"4"],
                    [Lang.Blocks.ALBERT_note_c + '#',"5"],
                    [Lang.Blocks.ALBERT_note_d + '',"6"],
                    [Lang.Blocks.ALBERT_note_e + 'b',"7"],
                    [Lang.Blocks.ALBERT_note_e + '',"8"],
                    [Lang.Blocks.ALBERT_note_f + '',"9"],
                    [Lang.Blocks.ALBERT_note_f + '#',"10"],
                    [Lang.Blocks.ALBERT_note_g + '',"11"],
                    [Lang.Blocks.ALBERT_note_g + '#',"12"],
                    [Lang.Blocks.ALBERT_note_a + '',"13"],
                    [Lang.Blocks.ALBERT_note_b + 'b',"14"],
                    [Lang.Blocks.ALBERT_note_b + '',"15"]
                ],
                "value": "4",
                "fontSize": 11
            },
            {
                "type": "Dropdown",
                "options": [
                    [ "1", "1" ],
                    [ "2", "2" ],
                    [ "3", "3" ],
                    [ "4", "4" ],
                    [ "5", "5" ],
                    [ "6", "6" ],
                    [ "7", "7" ]
                ],
                "value": "1",
                "fontSize": 11
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                "4",
                {
                    "type": "text",
                    "params": [ "0.5" ]
                },
                null
            ],
            "type": "albert_play_note_for"
        },
        "paramsKeyMap": {
            "NOTE": 0,
            "OCTAVE": 1,
            "VALUE": 2
        },
        "class": "albert_buzzer",
        "isNotFor": [ "albert" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            if (!script.isStart) {
                var note = script.getNumberField("NOTE", script);
                var octave = script.getNumberField("OCTAVE", script);
                var beat = script.getNumberValue("VALUE", script);
                var tempo = Entry.Albert.tempo;
                note += (octave-1)*12;
                var timeValue = beat*60*1000/tempo;
                script.isStart = true;
                script.timeFlag = 1;
                sq.buzzer = 0;
                sq.note = note;
                if (timeValue > 100) {
                    var timer1 = setTimeout(function() {
                        sq.note = 0;
                        Entry.Albert.removeTimeout(timer1);
                    }, timeValue-100);
                    Entry.Albert.timeouts.push(timer1);
                }
                var timer2 = setTimeout(function() {
                    script.timeFlag = 0;
                    Entry.Albert.removeTimeout(timer2);
                }, timeValue);
                Entry.Albert.timeouts.push(timer2);
                return script;
            } else if (script.timeFlag == 1) {
                return script;
            } else {
                delete script.isStart;
                delete script.timeFlag;
                Entry.engine.isContinue = false;
                sq.note = 0;
                return script.callReturn();
            }
        },
        "syntax": {"js": [], "py": ["Albert.play_note(%1, %2, %3)"]}
    },
    "albert_rest_for": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "text",
                    "params": [ "0.25" ]
                },
                null
            ],
            "type": "albert_rest_for"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "albert_buzzer",
        "isNotFor": [ "albert" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            if (!script.isStart) {
                script.isStart = true;
                script.timeFlag = 1;
                var timeValue = script.getNumberValue('VALUE');
                timeValue = timeValue*60*1000/Entry.Albert.tempo;
                sq.buzzer = 0;
                sq.note = 0;
                var timer = setTimeout(function() {
                    script.timeFlag = 0;
                    Entry.Albert.removeTimeout(timer);
                }, timeValue);
                Entry.Albert.timeouts.push(timer);
                return script;
            } else if (script.timeFlag == 1) {
                return script;
            } else {
                delete script.isStart;
                delete script.timeFlag;
                Entry.engine.isContinue = false;
                return script.callReturn();
            }
        },
        "syntax": {"js": [], "py": ["Albert.rest(%1)"]}
    },
    "albert_change_tempo_by": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "text",
                    "params": [ "20" ]
                },
                null
            ],
            "type": "albert_change_tempo_by"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "albert_buzzer",
        "isNotFor": [ "albert" ],
        "func": function (sprite, script) {
            Entry.Albert.tempo += script.getNumberValue('VALUE');
            if (Entry.Albert.tempo < 1) Entry.Albert.tempo = 1;
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Albert.change_tempo(%1)"]}
    },
    "albert_set_tempo_to": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "text",
                    "params": [ "60" ]
                },
                null
            ],
            "type": "albert_set_tempo_to"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "albert_buzzer",
        "isNotFor": [ "albert" ],
        "func": function (sprite, script) {
            Entry.Albert.tempo = script.getNumberValue('VALUE');
            if (Entry.Albert.tempo < 1) Entry.Albert.tempo = 1;
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Albert.set_tempo(%1)"]}
    },
    "albert_move_forward": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null ]
        },
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            if (!script.isStart) {
                script.isStart = true;
                script.timeFlag = 1;
                sq.leftWheel = 30;
                sq.rightWheel = 30;
                var timeValue = 1 * 1000;
                setTimeout(function() {
                    script.timeFlag = 0;
                }, timeValue);
                return script;
            } else if (script.timeFlag == 1) {
                return script;
            } else {
                delete script.timeFlag;
                delete script.isStart;
                Entry.engine.isContinue = false;
                sq.leftWheel = 0;
                sq.rightWheel = 0;
                return script.callReturn();
            }
        },
        "syntax": {"js": [], "py": ["Albert.move_forward()"]}
    },
    "albert_move_backward": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                null
            ]
        },
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            if (!script.isStart) {
                script.isStart = true;
                script.timeFlag = 1;
                var timeValue = 1 * 1000;
                setTimeout(function() {
                    script.timeFlag = 0;
                }, timeValue);
                return script;
            } else if (script.timeFlag == 1) {
                sq.leftWheel = -30;
                sq.rightWheel = -30;
                return script;
            } else {
                delete script.timeFlag;
                delete script.isStart;
                Entry.engine.isContinue = false;
                sq.leftWheel = 0;
                sq.rightWheel = 0;
                return script.callReturn();
            }
        },
        "syntax": {"js": [], "py": ["Albert.move_backward()"]}
    },
    "albert_turn_around": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ Lang.Blocks.ALBERT_turn_left, "LEFT" ],
                    [ Lang.Blocks.ALBERT_turn_right, "RIGHT" ]
                ],
                "value": "LEFT",
                "fontSize": 11
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null ]
        },
        "paramsKeyMap": {
            "DIRECTION": 0
        },
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            if (!script.isStart) {
                var direction = script.getField("DIRECTION", script);
                var isLeft = direction == 'LEFT';
                script.leftValue = isLeft ? -30 : 30;
                script.rightValue = isLeft ? 30 : -30;
                script.isStart = true;
                script.timeFlag = 1;
                var timeValue = 1 * 1000;
                setTimeout(function() {
                    script.timeFlag = 0;
                }, timeValue);
                return script;
            } else if (script.timeFlag == 1) {
                sq.leftWheel = script.leftValue;
                sq.rightWheel = script.rightValue;
                return script;
            } else {
                delete script.timeFlag;
                delete script.isStart;
                delete script.leftValue;
                delete script.rightValue;
                Entry.engine.isContinue = false;
                sq.leftWheel = 0;
                sq.rightWheel = 0;
                return script.callReturn();
            }
        },
        "syntax": {"js": [], "py": ["Albert.turn_around()"]}
    },
    "albert_set_led_to": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ Lang.Blocks.HAMSTER_left_led, "LEFT" ],
                    [ Lang.Blocks.HAMSTER_right_led, "RIGHT" ],
                    [ Lang.Blocks.HAMSTER_both_leds, "FRONT" ]
                ],
                "value": "LEFT",
                "fontSize": 11
            },
            {
                "type": "Dropdown",
                "options": [
                    [ Lang.Blocks.HAMSTER_color_red, "4" ],
                    [ Lang.Blocks.HAMSTER_color_yellow, "6" ],
                    [ Lang.Blocks.HAMSTER_color_green, "2" ],
                    [ Lang.Blocks.HAMSTER_color_cyan, "3" ],
                    [ Lang.Blocks.HAMSTER_color_blue, "1" ],
                    [ Lang.Blocks.HAMSTER_color_magenta, "5" ],
                    [ Lang.Blocks.HAMSTER_color_white, "7" ]
                ],
                "value": "4",
                "fontSize": 11
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null, null ]
        },
        "paramsKeyMap": {
            "DIRECTION": 0,
            "COLOR": 1
        },
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            var direction = script.getField("DIRECTION", script);
            var color = Number(script.getField("COLOR", script));
            if (direction == 'FRONT') {
                sq.leftEye = color;
                sq.rightEye = color;
            } else if (direction == 'LEFT')
                sq.leftEye = color;
            else
                sq.rightEye = color;

            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Albert.set_led(%1, %2)"]}
    },
    "albert_clear_led": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ Lang.Blocks.HAMSTER_left_led, "LEFT" ],
                    [ Lang.Blocks.HAMSTER_right_led, "RIGHT" ],
                    [ Lang.Blocks.HAMSTER_both_leds, "FRONT" ]
                ],
                "value": "LEFT",
                "fontSize": 11
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null ]
        },
        "paramsKeyMap": {
            "DIRECTION": 0
        },
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            var direction = script.getField("DIRECTION", script);
            if (direction == 'FRONT') {
                sq.leftEye = 0;
                sq.rightEye = 0;
            } else if (direction == 'LEFT') sq.leftEye = 0;
            else sq.rightEye = 0;

            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Albert.clear_led(%1)"]}
    },
    "albert_change_wheels_by": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ Lang.Blocks.ALBERT_left_wheel, "LEFT" ],
                    [ Lang.Blocks.ALBERT_right_wheel, "RIGHT" ],
                    [ Lang.Blocks.ALBERT_both_wheels, "FRONT" ]
                ],
                "value": "LEFT",
                "fontSize": 11
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null ]
        },
        "paramsKeyMap": {
            "DIRECTION": 0,
            "VALUE": 1
        },
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            var pd = Entry.hw.portData;
            var direction = script.getField('DIRECTION');
            var value = script.getNumberValue('VALUE');

            if (direction == 'LEFT') {
                sq.leftWheel = sq.leftWheel != undefined ?
                    sq.leftWheel + value : pd.leftWheel + value;
            } else if (direction == 'RIGHT')
                sq.rightWheel = sq.rightWheel != undefined ?
                sq.rightWheel + value : pd.rightWheel + value;
                else {
                    sq.leftWheel = sq.leftWheel != undefined ?
                        sq.leftWheel + value : pd.leftWheel + value;
                        sq.rightWheel = sq.rightWheel != undefined ?
                            sq.rightWheel + value : pd.rightWheel + value;
                }

                return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Albert.change_wheels(%1, %2)"]}
    },
    "albert_set_wheels_to": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ Lang.Blocks.ALBERT_left_wheel, "LEFT" ],
                    [ Lang.Blocks.ALBERT_right_wheel, "RIGHT" ],
                    [ Lang.Blocks.ALBERT_both_wheels, "FRONT" ]
                ],
                "value": "LEFT",
                "fontSize": 11
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null ]
        },
        "paramsKeyMap": {
            "DIRECTION": 0,
            "VALUE": 1
        },
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            var direction = script.getField('DIRECTION');
            var value = script.getNumberValue('VALUE');

            if (direction == 'LEFT') sq.leftWheel = value;
            else if (direction == 'RIGHT') sq.rightWheel = value;
            else {
                sq.leftWheel = value;
                sq.rightWheel = value;
            }

            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Albert.set_wheels(%1, %2)"]}
    },
    "arduino_text": {
        "color": "#00979D",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "TextInput",
                "value": 10
            }
        ],
        "events": {},
        "def": {
            "params": []
        },
        "paramsKeyMap": {
            "NAME": 0
        },
        "func": function (sprite, script) {
            return script.getStringField("NAME");
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "%1", 
                textParams: [
                    {
                        "type": "TextInput",
                        "value": 10,
                        converter: Entry.block.converters.returnStringOrNumberByValue
                    }
                ],
                keyOption: "arduino_text"
            }
        ]}
    },
    "arduino_send": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            }
        ],
        "events": {},
        "def": {
            "params": []
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "func": function (sprite, script) {
            var signal = script.getValue("VALUE", script);
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "POST", 'http://localhost:23518/arduino/', false );
            xmlHttp.send(String(signal));
            Entry.assert(xmlHttp.status == 200, "arduino is not connected");
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Arduino.send(%1)"]}
    },
    "arduino_get_number": {
        "color": "#00979D",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            }
        ],
        "events": {},
        "def": {
            "params": []
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "func": function (sprite, script) {
            var signal = script.getValue("VALUE", script);
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "POST", 'http://localhost:23518/arduino/', false );
            xmlHttp.send(String(signal));
            Entry.assert(xmlHttp.status == 200, "arduino is not connected");
            var data = xmlHttp.responseText;
            return Number(data);
        },
        "syntax": {"js": [], "py": ["Arduino.number(%1)"]}
    },
    "arduino_get_string": {
        "color": "#00979D",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            }
        ],
        "events": {},
        "def": {
            "params": []
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "func": function (sprite, script) {
            var signal = script.getValue("VALUE", script);
            var xmlHttp = new XMLHttpRequest();
            xmlHttp.open( "POST", 'http://localhost:23518/arduino/', false );
            xmlHttp.send(String(signal));
            Entry.assert(xmlHttp.status == 200, "arduino is not connected");
            var data = xmlHttp.responseText;
            return data;
        },
        "syntax": {"js": [], "py": ["Arduino.string(%1)"]}
    },
    "arduino_get_sensor_number": {
        "color": "#00979D",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ "0", "A0" ],
                    [ "1", "A1" ],
                    [ "2", "A2" ],
                    [ "3", "A3" ],
                    [ "4", "A4" ],
                    [ "5", "A5" ]
                ],
                "value": "A0",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_HW
            }
        ],
        "events": {},
        "def": {
            "params": [ null ]
        },
        "paramsKeyMap": {
            "PORT": 0
        },
        "func": function (sprite, script) {
            return script.getStringField("PORT");
        },
        "syntax": {"js": [], "py": [
            {
                syntax:"%1",
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [ "0", "A0" ],
                            [ "1", "A1" ],
                            [ "2", "A2" ],
                            [ "3", "A3" ],
                            [ "4", "A4" ],
                            [ "5", "A5" ]
                        ],
                        "value": "A0",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_HW,
                        converter: Entry.block.converters.returnStringValue,
                        caseType: "no"
                    }
                ],
                keyOption: "arduino_get_sensor_number"
            }
        ]}
    },
    "arduino_get_port_number": {
        "color": "#00979D",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ "0", "0" ],
                    [ "1", "1" ],
                    [ "2", "2" ],
                    [ "3", "3" ],
                    [ "4", "4" ],
                    [ "5", "5" ],
                    [ "6", "6" ],
                    [ "7", "7" ],
                    [ "8", "8" ],
                    [ "9", "9" ],
                    [ "10", "10" ],
                    [ "11", "11" ],
                    [ "12", "12" ],
                    [ "13", "13" ]
                ],
                "value": "0",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_HW
            }
        ],
        "events": {},
        "def": {
            "params": [ null ]
        },
        "paramsKeyMap": {
            "PORT": 0
        },
        "func": function (sprite, script) {
            return script.getStringField("PORT");
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "%1", 
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [ "0", "0" ],
                            [ "1", "1" ],
                            [ "2", "2" ],
                            [ "3", "3" ],
                            [ "4", "4" ],
                            [ "5", "5" ],
                            [ "6", "6" ],
                            [ "7", "7" ],
                            [ "8", "8" ],
                            [ "9", "9" ],
                            [ "10", "10" ],
                            [ "11", "11" ],
                            [ "12", "12" ],
                            [ "13", "13" ]
                        ],
                        "value": "0",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_HW
                    }
                ],
                keyOption: "arduino_get_port_number"
            }
        ]}
    },
    "arduino_get_pwm_port_number": {
        "color": "#00979D",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ "3", "3" ],
                    [ "5", "5" ],
                    [ "6", "6" ],
                    [ "9", "9" ],
                    [ "10", "10" ],
                    [ "11", "11" ]
                ],
                "value": "3",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_HW
            }
        ],
        "events": {},
        "def": {
            "params": [ null ]
        },
        "paramsKeyMap": {
            "PORT": 0
        },
        "func": function (sprite, script) {
            return script.getStringField("PORT");
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "%1", 
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [ "3", "3" ],
                            [ "5", "5" ],
                            [ "6", "6" ],
                            [ "9", "9" ],
                            [ "10", "10" ],
                            [ "11", "11" ]
                        ],
                        "value": "3",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_HW,
                        converter: Entry.block.converters.returnStringOrNumberByValue
                    }
                ],
                keyOption: "arduino_get_pwm_port_number"
            }
        ]}
    },
    "arduino_get_number_sensor_value": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "arduino_get_sensor_number"
                }
            ],
            "type": "arduino_get_number_sensor_value"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "arduino_value",
        "isNotFor": [ "arduino" ],
        "func": function (sprite, script) {
            var signal = script.getValue("VALUE", script);
            return Entry.hw.getAnalogPortValue(signal[1]);
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Arduino.sensor_value(%1)",
                textParams: [
                    {
                        "type": "Block",
                        "accept": "string"
                    }
                ]
            }
        ]}
    },
    "arduino_get_digital_value": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_boolean_field",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "arduino_get_port_number"
                }
            ],
            "type": "arduino_get_digital_value"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "arduino_value",
        "isNotFor": [ "arduino" ],
        "func": function (sprite, script) {
            var signal = script.getNumberValue("VALUE", script);
            return Entry.hw.getDigitalPortValue(signal);
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Arduino.digitalRead(%1)",
                textParams: [
                    {
                        "type": "Block",
                        "accept": "string"
                    }
                ]
            }
        ]}
    },
    "arduino_toggle_led": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.ARDUINO_on,"on"],
                    [Lang.Blocks.ARDUINO_off,"off"]
                ],
                "value": "on",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_HW
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "arduino_get_port_number"
                },
                null,
                null
            ],
            "type": "arduino_toggle_led"
        },
        "paramsKeyMap": {
            "VALUE": 0,
            "OPERATOR": 1
        },
        "class": "arduino_set",
        "isNotFor": [ "arduino" ],
        "func": function (sprite, script) {
            var port = script.getNumberValue("VALUE");
            var operator = script.getField("OPERATOR");
            var value = operator == "on" ? 255 : 0;
            Entry.hw.setDigitalPortValue(port, value);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Arduino.pin_digital(%1, %2)",
                textParams: [
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.ARDUINO_on,"on"],
                            [Lang.Blocks.ARDUINO_off,"off"]
                        ],
                        "value": "on",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_HW,
                        converter: Entry.block.converters.returnStringValue
                    }
                ]
            }
        ]}
            
    },
    "arduino_toggle_pwm": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "arduino_get_pwm_port_number"
                },
                {
                    "type": "arduino_text",
                    "params": [ "255" ]
                },
                null
            ],
            "type": "arduino_toggle_pwm"
        },
        "paramsKeyMap": {
            "PORT": 0,
            "VALUE": 1
        },
        "class": "arduino_set",
        "isNotFor": [ "arduino" ],
        "func": function (sprite, script) {
            var port = script.getNumberValue("PORT");
            var value = script.getNumberValue("VALUE");
            value = Math.round(value);
            value = Math.max(value, 0);
            value = Math.min(value, 255);
            Entry.hw.setDigitalPortValue(port, value);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Arduino.set_pin_digital(%1, %2)",
                textParams: [
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    {
                        "type": "Block",
                        "accept": "string"
                    }
                ]
            }
        ]}
    },
    "arduino_convert_scale": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "arduino_get_number_sensor_value",
                    "params": [
                        {
                            "type": "arduino_get_sensor_number",
                            "id": "bl5e"
                        }
                    ]
                },
                {
                    "type": "number",
                    "params": [ "0" ]
                },
                {
                    "type": "number",
                    "params": [ "1023" ]
                },
                {
                    "type": "number",
                    "params": [ "0" ]
                },
                {
                    "type": "number",
                    "params": [ "100" ]
                }
            ],
            "type": "arduino_convert_scale"
        },
        "paramsKeyMap": {
            "VALUE1": 0,
            "VALUE2": 1,
            "VALUE3": 2,
            "VALUE4": 3,
            "VALUE5": 4
        },
        "class": "arduino",
        "isNotFor": [ "arduino" ],
        "func": function (sprite, script) {
            var value1 = script.getNumberValue("VALUE1", script);
            var value2 = script.getNumberValue("VALUE2", script);
            var value3 = script.getNumberValue("VALUE3", script);
            var value4 = script.getNumberValue("VALUE4", script);
            var value5 = script.getNumberValue("VALUE5", script);
            var result = value1;
            if (value2 > value3) {
                var swap = value2;
                value2 = value3;
                value3 = swap;
            }
            if (value4 > value5) {
                var swap = value4;
                value4 = value5;
                value5 = swap;
            }
            result -= value2;
            result = result * ((value5 - value4) / (value3 - value2));
            result += value4;
            result = Math.min(value5, result);
            result = Math.max(value4, result);
            return Math.round(result);
        },
        "syntax": {"js": [], "py": [
            {
                syntax:"Arduino.convert_scale(%1, %2, %3, %4, %5)",
                textParams: [
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    {
                        "type": "Block",
                        "accept": "string"
                    }
                ]
            }
        ]}
    },
    "arduino_ext_analog_list": {
        "color": "#00979D",
        "skeleton": "basic_string_field",
        "statements": [],
        "template": "%1",
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ "A0", "0" ],
                    [ "A1", "1" ],
                    [ "A2", "2" ],
                    [ "A3", "3" ],
                    [ "A4", "4" ],
                    [ "A5", "5" ]
                ],
                "value": "0",
                "fontSize": 11
            }
        ],
        "events": {},
        "def": {
            "params": [ null ]
        },
        "paramsKeyMap": {
            "PORT": 0
        },
        "func": function (sprite, script) {
            return script.getField("PORT");
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "%1",
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [ "A0", "0" ],
                            [ "A1", "1" ],
                            [ "A2", "2" ],
                            [ "A3", "3" ],
                            [ "A4", "4" ],
                            [ "A5", "5" ]
                        ],
                        "value": "0",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringKey
                    }
                ],
                keyOption: "arduino_ext_analog_list"
            }
        ]}
    },
    "arduino_ext_get_analog_value": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            }   
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "arduino_ext_analog_list"
                }
            ],
            "type": "arduino_ext_get_analog_value"
        },
        "paramsKeyMap": {
            "PORT": 0
        },
        "class": "ArduinoExtGet",
        "isNotFor": [ "ArduinoExt" ],
        "func": function (sprite, script) {
            var port = script.getValue("PORT", script);
            var ANALOG = Entry.hw.portData.ANALOG;
            return (ANALOG) ? ANALOG[port] || 0 : 0;
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Arduino.analogRead(%1)",
                textParams: [
                    {
                        "type": "Block",
                        "accept": "string"
                    } 
                ]
            }
        ]}
    },
    "arduino_ext_get_analog_value_map": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "arduino_ext_get_analog_value",
                    "params": [
                        {
                            "type": "arduino_ext_analog_list"
                        }
                    ]
                },
                {
                    "type": "number",
                    "params": [ "0" ]
                },
                {
                    "type": "number",
                    "params": [ "1023" ]
                },
                {
                    "type": "number",
                    "params": [ "0" ]
                },
                {
                    "type": "number",
                    "params": [ "100" ]
                }
            ],
            "type": "arduino_ext_get_analog_value_map"
        },
        "paramsKeyMap": {
            "PORT": 0,
            "VALUE2": 1,
            "VALUE3": 2,
            "VALUE4": 3,
            "VALUE5": 4
        },
        "class": "ArduinoExtGet",
        "isNotFor": [ "ArduinoExt" ],
        "func": function (sprite, script) {
            var port = script.getField("PORT", script);
            var ANALOG = Entry.hw.portData.ANALOG;
            var value2 = script.getNumberValue("VALUE2", script);
            var value3 = script.getNumberValue("VALUE3", script);
            var value4 = script.getNumberValue("VALUE4", script);
            var value5 = script.getNumberValue("VALUE5", script);

            var result = ANALOG[port] || 0;
            if (value2 > value3) {
                var swap = value2;
                value2 = value3;
                value3 = swap;
            }
            if (value4 > value5) {
                var swap = value4;
                value4 = value5;
                value5 = swap;
            }
            result -= value2;
            result = result * ((value5 - value4) / (value3 - value2));
            result += value4;
            result = Math.min(value5, result);
            result = Math.max(value4, result);

            return result
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Arduino.map(%1, %2, %3, %4, %5)", 
                textParams: [
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    {
                        "type": "Block",
                        "accept": "string"
                    }
                ]
            }
        ]}
    },
    "arduino_ext_get_ultrasonic_value": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ "0", "0" ],
                    [ "1", "1" ],
                    [ "2", "2" ],
                    [ "3", "3" ],
                    [ "4", "4" ],
                    [ "5", "5" ],
                    [ "6", "6" ],
                    [ "7", "7" ],
                    [ "8", "8" ],
                    [ "9", "9" ],
                    [ "10", "10" ],
                    [ "11", "11" ],
                    [ "12", "12" ],
                    [ "13", "13" ],
                ],
                "value": "0",
                "fontSize": 11
            },
            {
                "type": "Dropdown",
                "options": [
                    [ "0", "0" ],
                    [ "1", "1" ],
                    [ "2", "2" ],
                    [ "3", "3" ],
                    [ "4", "4" ],
                    [ "5", "5" ],
                    [ "6", "6" ],
                    [ "7", "7" ],
                    [ "8", "8" ],
                    [ "9", "9" ],
                    [ "10", "10" ],
                    [ "11", "11" ],
                    [ "12", "12" ],
                    [ "13", "13" ],
                ],
                "value": "0",
                "fontSize": 11
            }
        ],
        "events": {},
        "def": {
            "params": [ '2', '4' ],
            "type": "arduino_ext_get_ultrasonic_value"
        },
        "paramsKeyMap": {
            "PORT1": 0,
            "PORT2": 1,
        },
        "class": "ArduinoExtGet",
        "isNotFor": [ "ArduinoExt" ],
        "func": function (sprite, script) {
            var port1 = script.getField("PORT1", script);
            var port2 = script.getField("PORT2", script);
            if(!Entry.hw.sendQueue['SET']) {
                Entry.hw.sendQueue['SET'] = {};
            }
            delete Entry.hw.sendQueue['SET'][port1];
            delete Entry.hw.sendQueue['SET'][port2];

            if(!Entry.hw.sendQueue['GET']) {
                Entry.hw.sendQueue['GET'] = {};
            }
            Entry.hw.sendQueue['GET'][Entry.ArduinoExt.sensorTypes.ULTRASONIC] = {
                port: [port1, port2],
                time: new Date().getTime()
            };
            return Entry.hw.portData.ULTRASONIC || 0;
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Arduino.ultrasonicRead(%1, %2)",
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [ "0", "0" ],
                            [ "1", "1" ],
                            [ "2", "2" ],
                            [ "3", "3" ],
                            [ "4", "4" ],
                            [ "5", "5" ],
                            [ "6", "6" ],
                            [ "7", "7" ],
                            [ "8", "8" ],
                            [ "9", "9" ],
                            [ "10", "10" ],
                            [ "11", "11" ],
                            [ "12", "12" ],
                            [ "13", "13" ],
                        ],
                        "value": "0",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringOrNumberByValue
                    },
                    {
                        "type": "Dropdown",
                        "options": [
                            [ "0", "0" ],
                            [ "1", "1" ],
                            [ "2", "2" ],
                            [ "3", "3" ],
                            [ "4", "4" ],
                            [ "5", "5" ],
                            [ "6", "6" ],
                            [ "7", "7" ],
                            [ "8", "8" ],
                            [ "9", "9" ],
                            [ "10", "10" ],
                            [ "11", "11" ],
                            [ "12", "12" ],
                            [ "13", "13" ],
                        ],
                        "value": "0",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringOrNumberByValue
                    }
                ]
            }

        ]}
    },
    "arduino_ext_get_digital": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_boolean_field",
        "params": [{
            "type": "Block",
            "accept": "string"
        }],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "arduino_get_port_number"
                }
            ],
            "type": "arduino_ext_get_digital"
        },
        "paramsKeyMap": {
            "PORT": 0
        },
        "class": "ArduinoExtGet",
        "isNotFor": [ "ArduinoExt" ],
        "func": function (sprite, script) {
            var port = script.getNumberValue("PORT", script);
            var DIGITAL = Entry.hw.portData.DIGITAL;
            if(!Entry.hw.sendQueue['GET']) {
                Entry.hw.sendQueue['GET'] = {};
            }
            Entry.hw.sendQueue['GET'][Entry.ArduinoExt.sensorTypes.DIGITAL] = {
                port: port,
                time: new Date().getTime()
            };
            return (DIGITAL) ? DIGITAL[port] || 0 : 0;
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Arduino.digitalRead(%1)",
                textParams: [
                    {
                        "type": "Block",
                        "accept": "string"
                    }
                ]
            }
        ]}
    },
    "arduino_ext_toggle_led": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.ARDUINO_on,"on"],
                    [Lang.Blocks.ARDUINO_off,"off"]
                ],
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_HW
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "arduino_get_port_number"
                },
                'on',
                null
            ],
            "type": "arduino_ext_toggle_led"
        },
        "paramsKeyMap": {
            "PORT": 0,
            "VALUE": 1
        },
        "class": "ArduinoExt",
        "isNotFor": [ "ArduinoExt" ],
        "func": function (sprite, script) {
            var port = script.getNumberValue("PORT");
            var value = script.getField("VALUE");
             if(value == "on") {
                value = 255;
            } else {
                value = 0;
            }
            if(!Entry.hw.sendQueue['SET']) {
                Entry.hw.sendQueue['SET'] = {};
            }
            Entry.hw.sendQueue['SET'][port] = {
                type: Entry.ArduinoExt.sensorTypes.DIGITAL,
                data: value,
                time: new Date().getTime()
            };
            return script.callReturn(); 
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Arduino.digitalWrite(%1, %2)", 
                textParams: [
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.ARDUINO_on,"on"],
                            [Lang.Blocks.ARDUINO_off,"off"]
                        ],
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_HW,
                        converter: Entry.block.converters.returnStringValue,
                        codeMap: "Entry.CodeMap.Arduino.digitalWrite[1]",
                        caseType: "no"
                    },
                ]
            }
        ]}

    },
    "arduino_ext_digital_pwm": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "arduino_get_pwm_port_number"
                },
                {
                    "type": "text",
                    "params": [ "255" ]
                },
                null
            ],
            "type": "arduino_ext_digital_pwm"
        },
        "paramsKeyMap": {
            "PORT": 0,
            "VALUE": 1
        },
        "class": "ArduinoExt",
        "isNotFor": [ "ArduinoExt" ],
        "func": function (sprite, script) {
            var port = script.getNumberValue("PORT");
            var value = script.getNumberValue("VALUE");
            value = Math.round(value);
            value = Math.max(value, 0);
            value = Math.min(value, 255);
            if(!Entry.hw.sendQueue['SET']) {
                Entry.hw.sendQueue['SET'] = {};
            }
            Entry.hw.sendQueue['SET'][port] = {
                type: Entry.ArduinoExt.sensorTypes.PWM,
                data: value,
                time: new Date().getTime()
            };
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Arduino.analogWrite(%1, %2)",
                textParams: [
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    {
                        "type": "Block",
                        "accept": "string"
                    }
                ] 
            }
        ]}
    },
    "arduino_ext_tone_list": {
        "color": "#00979D",
        "skeleton": "basic_string_field",
        "statements": [],
        "template": "%1",
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.silent, "0"],
                    [Lang.Blocks.do_name, "C"],
                    [Lang.Blocks.do_sharp_name, "CS"],
                    [Lang.Blocks.re_name, "D"],
                    [Lang.Blocks.re_sharp_name, "DS"],
                    [Lang.Blocks.mi_name, "E"],
                    [Lang.Blocks.fa_name, "F"],
                    [Lang.Blocks.fa_sharp_name, "FS"],
                    [Lang.Blocks.sol_name, "G"],
                    [Lang.Blocks.sol_sharp_name, "GS"],
                    [Lang.Blocks.la_name, "A"],
                    [Lang.Blocks.la_sharp_name, "AS"],
                    [Lang.Blocks.si_name, "B"]
                ],
                "value": "C",
                "fontSize": 11
            }
        ],
        "events": {},
        "def": {
            "params": [ null ]
        },
        "paramsKeyMap": {
            "NOTE": 0
        },
        "func": function (sprite, script) {
            return script.getField("NOTE");
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "%1", 
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.silent, "0"],
                            [Lang.Blocks.do_name, "C"],
                            [Lang.Blocks.do_sharp_name, "CS"],
                            [Lang.Blocks.re_name, "D"],
                            [Lang.Blocks.re_sharp_name, "DS"],
                            [Lang.Blocks.mi_name, "E"],
                            [Lang.Blocks.fa_name, "F"],
                            [Lang.Blocks.fa_sharp_name, "FS"],
                            [Lang.Blocks.sol_name, "G"],
                            [Lang.Blocks.sol_sharp_name, "GS"],
                            [Lang.Blocks.la_name, "A"],
                            [Lang.Blocks.la_sharp_name, "AS"],
                            [Lang.Blocks.si_name, "B"]
                        ],
                        "value": "C",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue,
                        caseType: "no"
                    }
                ],
                keyOption: "arduino_ext_tone_list"
            }
        ]}
    },
    "arduino_ext_tone_value": {
        "color": "#00979D",
        "skeleton": "basic_string_field",
        "statements": [],
        "template": "%1",
        "params": [
            {
                "type": "Block",
                "accept": "string"
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "arduino_ext_tone_list"
                }
            ],
            "type": "arduino_ext_tone_value"
        },
        "paramsKeyMap": {
            "NOTE": 0
        },
        "func": function (sprite, script) {
            return script.getNumberValue("NOTE");
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "%1", 
                keyOption: "arduino_ext_tone_value"
            }
        ]}
    },
    "arduino_ext_octave_list": {
        "color": "#00979D",
        "skeleton": "basic_string_field",
        "statements": [],
        "template": "%1",
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    ["1", "0"],
                    ["2", "1"],
                    ["3", "2"],
                    ["4", "3"],
                    ["5", "4"],
                    ["6", "5"]
                ],
                "value": "3",
                "fontSize": 11
            }
        ],
        "events": {},
        "def": {
            "params": [ null ]
        },
        "paramsKeyMap": {
            "OCTAVE": 0
        },
        "func": function (sprite, script) {
            return script.getField("OCTAVE");
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "%1", 
                keyOption: "arduino_ext_octave_list"
            }
        ]}
    },
    "arduino_ext_set_tone": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [{
            "type": "Block",
            "accept": "string"
        }, {
            "type": "Block",
            "accept": "string"
        }, {
            "type": "Block",
            "accept": "string"
        }, {
            "type": "Block",
            "accept": "string"
        }, {
            "type": "Indicator",
            "img": "block_icon/hardware_03.png",
            "size": 12
        }],
        "events": {},
        "def": {
            "params": [{
                    "type": "arduino_get_port_number"
                },
                {
                    "type": "arduino_ext_tone_list"
                },
                {
                    "type": "arduino_ext_octave_list"
                },
                {
                    "type": "text",
                    "params": [ "1" ]
                },
                null
            ],
            "type": "arduino_ext_set_tone"
        },
        "paramsKeyMap": {
            "PORT": 0,
            "NOTE": 1,
            "OCTAVE": 2,
            "DURATION": 3
        },
        "class": "ArduinoExt",
        "isNotFor": [ "ArduinoExt" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            var port = script.getNumberValue("PORT", script);

            if (!script.isStart) {
                var note = script.getValue("NOTE", script);
                if(isNaN(note))
                    note = Entry.ArduinoExt.toneTable[note];

                if(note < 0) {
                    note = 0;
                } else if(note > 12) {
                    note = 12;
                }

                var duration = script.getNumberValue("DURATION", script);

                if(duration < 0) {
                    duration = 0;
                }

                if(note === 0 || duration === 0) {
                    sq['SET'][port] = {
                        type: Entry.ArduinoExt.sensorTypes.TONE,
                        data: 0,
                        time: new Date().getTime()
                    };
                    return script.callReturn();
                }

                var octave = script.getNumberValue("OCTAVE", script);
                if(octave < 0) {
                    octave = 0;
                } else if(octave > 5) {
                    octave = 5;
                }
                var value = Entry.ArduinoExt.toneMap[note][octave];

                duration = duration * 1000;
                script.isStart = true;
                script.timeFlag = 1;

                if(!sq['SET']) {
                    sq['SET'] = {};
                }

                sq['SET'][port] = {
                    type: Entry.ArduinoExt.sensorTypes.TONE,
                    data: {
                        value: value,
                        duration: duration
                    },
                    time: new Date().getTime()
                };

                setTimeout(function() {
                    script.timeFlag = 0;
                }, duration + 32);
                return script;
            } else if (script.timeFlag == 1) {
                return script;
            } else {
                delete script.timeFlag;
                delete script.isStart;
                sq['SET'][port] = {
                    type: Entry.ArduinoExt.sensorTypes.TONE,
                    data: 0,
                    time: new Date().getTime()
                };
                Entry.engine.isContinue = false;
                return script.callReturn();
            }
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Arduino.tone(%1, %2, %3, %4)",
                textParams: [
                    {
                        "type": "Block",
                        "accept": "string"
                    }, 
                    {
                        "type": "Block",
                        "accept": "string" 
                    }, 
                    {
                        "type": "Block",
                        "accept": "string"
                    }, 
                    {
                        "type": "Block",
                        "accept": "string"
                    }
                ]
            }
        ]}
    },
    "arduino_ext_set_servo": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [{
            "type": "Block",
            "accept": "string"
        }, {
            "type": "Block",
            "accept": "string"
        }, {
            "type": "Indicator",
            "img": "block_icon/hardware_03.png",
            "size": 12
        }],
        "events": {},
        "def": {
            "params": [{
                    "type": "arduino_get_port_number"
                },
                null
            ],
            "type": "arduino_ext_set_servo"
        },
        "paramsKeyMap": {
            "PORT": 0,
            "VALUE": 1
        },
        "class": "ArduinoExt",
        "isNotFor": [ "ArduinoExt" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            var port = script.getNumberValue("PORT", script);
            var value = script.getNumberValue("VALUE", script);
            value = Math.min(180, value);
            value = Math.max(0, value);

            if(!sq['SET']) {
                sq['SET'] = {};
            }
            sq['SET'][port] = {
                type: Entry.ArduinoExt.sensorTypes.SERVO_PIN,
                data: value,
                time: new Date().getTime()
            };

            return script.callReturn();
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Arduino.servomotorWrite(%1, %2)",
                textParams: [
                    {
                        "type": "Block",
                        "accept": "string"
                    }, 
                    {
                        "type": "Block",
                        "accept": "string"
                    }
                ]
            }
        ]}
    },
    "sensorBoard_get_named_sensor_value": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ "소리", "0" ],
                    [ "빛 감지", "1" ],
                    [ "슬라이더", "2" ],
                    [ "온도", "3" ]
                ],
                "value": "0",
                "fontSize": 11
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "sensorBoard_get_named_sensor_value"
        },
        "paramsKeyMap": {
            "PORT": 0
        },
        "class": "sensorBoard",
        "isNotFor": [ "sensorBoard" ],
        "func": function (sprite, script) {
            return Entry.hw.getAnalogPortValue(script.getField("PORT", script));
        },
        "syntax": {"js": [], "py": ["Sensorboard.sensor_value(%1)"]}
    },
    "sensorBoard_is_button_pressed": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_boolean_field",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ "빨간", "8" ],
                    [ "파란", "9" ],
                    [ "노랑", "10" ],
                    [ "초록", "11" ]
                ],
                "value": "8",
                "fontSize": 11
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "sensorBoard_is_button_pressed"
        },
        "paramsKeyMap": {
            "PORT": 0
        },
        "class": "sensorBoard",
        "isNotFor": [ "sensorBoard" ],
        "func": function (sprite, script) {
            return Entry.hw.getDigitalPortValue(script.getNumberField("PORT", script));
        },
        "syntax": {"js": [], "py": ["Sensorboard.is_button_pressed(%1)"]}
    },
    "sensorBoard_led": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ "빨간", "2" ],
                    [ "초록", "3" ],
                    [ "파란", "4" ],
                    [ "노랑", "5" ]
                ],
                "value": "2",
                "fontSize": 11
            },
            {
                "type": "Dropdown",
                "options": [
                    [ "켜기", "255" ],
                    [ "끄기", "0" ]
                ],
                "value": "255",
                "fontSize": 11
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null, null ],
            "type": "sensorBoard_led"
        },
        "paramsKeyMap": {
            "PORT": 0,
            "OPERATOR": 1
        },
        "class": "sensorBoard",
        "isNotFor": [ "sensorBoard" ],
        "func": function (sprite, script) {
            Entry.hw.setDigitalPortValue(script.getField("PORT"),
                                         script.getNumberField("OPERATOR"));
                                         return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Sensorboard.led(%1, %2)"]}
    },
    "arduino_download_connector": {
        "skeleton": "basic_button",
        "isNotFor": ["arduinoDisconnected"],
        "color": "#eee",
        "params": [
            {
                "type": "Text",
                "text": !Entry.isOffline ? Lang.Blocks.ARDUINO_download_connector : Lang.Blocks.ARDUINO_open_connector,
                "color": "#333",
                "align": "center"
            }
        ],
        "events": {
            "mousedown": [
                function() {
                    Entry.hw.downloadConnector();
                }
            ]
        }
    },
    "download_guide": {
        "skeleton": "basic_button",
        "isNotFor": ["arduinoDisconnected"],
        "color": "#eee",
        "params": [
            {
                "type": "Text",
                "text": Lang.Blocks.download_guide,
                "color": "#333",
                "align": "center"
            }
        ],
        "events": {
            "mousedown": [
                function() {
                    Entry.hw.downloadGuide();
                }
            ]
        }
    },
    "arduino_download_source": {
        "skeleton": "basic_button",
        "isNotFor": ["arduinoDisconnected"],
        "color": "#eee",
        "params": [
            {
                "type": "Text",
                "text": Lang.Blocks.ARDUINO_download_source,
                "color": "#333",
                "align": "center"
            }
        ],
        "events": {
            "mousedown": [
                function() {
                    Entry.hw.downloadSource();
                }
            ]
        }
    },
    "arduino_connected": {
        "skeleton": "basic_button",
        "color": "#eee",
        "isNotFor": ["arduinoConnected"],
        "params": [
            {
                "type": "Text",
                "text": Lang.Blocks.ARDUINO_connected,
                "color": "#333",
                "align": "center"
            }
        ],
        "events": {}
    },
    "arduino_reconnect": {
        "skeleton": "basic_button",
        "color": "#eee",
        "isNotFor": ["arduinoDisconnected"],
        "params": [
            {
                "type": "Text",
                "text": Lang.Blocks.ARDUINO_reconnect,
                "color": "#333",
                "align": "center"
            }
        ],
        "events": {
            "mousedown": [
                function() {
                    Entry.hw.retryConnect();
                }
            ]
        }
    },
    "arduino_open": {
        "skeleton": "basic_button",
        "color": "#eee",
        "isNotFor": [""],
        "template": '%1',
        "params": [
            {
                "type": "Text",
                //TODO: 다국어 적용
                "text": Lang.Blocks.ARDUINO_program,
                "color": "#333",
                "align": "center"
            }
        ],
        "events": {
            "mousedown": [
                function() {
                    Entry.hw.openHardwareProgram();
                }
            ]
        }
    },
    //2016-09-23 added start
    "CODEino_get_sensor_number": {
        "color": "#00979D",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ "0", "A0" ],
                    [ "1", "A1" ],
                    [ "2", "A2" ],
                    [ "3", "A3" ],
                    [ "4", "A4" ],
                    [ "5", "A5" ],
                    [ "6", "A6" ]
                ],
                "value": "A0",
                "fontSize": 11
            }
        ],
        "events": {},
        "def": {
            "params": [ null ]
        },
        "paramsKeyMap": {
            "PORT": 0
        },
        "func": function (sprite, script) {
            return script.getStringField("PORT");
        }
    },
    "CODEino_get_named_sensor_value": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.CODEino_sensor_name_0,"0"],
                    [Lang.Blocks.CODEino_sensor_name_1,"1"],
                    [Lang.Blocks.CODEino_sensor_name_2,"2"],
                    [Lang.Blocks.CODEino_sensor_name_3,"3"],
                    [Lang.Blocks.CODEino_sensor_name_4,"4"],
                    [Lang.Blocks.CODEino_sensor_name_5,"5"],
                    [Lang.Blocks.CODEino_sensor_name_6,"6"]
                ],
                "value": "0",
                "fontSize": 11
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "CODEino_get_named_sensor_value"
        },
        "paramsKeyMap": {
            "PORT": 0
        },
        "class": "CODEino_sensor",
        "isNotFor": [ "CODEino" ],
        "func": function (sprite, script) {
            var port = script.getField("PORT", script);
            var nowTime = Entry.ArduinoExt.getSensorTime(Entry.ArduinoExt.sensorTypes.ANALOG);
            var hardwareTime = Entry.hw.portData['TIME'] || 0;
            var scope = script.executor.scope;
            var ANALOG = Entry.hw.portData.ANALOG;
            if(!scope.isStart) {
                scope.isStart = true;
                scope.stamp = nowTime;
                Entry.hw.sendQueue['TIME'] = nowTime;
                Entry.hw.sendQueue['KEY'] = Entry.ArduinoExt.getSensorKey();
                Entry.hw.sendQueue['GET'] = {
                    type: Entry.ArduinoExt.sensorTypes.ANALOG,
                    port: port
                };
                throw new Entry.Utils.AsyncError();
                return;
            } else if(hardwareTime && (hardwareTime === scope.stamp)) {
                delete scope.isStart;
                delete scope.stamp;
                return (ANALOG) ? ANALOG[port] || 0 : 0;
            } else if(nowTime - scope.stamp > 64) {
                delete scope.isStart;
                delete scope.stamp;
                return (ANALOG) ? ANALOG[port] || 0 : 0;
            } else {
                throw new Entry.Utils.AsyncError();
                return;
            }
        }
    },
    "CODEino_get_sound_status": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_boolean_field",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.CODEino_string_11,"GREAT"],
                    [Lang.Blocks.CODEino_string_12,"SMALL"]
                ],
                "value": "GREAT",
                "fontSize": 11
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "CODEino_get_sound_status"
        },
        "paramsKeyMap": {
            "STATUS": 0
        },
        "class": "CODEino_sensor",
        "isNotFor": [ "CODEino" ],
        "func": function (sprite, script) {
            var value1 = script.getField("STATUS", script);
            var value2 = 1;
            var nowTime = Entry.ArduinoExt.getSensorTime(Entry.ArduinoExt.sensorTypes.ANALOG);
            var hardwareTime = Entry.hw.portData['TIME'] || 0;
            var scope = script.executor.scope;
            var ANALOG = Entry.hw.portData.ANALOG;
            if(!scope.isStart) {
                scope.isStart = true;
                scope.stamp = nowTime;
                Entry.hw.sendQueue['TIME'] = nowTime;
                Entry.hw.sendQueue['KEY'] = Entry.ArduinoExt.getSensorKey();
                Entry.hw.sendQueue['GET'] = {
                    type: Entry.ArduinoExt.sensorTypes.ANALOG,
                    port: 0
                };
                throw new Entry.Utils.AsyncError();
                return;
            } else if(hardwareTime && (hardwareTime === scope.stamp)) {
                delete scope.isStart;
                delete scope.stamp;
                if (value1 == "GREAT") return ANALOG[0] > 600 ? 1 : 0;
                 else return ANALOG[0] <= 600 ? 1 : 0;
            } else if(nowTime - scope.stamp > 64) {
                delete scope.isStart;
                delete scope.stamp;
                if (value1 == "GREAT") return ANALOG[0] > 600 ? 1 : 0;
                 else return ANALOG[0] <= 600 ? 1 : 0;
            } else {
                throw new Entry.Utils.AsyncError();
                return;
            }
        }
    },
    "CODEino_get_light_status": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_boolean_field",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.CODEino_string_14,"BRIGHT"],
                    [Lang.Blocks.CODEino_string_15,"DARK"]
                ],
                "value": "BRIGHT",
                "fontSize": 11
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "CODEino_get_light_status"
        },
        "paramsKeyMap": {
            "STATUS": 0
        },
        "class": "CODEino_sensor",
        "isNotFor": [ "CODEino" ],
        "func": function (sprite, script) {
            var value1 = script.getField("STATUS", script);
            var value2 = 1;
            var nowTime = Entry.ArduinoExt.getSensorTime(Entry.ArduinoExt.sensorTypes.ANALOG);
            var hardwareTime = Entry.hw.portData['TIME'] || 0;
            var scope = script.executor.scope;
            var ANALOG = Entry.hw.portData.ANALOG;
            if(!scope.isStart) {
                scope.isStart = true;
                scope.stamp = nowTime;
                Entry.hw.sendQueue['TIME'] = nowTime;
                Entry.hw.sendQueue['KEY'] = Entry.ArduinoExt.getSensorKey();
                Entry.hw.sendQueue['GET'] = {
                    type: Entry.ArduinoExt.sensorTypes.ANALOG,
                    port: 1
                };
                throw new Entry.Utils.AsyncError();
                return;
            } else if(hardwareTime && (hardwareTime === scope.stamp)) {
                delete scope.isStart;
                delete scope.stamp;
                if (value1 == "GREAT") return ANALOG[value2] < 800 ? 1 : 0;
                 else return ANALOG[value2] <= 800 ? 1 : 0;
            } else if(nowTime - scope.stamp > 64) {
                delete scope.isStart;
                delete scope.stamp;
                if (value1 == "GREAT") return ANALOG[value2] < 800 ? 1 : 0;
                 else return ANALOG[value2] <= 800 ? 1 : 0;
            } else {
                throw new Entry.Utils.AsyncError();
                return;
            }
        }
    },
    "CODEino_is_button_pressed": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_boolean_field",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.CODEino_string_3,"4"],
                    [Lang.Blocks.CODEino_string_4,"17"],
                    [Lang.Blocks.CODEino_string_5,"18"],
                    [Lang.Blocks.CODEino_string_6,"19"],
                    [Lang.Blocks.CODEino_string_7,"20"]
                ],
                "value": "4",
                "fontSize": 11
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "CODEino_is_button_pressed"
        },
        "paramsKeyMap": {
            "PORT": 0
        },
        "class": "CODEino_sensor",
        "isNotFor": [ "CODEino" ],
        "func": function (sprite, script) {
                var port = script.getNumberField("PORT", script);
              if (port < 10) {
                var nowTime = Entry.ArduinoExt.getSensorTime(Entry.ArduinoExt.sensorTypes.DIGITAL);
                var hardwareTime = Entry.hw.portData['TIME'] || 0;
                var scope = script.executor.scope;
                var DIGITAL = Entry.hw.portData.DIGITAL;
                if(!scope.isStart) {
                    scope.isStart = true;
                    scope.stamp = nowTime;
                    Entry.hw.sendQueue['TIME'] = nowTime;
                    Entry.hw.sendQueue['KEY'] = Entry.ArduinoExt.getSensorKey();
                    Entry.hw.sendQueue['GET'] = {
                        type: Entry.ArduinoExt.sensorTypes.DIGITAL,
                        port: 4
                    };
                    throw new Entry.Utils.AsyncError();
                    return;
                } else if(hardwareTime && (hardwareTime === scope.stamp)) {
                    delete scope.isStart;
                    delete scope.stamp;
                    return (DIGITAL) ? !(DIGITAL[port] || 0): 0 ;
                } else if(nowTime - scope.stamp > 64) {
                    delete scope.isStart;
                    delete scope.stamp;
                    return (DIGITAL) ? !(DIGITAL[port] || 0) : 0;
                } else {
                    throw new Entry.Utils.AsyncError();
                    return;
                }
            } else {
                var nowTime = Entry.ArduinoExt.getSensorTime(Entry.ArduinoExt.sensorTypes.ANALOG);
                var hardwareTime = Entry.hw.portData['TIME'] || 0;
                var scope = script.executor.scope;
                var ANALOG = Entry.hw.portData.ANALOG;
                if(!scope.isStart) {
                    scope.isStart = true;
                    scope.stamp = nowTime;
                    Entry.hw.sendQueue['TIME'] = nowTime;
                    Entry.hw.sendQueue['KEY'] = Entry.ArduinoExt.getSensorKey();
                    Entry.hw.sendQueue['GET'] = {
                        type: Entry.ArduinoExt.sensorTypes.ANALOG,
                        port: port - 14
                    };
                    throw new Entry.Utils.AsyncError();
                    return;
                } else if(hardwareTime && (hardwareTime === scope.stamp)) {
                    delete scope.isStart;
                    delete scope.stamp;
                    return ANALOG[port-14] < 1000 ? 1 : 0;
                } else if(nowTime - scope.stamp > 64) {
                    delete scope.isStart;
                    delete scope.stamp;
                    return ANALOG[port-14] < 1000 ? 1 : 0;

                } else {
                    throw new Entry.Utils.AsyncError();
                    return;
                }
            }
        }
    },
    "CODEino_get_accelerometer_direction": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_boolean_field",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.CODEino_string_16, "LEFT"],
                    [Lang.Blocks.CODEino_string_17, "RIGHT"],
                    [Lang.Blocks.CODEino_string_18, "FRONT"],
                    [Lang.Blocks.CODEino_string_19, "REAR"],
                    [Lang.Blocks.CODEino_string_20, "REVERSE"]
                ],
                "value": "LEFT",
                "fontSize": 11
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "CODEino_get_accelerometer_direction"
        },
        "paramsKeyMap": {
            "DIRECTION": 0
        },
        "class": "CODEino_sensor",
        "isNotFor": [ "CODEino" ],
        "func": function (sprite, script) {
            var value1 = script.getField("DIRECTION", script);
            var port = 0;
            var nowTime = Entry.ArduinoExt.getSensorTime(Entry.ArduinoExt.sensorTypes.ANALOG);
            var hardwareTime = Entry.hw.portData['TIME'] || 0;
            var scope = script.executor.scope;
            var ANALOG = Entry.hw.portData.ANALOG;
            var value4 = 265;
            var value5 = 402;
            var value6 = -90;
            var value7 = 90;
            var result;
            if (value1 == "LEFT" || value1 =="RIGHT") port = 3;
            else if (value1 == "FRONT" || value1 =="REAR")port = 4;
            else if (value1 == "REVERSE") port = 5;

            if(!scope.isStart) {
                scope.isStart = true;
                scope.stamp = nowTime;
                Entry.hw.sendQueue['TIME'] = nowTime;
                Entry.hw.sendQueue['KEY'] = Entry.ArduinoExt.getSensorKey();
                Entry.hw.sendQueue['GET'] = {
                    type: Entry.ArduinoExt.sensorTypes.ANALOG,
                    port: port
                };
                throw new Entry.Utils.AsyncError();
                return;
            } else if(hardwareTime && (hardwareTime === scope.stamp)) {
                delete scope.isStart;
                delete scope.stamp;
                result = ANALOG[port];
                result -= value4;
                result = result * ((value7 - value6) / (value5 - value4));
                result += value6;
                result = Math.min(value7, result);
                result = Math.max(value6, result);
                result = Math.round(result);
                if (value1 == "LEFT" || value1 == "REAR") return result < -30 ? 1 : 0;
                else if (value1 == "RIGHT" || value1 == "FRONT") return result > 30 ? 1 : 0;
                else if (value1 == "REVERSE") return result < -50 ? 1 : 0;
            } else if(nowTime - scope.stamp > 64) {
                delete scope.isStart;
                delete scope.stamp;
                result = ANALOG[port];
                result -= value4;
                result = result * ((value7 - value6) / (value5 - value4));
                result += value6;
                result = Math.min(value7, result);
                result = Math.max(value6, result);
                result = Math.round(result);
                if (value1 == "LEFT" || value1 == "REAR") return result < -30 ? 1 : 0;
                else if (value1 == "RIGHT" || value1 == "FRONT") return result > 30 ? 1 : 0;
                else if (value1 == "REVERSE") return result < -50 ? 1 : 0;
            } else {
                throw new Entry.Utils.AsyncError();
                return;
            }
        }
    },
    "CODEino_get_accelerometer_value": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ "X", "3" ],
                    [ "Y", "4" ],
                    [ "Z", "5" ]
                ],
                "value": "3",
                "fontSize": 11
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "CODEino_get_accelerometer_value"
        },
        "paramsKeyMap": {
            "PORT": 0
        },
        "class": "CODEino_sensor",
        "isNotFor": [ "CODEino" ],
        "func": function (sprite, script) {
            var port = script.getNumberField("PORT", script);
            var nowTime = Entry.ArduinoExt.getSensorTime(Entry.ArduinoExt.sensorTypes.ANALOG);
            var hardwareTime = Entry.hw.portData['TIME'] || 0;
            var scope = script.executor.scope;
            var ANALOG = Entry.hw.portData.ANALOG;
            var result = 0;
            if(!scope.isStart) {
                scope.isStart = true;
                scope.stamp = nowTime;
                Entry.hw.sendQueue['TIME'] = nowTime;
                Entry.hw.sendQueue['KEY'] = Entry.ArduinoExt.getSensorKey();
                Entry.hw.sendQueue['GET'] = {
                    type: Entry.ArduinoExt.sensorTypes.ANALOG,
                    port: port
                };
                throw new Entry.Utils.AsyncError();
                return;
            } else if(hardwareTime && (hardwareTime === scope.stamp)) {
                delete scope.isStart;
                delete scope.stamp;
                result = ANALOG[port];
                result = (result - 333) * 1.46;
                result = Math.min(90, result);
                result = Math.max(-90, result);
                return Math.round(result);
            } else if(nowTime - scope.stamp > 64) {
                delete scope.isStart;
                delete scope.stamp;
                result = ANALOG[port];
                result = (result - 333) * 1.46;
                result = Math.min(90, result);
                result = Math.max(-90, result);
                return Math.round(result);
            } else {
                throw new Entry.Utils.AsyncError();
                return;
            }
        }
    },
    "CODEino_get_analog_value": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ "0", "0" ],
                    [ "1", "1" ],
                    [ "2", "2" ],
                    [ "3", "3" ],
                    [ "4", "4" ],
                    [ "5", "5" ]
                ],
                "value": "0",
                "fontSize": 11
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "CODEino_get_analog_value"
        },
        "paramsKeyMap": {
            "PORT": 0
        },
        "class": "CODEino_Adumode",
        "isNotFor": [ "CODEino" ],
        "func": function (sprite, script) {
            var port = script.getField("PORT", script);
            var nowTime = Entry.ArduinoExt.getSensorTime(Entry.ArduinoExt.sensorTypes.ANALOG);
            var hardwareTime = Entry.hw.portData['TIME'] || 0;
            var scope = script.executor.scope;
            var ANALOG = Entry.hw.portData.ANALOG;
            if(!scope.isStart) {
                scope.isStart = true;
                scope.stamp = nowTime;
                Entry.hw.sendQueue['TIME'] = nowTime;
                Entry.hw.sendQueue['KEY'] = Entry.ArduinoExt.getSensorKey();
                Entry.hw.sendQueue['GET'] = {
                    type: Entry.ArduinoExt.sensorTypes.ANALOG,
                    port: port
                };
                throw new Entry.Utils.AsyncError();
                return;
            } else if(hardwareTime && (hardwareTime === scope.stamp)) {
                delete scope.isStart;
                delete scope.stamp;
                return (ANALOG) ? ANALOG[port] || 0 : 0;
            } else if(nowTime - scope.stamp > 64) {
                delete scope.isStart;
                delete scope.stamp;
                return (ANALOG) ? ANALOG[port] || 0 : 0;
            } else {
                throw new Entry.Utils.AsyncError();
                return;
            }
        }
    },
    "CODEino_get_digital_value": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_boolean_field",
        "params": [{
            "type": "Block",
            "accept": "string"
        }],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "arduino_get_port_number"
                }
            ],
            "type": "CODEino_get_digital_value"
        },
        "paramsKeyMap": {
            "PORT": 0
        },
        "class": "CODEino_Adumode",
        "isNotFor": [ "CODEino" ],
        "func": function (sprite, script) {
            var port = script.getNumberValue("PORT", script);
            var nowTime = Entry.ArduinoExt.getSensorTime(Entry.ArduinoExt.sensorTypes.DIGITAL);
            var hardwareTime = Entry.hw.portData['TIME'] || 0;
            var scope = script.executor.scope;
            var DIGITAL = Entry.hw.portData.DIGITAL;
            if(!scope.isStart) {
                scope.isStart = true;
                scope.stamp = nowTime;
                Entry.hw.sendQueue['TIME'] = nowTime;
                Entry.hw.sendQueue['KEY'] = Entry.ArduinoExt.getSensorKey();
                Entry.hw.sendQueue['GET'] = {
                    type: Entry.ArduinoExt.sensorTypes.DIGITAL,
                    port: port
                };
                throw new Entry.Utils.AsyncError();
                return;
            } else if(hardwareTime && (hardwareTime === scope.stamp)) {
                delete scope.isStart;
                delete scope.stamp;
                return (DIGITAL) ? DIGITAL[port] || 0 : 0;
            } else if(nowTime - scope.stamp > 64) {
                delete scope.isStart;
                delete scope.stamp;
                return (DIGITAL) ? DIGITAL[port] || 0 : 0;
            } else {
                throw new Entry.Utils.AsyncError();
                return;
            }
        }
    },
    "CODEino_set_digital_value": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.ARDUINO_on,"255"],
                    [Lang.Blocks.ARDUINO_off,"0"]
                ],
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_HW
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "arduino_get_port_number"
                },
                '255',
                null
            ],
            "type": "CODEino_set_digital_value"
        },
        "paramsKeyMap": {
            "PORT": 0,
            "VALUE": 1
        },
        "class": "CODEino_Setmode",
        "isNotFor": [ "CODEino" ],
        "func": function (sprite, script) {
            var port = script.getNumberValue("PORT");
            var value = script.getNumberField("VALUE");
            var nowTime = Entry.ArduinoExt.getSensorTime(Entry.ArduinoExt.sensorTypes.DIGITAL);
            Entry.hw.sendQueue['TIME'] = nowTime;
            Entry.hw.sendQueue['KEY'] = Entry.ArduinoExt.getSensorKey();
            if(!Entry.hw.sendQueue['SET']) {
                Entry.hw.sendQueue['SET'] = {};
            }
            Entry.hw.sendQueue['SET'][port] = {
                type: Entry.ArduinoExt.sensorTypes.DIGITAL,
                data: value
            };
            return script.callReturn();
        }
    },
    "CODEino_set_pwm_value": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "arduino_get_pwm_port_number"
                },
                {
                    "type": "arduino_text",
                    "params": [ "255" ]
                },
                null
            ],
            "type": "CODEino_set_pwm_value"
        },
        "paramsKeyMap": {
            "PORT": 0,
            "VALUE": 1
        },
        "class": "CODEino_Setmode",
        "isNotFor": [ "CODEino" ],
        "func": function (sprite, script) {
            var port = script.getNumberValue("PORT");
            var value = script.getNumberValue("VALUE");
            value = Math.round(value);
            value = Math.max(value, 0);
            value = Math.min(value, 255);
            var nowTime = Entry.ArduinoExt.getSensorTime(Entry.ArduinoExt.sensorTypes.PWM);
            Entry.hw.sendQueue['TIME'] = nowTime;
            Entry.hw.sendQueue['KEY'] = Entry.ArduinoExt.getSensorKey();
            if(!Entry.hw.sendQueue['SET']) {
                Entry.hw.sendQueue['SET'] = {};
            }
            Entry.hw.sendQueue['SET'][port] = {
                type: Entry.ArduinoExt.sensorTypes.PWM,
                data: value
            };
            return script.callReturn();
        }
    },
    "CODEino_convert_scale": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "CODEino_get_analog_value",
                    "value": "0"

                },
                {
                    "type": "number",
                    "params": [ "0" ]
                },
                {
                    "type": "number",
                    "params": [ "1023" ]
                },
                {
                    "type": "number",
                    "params": [ "0" ]
                },
                {
                    "type": "number",
                    "params": [ "100" ]
                }
            ],
            "type": "CODEino_convert_scale"
        },
        "paramsKeyMap": {
            "VALUE1": 0,
            "VALUE2": 1,
            "VALUE3": 2,
            "VALUE4": 3,
            "VALUE5": 4
        },
        "class": "CODEino_extmode",
        "isNotFor": [ "CODEino" ],
        "func": function (sprite, script) {
            var value1 = script.getNumberValue("VALUE1", script);
            var value2 = script.getNumberValue("VALUE2", script);
            var value3 = script.getNumberValue("VALUE3", script);
            var value4 = script.getNumberValue("VALUE4", script);
            var value5 = script.getNumberValue("VALUE5", script);
            var result = value1;
            if (value2 > value3) {
                var swap = value2;
                value2 = value3;
                value3 = swap;
            }
            if (value4 > value5) {
                var swap = value4;
                value4 = value5;
                value5 = swap;
            }
            result -= value2;
            result = result * ((value5 - value4) / (value3 - value2));
            result += value4;
            result = Math.min(value5, result);
            result = Math.max(value4, result);
            return Math.round(result);
        }
    },
    "CODEino_set_rgb_value": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [{
                "type": "Dropdown",
                "options": [
                    [ "빨강", "17" ],
                    [ "초록", "18" ],
                    [ "파랑", "19" ]
                ],
                "value": "17",
                "fontSize": 11
        }, {
            "type": "Block",
            "accept": "string"
        }, {
            "type": "Indicator",
            "img": "block_icon/hardware_03.png",
            "size": 12
        }],
        "events": {},
        "def": {

            "type": "CODEino_set_rgb_value"
        },
        "paramsKeyMap": {
            "PORT": 0,
            "VALUE": 1
        },
        "class": "CODEino_RGBLED_mode",
        "isNotFor": [ "CODEino" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            var port = script.getNumberField("PORT", script);
            var value = script.getNumberValue("VALUE", script);
            value = Math.min(255, value);
            value = Math.max(0, value);

            if (port == 17) {
              CODEINO_RED = value;
            } else if (port == 18){
              CODEINO_GREEN = value;
              } else CODEINO_BLUE = value;

            sq['TIME'] = Entry.ArduinoExt.getSensorTime(4);
            sq['KEY'] = Entry.ArduinoExt.getSensorKey();
            if(!sq['SET']) {
                sq['SET'] = {};
            }
            sq['SET'][port] = {
                type: 4,
                data: value
            };
            return script.callReturn();
        }
    },
    "CODEino_set_rgb_add_value": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [{
                "type": "Dropdown",
                "options": [
                    [ "빨강", "17" ],
                    [ "초록", "18" ],
                    [ "파랑", "19" ]
                ],
                "value": "17",
                "fontSize": 11
        }, {
            "type": "Block",
            "accept": "string"
        }, {
            "type": "Indicator",
            "img": "block_icon/hardware_03.png",
            "size": 12
        }],
        "events": {},
        "def": {

            "type": "CODEino_set_rgb_add_value"
        },
        "paramsKeyMap": {
            "PORT": 0,
            "VALUE": 1
        },
        "class": "CODEino_RGBLED_mode",
        "isNotFor": [ "CODEino" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            var port = script.getNumberField("PORT", script);
            var value = script.getNumberValue("VALUE", script);
            value = Math.min(255, value);
            value = Math.max(0, value);
            if (port == 17) {
              CODEINO_RED = CODEINO_RED + value;
              CODEINO_RED = Math.min(255, CODEINO_RED);
              CODEINO_RED = Math.max(0, CODEINO_RED);
              value = CODEINO_RED;
            }
            if (port == 18){
              CODEINO_GREEN = CODEINO_GREEN + value;
              CODEINO_GREEN = Math.min(255, CODEINO_GREEN);
              CODEINO_GREEN = Math.max(0, CODEINO_GREEN);
              value = CODEINO_GREEN;
            }
            if (port == 19) {
                CODEINO_BLUE = CODEINO_BLUE + value;
                CODEINO_BLUE = Math.min(255, CODEINO_BLUE);
                CODEINO_BLUE = Math.max(0, CODEINO_BLUE);
                value = CODEINO_BLUE;
            }

            sq['TIME'] = Entry.ArduinoExt.getSensorTime(4);
            sq['KEY'] = Entry.ArduinoExt.getSensorKey();
            if(!sq['SET']) {
                sq['SET'] = {};
            }
            sq['SET'][port] = {
                type: 4,
                data: value
            };
            return script.callReturn();
        }
    },
    "CODEino_rgb_set_color": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Color"
            },
            {
                "type": "Indicator",
                "img": "block_icon/brush_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "CODEino_rgb_set_color"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "CODEino_RGBLED_mode",
        "isNotFor": [ "CODEino" ],
        "func": function (sprite, script) {
            var value = script.getStringField("VALUE");
            CODEINO_RED = parseInt(value.substr(1,2), 16);
            CODEINO_GREEN = parseInt(value.substr(3,2), 16);
            CODEINO_BLUE = parseInt(value.substr(5,2), 16);
            var sq = Entry.hw.sendQueue;
            var port = 17;
            sq['TIME'] = Entry.ArduinoExt.getSensorTime(4);
            sq['KEY'] = Entry.ArduinoExt.getSensorKey();
            if(!sq['SET']) {
                sq['SET'] = {};
            }
            sq['SET'][port] = {
                type: 4,
                data: CODEINO_RED
            };
            var sq = Entry.hw.sendQueue;
            var port = 18;
            sq['TIME'] = Entry.ArduinoExt.getSensorTime(4);
            sq['KEY'] = Entry.ArduinoExt.getSensorKey();
            if(!sq['SET']) {
                sq['SET'] = {};
            }
            sq['SET'][port] = {
                type: 4,
                data: CODEINO_GREEN
            };
            var sq = Entry.hw.sendQueue;
            var port = 19;
            sq['TIME'] = Entry.ArduinoExt.getSensorTime(4);
            sq['KEY'] = Entry.ArduinoExt.getSensorKey();
            if(!sq['SET']) {
                sq['SET'] = {};
            }
            sq['SET'][port] = {
                type: 4,
                data: CODEINO_BLUE
            };
            return script.callReturn();
        }
    },
    "CODEino_set_rgb_off": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "CODEino_set_rgb_off"
        },
        "class": "CODEino_RGBLED_mode",
        "isNotFor": [ "CODEino" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            CODEINO_RED = 0;
            CODEINO_BLUE = 0;
            CODEINO_GREEN = 0;
            var port = 17;
            sq['TIME'] = Entry.ArduinoExt.getSensorTime(4);
            sq['KEY'] = Entry.ArduinoExt.getSensorKey();
            if(!sq['SET']) {
                sq['SET'] = {};
            }
            sq['SET'][port] = {
                type: 4,
                data: 0
            };
            var sq = Entry.hw.sendQueue;
            var port = 18;
            sq['TIME'] = Entry.ArduinoExt.getSensorTime(4);
            sq['KEY'] = Entry.ArduinoExt.getSensorKey();
            if(!sq['SET']) {
                sq['SET'] = {};
            }
            sq['SET'][port] = {
                type: 4,
                data: 0
            };
            var sq = Entry.hw.sendQueue;
            var port = 19;
            sq['TIME'] = Entry.ArduinoExt.getSensorTime(4);
            sq['KEY'] = Entry.ArduinoExt.getSensorKey();
            if(!sq['SET']) {
                sq['SET'] = {};
            }
            sq['SET'][port] = {
                type: 4,
                data: 0
            };
            return script.callReturn();
        }
    },
    "CODEino_set__led_by_rgb": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "text",
                    "params": [ "255" ]
                },
                {
                    "type": "text",
                    "params": [ "255" ]
                },
                {
                    "type": "text",
                    "params": [ "255" ]
                },
                null
            ],
            "type": "CODEino_set__led_by_rgb"
        },
        "paramsKeyMap": {
            "rValue": 0,
            "gValue": 1,
            "bValue": 2
        },
        "class": "CODEino_RGBLED_mode",
        "isNotFor": [ "CODEino" ],
        "func": function (sprite, script) {
            CODEINO_RED = script.getNumberValue("rValue");
            CODEINO_GREEN = script.getNumberValue("gValue");
            CODEINO_BLUE = script.getNumberValue("bValue");
            var sq = Entry.hw.sendQueue;
            var port = 17;
            sq['TIME'] = Entry.ArduinoExt.getSensorTime(4);
            sq['KEY'] = Entry.ArduinoExt.getSensorKey();
            if(!sq['SET']) {
                sq['SET'] = {};
            }
            sq['SET'][port] = {
                type: 4,
                data: CODEINO_RED
            };
            var sq = Entry.hw.sendQueue;
            var port = 18;
            sq['TIME'] = Entry.ArduinoExt.getSensorTime(4);
            sq['KEY'] = Entry.ArduinoExt.getSensorKey();
            if(!sq['SET']) {
                sq['SET'] = {};
            }
            sq['SET'][port] = {
                type: 4,
                data: CODEINO_GREEN
            };
            var sq = Entry.hw.sendQueue;
            var port = 19;
            sq['TIME'] = Entry.ArduinoExt.getSensorTime(4);
            sq['KEY'] = Entry.ArduinoExt.getSensorKey();
            if(!sq['SET']) {
                sq['SET'] = {};
            }
            sq['SET'][port] = {
                type: 4,
                data: CODEINO_BLUE
            };
            return script.callReturn();

        }
    },
    "CODEino_led_by_value": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "CODEino_led_by_value"
        },
        "class": "CODEino_RGBLED_mode",
        "isNotFor": [ "CODEino" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            var port = 17;
            CODEINO_RED = 100;
            CODEINO_GREEN = 100;
            CODEINO_BLUE = 100;
            sq['TIME'] = Entry.ArduinoExt.getSensorTime(4);
            sq['KEY'] = Entry.ArduinoExt.getSensorKey();
            if(!sq['SET']) {
                sq['SET'] = {};
            }
            sq['SET'][port] = {
                type: 4,
                data: 100
            };
            var sq = Entry.hw.sendQueue;
            var port = 18;
            sq['TIME'] = Entry.ArduinoExt.getSensorTime(4);
            sq['KEY'] = Entry.ArduinoExt.getSensorKey();
            if(!sq['SET']) {
                sq['SET'] = {};
            }
            sq['SET'][port] = {
                type: 4,
                data: 100
            };
            var sq = Entry.hw.sendQueue;
            var port = 19;
            sq['TIME'] = Entry.ArduinoExt.getSensorTime(4);
            sq['KEY'] = Entry.ArduinoExt.getSensorKey();
            if(!sq['SET']) {
                sq['SET'] = {};
            }
            sq['SET'][port] = {
                type: 4,
                data: 100
            };
            return script.callReturn();
        }
    },
    //2016-09-23 added finish
    //legacy
    "CODEino_get_number_sensor_value": {
        "parent": "arduino_get_number_sensor_value",
        "isNotFor": [
            "CODEino"
        ],
        "def": {
            "params": [
                {
                    "type": "arduino_get_sensor_number"
                }
            ],
            "type": "CODEino_get_number_sensor_value"
        },
        "class": "arduino_value",
        "syntax": {"js": [], "py": ["CODEino.get_number_sensor_value(%1)"]}
    },
    "CODEino_toggle_led": {
        "parent": "arduino_toggle_led",
        "isNotFor": [
            "CODEino"
        ],
        "def": {
            "params": [
                {
                    "type": "arduino_get_port_number"
                },
                null,
                null
            ],
            "type": "CODEino_toggle_led"
        },
        "class": "arduino_set",
        "syntax": {"js": [], "py": ["CODEino.toggle_led(%1)"]}
    },
    "CODEino_toggle_pwm": {
        "parent": "arduino_toggle_pwm",
        "isNotFor": [
            "CODEino"
        ],
        "def": {
            "params": [
                {
                    "type": "arduino_get_pwm_port_number"
                },
                {
                    "type": "arduino_text",
                    "params": [ "255" ]
                },
                null
            ],
            "type": "CODEino_toggle_pwm"
        },
        "class": "arduino_set",
        "syntax": {"js": [], "py": ["CODEino.toggle_pwm(%1, %2)"]}
    },
    "nemoino_get_named_sensor_value": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_string_field",
        "statements": [],
        "template": "%1 센서값",
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    ["소리","0"],
                    ["빛","1"],
                    ["슬라이더","2"],
                    ["저항-A","3"],
                    ["저항-B","4"],
                    ["저항-C","5"],
                    ["저항-D","6"]
                ],
                "value": "0",
                "fontSize": 11
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "nemoino_get_named_sensor_value"
        },
        "paramsKeyMap": {
            "PORT": 0
        },
        "class": "nemoino",
        "isNotFor": [ "nemoino" ],
        "func": function (sprite, script) {
            return Entry.hw.getAnalogPortValue(script.getField("PORT", script));
        }
    },
    "nemoino_get_sound_status": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_boolean_field",
        "statements": [],
        "template": "소리센서 %1",
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    ["소리큼","GREAT"],
                    ["소리작음","SMALL"]
                ],
                "value": "GREAT",
                "fontSize": 11
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "nemoino_get_sound_status"
        },
        "paramsKeyMap": {
            "STATUS": 0
        },
        "class": "nemoino",
        "isNotFor": [ "nemoino" ],
        "func": function (sprite, script) {
            var value1 = script.getField("STATUS", script);
            var value2 = 0;
            if (value1 == "GREAT") return Entry.hw.getAnalogPortValue(value2) > 600 ? 1 : 0;
            else return Entry.hw.getAnalogPortValue(value2) < 600 ? 1 : 0;
        }
    },
    "nemoino_is_button_pressed": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_boolean_field",
        "statements": [],
        "template": "보드의 %1",
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    ["버튼누름","4"],
                    ["A연결됨","17"],
                    ["B연결됨","18"],
                    ["C연결됨","19"],
                    ["D연결됨","20"]
                ],
                "value": "4",
                "fontSize": 11
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "nemoino_is_button_pressed"
        },
        "paramsKeyMap": {
            "PORT": 0
        },
        "class": "nemoino",
        "isNotFor": [ "nemoino" ],
        "func": function (sprite, script) {
            var value = script.getNumberField("PORT", script);
            if (value > 14) {
                value = value - 14;
                return !Entry.hw.getAnalogPortValue(value);
            } else return !Entry.hw.getDigitalPortValue(value);
        }
    },
    "nemoino_get_accelerometer_direction": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_boolean_field",
        "statements": [],
        "template": "3축 가속도센서 %1",
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    ["왼쪽 기울임", "LEFT"],
                    ["오른쪽 기울임", "RIGHT"],
                    ["위쪽 기울임", "FRONT"],
                    ["아래쪽 기울임", "REAR"],
                    ["뒤집힘", "REVERSE"]
                ],
                "value": "LEFT",
                "fontSize": 11
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "nemoino_get_accelerometer_direction"
        },
        "paramsKeyMap": {
            "DIRECTION": 0
        },
        "class": "nemoino",
        "isNotFor": [ "nemoino" ],
        "func": function (sprite, script) {
            var value1 = script.getField("DIRECTION", script);
            var value2 = 0;
            if (value1 == "LEFT" || value1 =="RIGHT") value2 = 3;
            else if (value1 == "FRONT" || value1 =="REAR") value2 = 4;
            else if (value1 == "REVERSE") value2 = 5;
            var value3 = Entry.hw.getAnalogPortValue(value2);
            var value4 = 265;
            var value5 = 402;
            var value6 = -90;
            var value7 = 90;
            var result = value3;
            result -= value4;
            result = result * ((value7 - value6) / (value5 - value4));
            result += value6;
            result = Math.min(value7, result);
            result = Math.max(value6, result);
            result = Math.round(result);
            if (value1 == "LEFT" || value1 == "REAR") return result < -30 ? 1 : 0;
            else if (value1 == "RIGHT" || value1 == "FRONT") return result > 30 ? 1 : 0;
            else if (value1 == "REVERSE") return result < -50 ? 1 : 0;
        }
    },
    "nemoino_get_accelerometer_value": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_string_field",
        "statements": [],
        "template": "3축 가속도센서 %1 축의 센서값",
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ "X", "3" ],
                    [ "Y", "4" ],
                    [ "Z", "5" ]
                ],
                "value": "3",
                "fontSize": 11
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "nemoino_get_accelerometer_value"
        },
        "paramsKeyMap": {
            "PORT": 0
        },
        "class": "nemoino",
        "isNotFor": [ "nemoino" ],
        "func": function (sprite, script) {
            var value1 = Entry.hw.getAnalogPortValue(script.getField("PORT", script));
            var value2 = 265;
            var value3 = 402;
            var value4 = -90;
            var value5 = 90;
            var result = value1;
            if (value2 > value3) {
                var swap = value2;
                value2 = value3;
                value3 = swap;
            }
            if (value4 > value5) {
                var swap = value4;
                value4 = value5;
                value5 = swap;
            }
            result -= value2;
            result = result * ((value5 - value4) / (value3 - value2));
            result += value4;
            result = Math.min(value5, result);
            result = Math.max(value4, result);
            return Math.round(result);
        }
    },
    "bitbrick_sensor_value": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "DropdownDynamic",
                "value": null,
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_HW,
                menuName: Entry.Bitbrick.sensorList

            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "bitbrick_sensor_value"
        },
        "paramsKeyMap": {
            "PORT": 0
        },
        "class": "condition",
        "isNotFor": [ "bitbrick" ],
        "func": function (sprite, script) {
            var port = script.getStringField("PORT");
            return Entry.hw.portData[port].value;
        },
        "syntax": {"js": [], "py": ["Bitbrick.sensor_value(%1)"]}
    },
    "bitbrick_is_touch_pressed": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_boolean_field",
        "statements": [],
        "params": [
            {
                "type": "DropdownDynamic",
                "value": null,
                "fontSize": 11,
                menuName: Entry.Bitbrick.touchList
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "bitbrick_is_touch_pressed"
        },
        "paramsKeyMap": {
            "PORT": 0
        },
        "class": "condition",
        "isNotFor": [ "bitbrick" ],
        "func": function (sprite, script) {
            return Entry.hw.portData[script.getStringField("PORT")].value === 0;
        },
        "syntax": {"js": [], "py": ["Bitbrick.is_touch_pressed(%1)"]}
    },
    "bitbrick_turn_off_color_led": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "bitbrick_turn_off_color_led",
            "id": "i3je"
        },
        "class": "condition",
        "isNotFor": [ "bitbrick" ],
        "func": function (sprite, script) {
            Entry.hw.sendQueue["LEDR"] = 0;
            Entry.hw.sendQueue["LEDG"] = 0;
            Entry.hw.sendQueue["LEDB"] = 0;
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Bitbrick.turn_off_color_led()"]}
    },
    "bitbrick_turn_on_color_led_by_rgb": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "text",
                    "params": [ "255" ]
                },
                {
                    "type": "text",
                    "params": [ "255" ]
                },
                {
                    "type": "text",
                    "params": [ "255" ]
                },
                null
            ],
            "type": "bitbrick_turn_on_color_led_by_rgb"
        },
        "paramsKeyMap": {
            "rValue": 0,
            "gValue": 1,
            "bValue": 2
        },
        "class": "condition",
        "isNotFor": [ "bitbrick" ],
        "func": function (sprite, script) {
            var red = script.getNumberValue("rValue"),
                green = script.getNumberValue("gValue"),
                blue = script.getNumberValue("bValue"),
                min = 0,
                max = 255,
                adjustor = Entry.adjustValueWithMaxMin,
                sq = Entry.hw.sendQueue;

                sq["LEDR"] = adjustor(red, min, max);
                sq["LEDG"] = adjustor(green, min, max);
                sq["LEDB"] = adjustor(blue, min, max);
                return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Bitbrick.color_led_by_rgb(%1, %2, %3)"]}
    },
    "bitbrick_turn_on_color_led_by_picker": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Color"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "bitbrick_turn_on_color_led_by_picker"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "condition",
        "isNotFor": [ "bitbrick" ],
        "func": function (sprite, script) {
            var port = script.getStringField("VALUE");
            Entry.hw.sendQueue["LEDR"] = parseInt(port.substr(1,2), 16);
            Entry.hw.sendQueue["LEDG"] = parseInt(port.substr(3,2), 16);
            Entry.hw.sendQueue["LEDB"] = parseInt(port.substr(5,2), 16);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Bitbrick.color_led_by_picker(%1)"]}
    },
    "bitbrick_turn_on_color_led_by_value": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "text",
                    "params": [ "0" ]
                },
                null
            ],
            "type": "bitbrick_turn_on_color_led_by_value"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "condition",
        "isNotFor": [ "bitbrick" ],
        "func": function (sprite, script) {
            var value = script.getNumberValue("VALUE");
            var red, green, blue;
            value = value % 200;
            if ( value < 67 ) {
                red = 200 - (value * 3);
                green = value * 3;
                blue = 0;
            } else if ( value < 134 ) {
                value = value - 67;
                red = 0;
                green = 200 - (value * 3);
                blue = value * 3;
            } else if ( value < 201 ) {
                value = value - 134;
                red = value * 3;
                green = 0;
                blue = 200 - (value * 3);
            }
            Entry.hw.sendQueue["LEDR"] = red;
            Entry.hw.sendQueue["LEDG"] = green;
            Entry.hw.sendQueue["LEDB"] = blue;
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Bitbrick.color_led_by_value(%1)"]}
    },
    "bitbrick_buzzer": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "text",
                    "params": [ "60" ]
                },
                null
            ],
            "type": "bitbrick_buzzer"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "condition",
        "isNotFor": [ "bitbrick" ],
        "func": function (sprite, script) {
            if (!script.isStart) {
                var value = script.getNumberValue("VALUE");
                Entry.hw.sendQueue["buzzer"] = value;
                script.isStart = true;
                return script;
            } else {
                Entry.hw.sendQueue["buzzer"] = 0;
                delete script.isStart;
                return script.callReturn();
            }
        },
        "syntax": {"js": [], "py": ["Bitbrick.buzzer(%1)"]}
    },
    "bitbrick_turn_off_all_motors": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "bitbrick_turn_off_all_motors"
        },
        "class": "condition",
        "isNotFor": [ "bitbrick" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            var bitbrick = Entry.Bitbrick;
            bitbrick.servoList().map(function(servo){
                sq[servo[1]] = 0;
            });
            bitbrick.dcList().map(function(dc){
                sq[dc[1]] = 128;
            });
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Bitbrick.turn_off_all_motors()"]}
    },
    "bitbrick_dc_speed": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "DropdownDynamic",
                "value": null,
                "fontSize": 11,
                menuName: Entry.Bitbrick.dcList
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                {
                    "type": "text",
                    "params": [ "60" ]
                },
                null
            ],
            "type": "bitbrick_dc_speed"
        },
        "paramsKeyMap": {
            "PORT": 0,
            "VALUE": 1
        },
        "class": "condition",
        "isNotFor": [ "bitbrick" ],
        "func": function (sprite, script) {
            var value = script.getNumberValue("VALUE");
            value = Math.min(value, Entry.Bitbrick.dcMaxValue);
            value = Math.max(value, Entry.Bitbrick.dcMinValue);

            Entry.hw.sendQueue[script.getStringField("PORT")] =
                value + 128;
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Bitbrick.dc_speed(%1, %2)"]}
    },
    "bitbrick_dc_direction_speed": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "DropdownDynamic",
                "value": null,
                "fontSize": 11,
                menuName: Entry.Bitbrick.dcList
            },
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.BITBRICK_dc_direction_cw,"CW"],
                    [Lang.Blocks.BITBRICK_dc_direction_ccw,"CCW"]
                ],
                "value": "CW",
                "fontSize": 11
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                null,
                {
                    "type": "text",
                    "params": [ "100" ]
                },
                null
            ],
            "type": "bitbrick_dc_direction_speed"
        },
        "paramsKeyMap": {
            "PORT": 0,
            "DIRECTION": 1,
            "VALUE": 2
        },
        "class": "condition",
        "isNotFor": [ "bitbrick" ],
        "func": function (sprite, script) {
            var isFront = script.getStringField("DIRECTION") === "CW";
            var value = script.getNumberValue("VALUE");
            value = Math.min(value, Entry.Bitbrick.dcMaxValue);
            value = Math.max(value, 0);

            Entry.hw.sendQueue[script.getStringField("PORT")] =
                isFront ? value + 128 : 128 - value;
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Bitbrick.dc_direction_speed(%1, %2, %3)"]}
    },
    "bitbrick_servomotor_angle": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "DropdownDynamic",
                "value": null,
                "fontSize": 11,
                menuName: Entry.Bitbrick.servoList
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                {
                    "type": "text",
                    "params": [ "100" ]
                },
                null
            ],
            "type": "bitbrick_servomotor_angle"
        },
        "paramsKeyMap": {
            "PORT": 0,
            "VALUE": 1
        },
        "class": "condition",
        "isNotFor": [ "bitbrick" ],
        "func": function (sprite, script) {
            var value = Entry.Bitbrick.servoMaxValue - (script.getNumberValue("VALUE") + 1);
            value = Math.min(value, Entry.Bitbrick.servoMaxValue);
            value = Math.max(value, Entry.Bitbrick.servoMinValue);
            Entry.hw.sendQueue[script.getStringField("PORT")] = value;
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Bitbrick.servomotor_angle(%1, %2)"]}
    },
    "bitbrick_convert_scale": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "DropdownDynamic",
                "value": null,
                "fontSize": 11,
                menuName: Entry.Bitbrick.sensorList
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                {
                    "type": "number",
                    "params": [ "0" ]
                },
                {
                    "type": "number",
                    "params": [ "1023" ]
                },
                {
                    "type": "number",
                    "params": [ "-100" ]
                },
                {
                    "type": "number",
                    "params": [ "100" ]
                }
            ],
            "type": "bitbrick_convert_scale"
        },
        "paramsKeyMap": {
            "PORT": 0,
            "VALUE2": 1,
            "VALUE3": 2,
            "VALUE4": 3,
            "VALUE5": 4
        },
        "class": "condition",
        "isNotFor": [ "bitbrick" ],
        "func": function (sprite, script) {
            var port = script.getNumberField("PORT");
            var value1 = Entry.hw.portData[port].value;
            var value2 = script.getNumberValue("VALUE2", script);
            var value3 = script.getNumberValue("VALUE3", script);
            var value4 = script.getNumberValue("VALUE4", script);
            var value5 = script.getNumberValue("VALUE5", script);
            var result = value1;

            if (value4 > value5) {
                var swap = value4;
                value4 = value5;
                value5 = swap;
            }

            result -= value2;
            result = result * ((value5 - value4) / (value3 - value2));
            result += value4;
            result = Math.min(value5, result);
            result = Math.max(value4, result);
            return Math.round(result);
        },
	"syntax": {"js": [], "py": ["Bitbrick.convert_scale(%1, %2, %3, %4, %5)"]}
    },
    "cobl_read_ultrason": {
        color: "#00979D",
        fontColor: "#fff",
        skeleton: "basic_string_field",
        template: "1. 초음파거리(0~400)",
        def: {
            type: "cobl_read_ultrason"
        },
        class: "cobl",
        isNotFor : [ "cobl" ],
        func: function (sprite, script) {
            return Entry.hw.getAnalogPortValue("ultrason");
        }
    },
    "cobl_read_potenmeter": {
        color: "#00979D",
        fontColor: "#fff",
        skeleton: "basic_string_field",
        template: "2.가변저항(0~1023)",
        def: {
            type: "cobl_read_potenmeter"
        },
        class: "cobl",
        isNotFor : [ "cobl" ],
        func: function(sprite, script) {
            return Entry.hw.getAnalogPortValue("potenmeter");
        }
    },
    "cobl_read_irread1": {
        color: "#00979D",
        fontColor: "#fff",
        skeleton: "basic_string_field",
        template: "3.적외선센서1(0~1023)",
        def: {
            type: "cobl_read_irread1"
        },
        class: "cobl",
        isNotFor : [ "cobl" ],
        func: function(sprite, script) {
            return Entry.hw.getAnalogPortValue("irread1");
        }
    },
    "cobl_read_irread2": {
        color: "#00979D",
        fontColor: "#fff",
        skeleton: "basic_string_field",
        template: "4.적외선센서2(0~1023)",
        def: {
            type: "cobl_read_irread2"
        },
        class: "cobl",
        isNotFor : [ "cobl" ],
        "func": function(sprite, script) {
            return Entry.hw.getAnalogPortValue("irread2");
        }
    },
    "cobl_read_joyx": {
        color: "#00979D",
        fontColor: "#fff",
        skeleton: "basic_string_field",
        template: "5.조이스틱X축(1, 0, -1)",
        def: {
            type: "cobl_read_joyx"
        },
        class: "cobl",
        isNotFor : [ "cobl" ],
        "func": function(sprite, script) {
            return Entry.hw.getAnalogPortValue("joyx");
        }
    },
    "cobl_read_joyy": {
        color: "#00979D",
        fontColor: "#fff",
        skeleton: "basic_string_field",
        template: "6.조이스틱Y축(1, 0, -1)",
        def: {
            type: "cobl_read_joyy"
        },
        class: "cobl",
        isNotFor : [ "cobl" ],
        "func": function(sprite, script) {
            return Entry.hw.getAnalogPortValue("joyy");
        }
    },
    "cobl_read_tilt": {
        color: "#00979D",
        fontColor: "#fff",
        skeleton: "basic_string_field",
        template: "7.기울기센서(0~4)",
        def: {
            type: "cobl_read_tilt"
        },
        class: "cobl",
        isNotFor : [ "cobl" ],
        "func": function(sprite, script) {
              return Entry.hw.getAnalogPortValue("tilt");
        }
    },
    "cobl_read_temps": {
        color: "#00979D",
        fontColor: "#fff",
        skeleton: "basic_string_field",
        template: "8.온도센서@포트%1",
        params: [
            {
                type: "Dropdown",
                options: [
                    [ "1", "1" ],
                    [ "2", "2" ],
                ],
                fontSize: 11
            }
        ],
        def: {
            params: [
                "1"
            ],
            type: "cobl_read_temps"
        },
        paramsKeyMap: {
            VALUE: 0
        },
        class: "cobl",
        isNotFor : [ "cobl" ],
        "func": function(sprite, script) {
            //    console.log("-----temptest------")
            //var signal = script.getField("VALUE", script);
            var signal = script.getValue("VALUE", script);
            if (signal == 1)
            {
                //    console.log("-----temp1 selected ");
                return Entry.hw.getAnalogPortValue("temps1");
            }

            if (signal == 2)
            {
                //     console.log("-----temp2 selected ");
                return Entry.hw.getAnalogPortValue("temps2");
            }
        }
    },
    "cobl_read_light": {
        color: "#00979D",
        fontColor: "#fff",
        skeleton: "basic_string_field",
        template: "9.빛센서@포트%1",
        params: [
            {
                type: "Dropdown",
                options: [
                    [ "1", "1" ],
                    [ "2", "2" ],
                ],
                fontSize: 11
            }
        ],
        def: {
            params: [
                "1"
            ],
            type: "cobl_read_light"
        },
        paramsKeyMap: {
            VALUE: 0
        },
        class: "cobl",
        isNotFor : [ "cobl" ],
        "func": function(sprite, script) {
            var signal = script.getValue("VALUE", script);
            if (signal == 1)
            {
                return Entry.hw.getAnalogPortValue("light1");
            }

            if (signal == 2)
            {
                return Entry.hw.getAnalogPortValue("light2");
            }
        }
    },
    "cobl_read_btn": {
        color: "#00979D",
        fontColor: "#fff",
        skeleton: "basic_boolean_field",
        template: "10.버튼스위치@포트%1",
        params: [
            {
                type: "Dropdown",
                options: [
                    [ "1", "1" ],
                    [ "2", "2" ],
                ],
                fontSize: 11
            }
        ],
        def: {
            params: [
                "1"
            ],
            type: "cobl_read_btn"
        },
        paramsKeyMap: {
            VALUE: 0
        },
        class: "cobl",
        isNotFor : [ "cobl" ],
        "func": function(sprite, script) {
            var signal = script.getValue("VALUE", script);
            if (signal == 1)
            {
                return Entry.hw.getDigitalPortValue("btn1");
            }

            if (signal == 2)
            {
                return Entry.hw.getDigitalPortValue("btn2");
            }
        }
    },
    "cobl_led_control": {
        color: "#00979D",
        fontColor: "#fff",
        skeleton: "basic",
        template: "11.무지개LED%1%2 %3",
        params: [
            {
                type: "Dropdown",
                options: [
                  ["1","1"],
                  ["2","2"],
                  ["3","3"]
                ],
                fontSize: 11
            },
            {
                type: "Dropdown",
                options: [
                  ["OFF","OFF"],
                  ["빨강","Red"],
                  ["주황","Orange"],
                  ["노랑","Yellow"],
                  ["초록","Green"],
                  ["파랑","Blue"],
                  ["남색","Dark Blue"],
                  ["보라","Purple"],
                  ["흰색","White"]
                ],
                fontSize: 11
            },
            {
                type: "Indicator",
                img: "block_icon/hardware_03.png",
                size: 12
            }
        ],
        def: {
            params: [
                "1",
                "OFF"
            ],
            type: "cobl_led_control"
        },
        paramsKeyMap: {
            PORT: 0,
            OPERATOR: 1
        },
        class: "cobl",
        isNotFor : [ "cobl" ],
        "func": function(sprite, script) {
            var port = script.getStringField("PORT");
            var value = script.getStringField("OPERATOR");
            Entry.hw.setDigitalPortValue("RainBowLED_" + port, value);
            Entry.hw.update();
            delete Entry.hw.sendQueue["RainBowLED_" + port];
            return script.callReturn();
        }
    },
    "cobl_servo_angle_control": {
        color: "#00979D",
        fontColor: "#fff",
        skeleton: "basic",
        template: "12.각도모터 각도%1(15~165) %2",
        params: [
            {
                type: "TextInput",
                value: 0
            },
            {
                type: "Indicator",
                img: "block_icon/hardware_03.png",
                size: 12
            }
        ],
        def: {
            type: "cobl_servo_angle_control"
        },
        paramsKeyMap: {
            VALUE: 0
        },
        class: "cobl",
        isNotFor : [ "cobl" ],
        "func": function(sprite, script) {
            var value = script.getNumberField("VALUE");
            value = Math.round(value);
            value = Math.max(value, 15);
            value = Math.min(value, 165);

            Entry.hw.setDigitalPortValue("Servo1", value);
            Entry.hw.update();
            delete Entry.hw.sendQueue["Servo1"];

            return script.callReturn();
        }
    },
    "cobl_melody": {
        color: "#00979D",
        fontColor: "#fff",
        skeleton: "basic",
        template: "13.멜로디%1 ,%2",
        params: [
            {
                type: "Dropdown",
                options: [
                ["((낮은)솔","L_So"],
                ["(낮은)솔#","L_So#"],
                ["(낮은)라","L_La"],
                ["(낮은)라#","L_La#"],
                ["(낮은)시","L_Ti"],
                ["도","Do"],
                ["도#","Do#"],
                ["레","Re"],
                ["레#","Re#"],
                ["미","Mi"],
                ["파","Fa"],
                ["파#","Fa#"],
                ["솔","So"],
                ["솔#","So#"],
                ["라","La"],
                ["라#","La#"],
                ["시","Ti"],
                ["(높은)도","H_Do"],
                ["(높은)도#","H_Do#"],
                ["(높은)레","H_Re"],
                ["(높은)레#","H_Re#"],
                ["(높은)미#","H_Mi"],
                ["(높은)파","H_Fa"]
                ],
                fontSize: 11
            },
            {
                type: "Indicator",
                img: "block_icon/hardware_03.png",
                size: 12
            }
        ],
        def: {
            params: [
                "Do"
            ],
            type: "cobl_melody"
        },
        paramsKeyMap: {
            MELODY: 0
        },
        class: "cobl",
        isNotFor : [ "cobl" ],
        "func": function(sprite, script) {
            var melody = script.getStringField("MELODY");

            Entry.hw.setDigitalPortValue("Melody", melody);
            Entry.hw.update();
            delete Entry.hw.sendQueue["Melody"];

            return script.callReturn();
        }
    },
    "cobl_dcmotor": {
        color: "#00979D",
        fontColor: "#fff",
        skeleton: "basic",
        template: "14.회전모터%1%2속도%3 %4",
        params: [
            {
                type: "Dropdown",
                options: [
                  ["1","1"],
                  ["2","2"]
                ],
                fontSize: 11
            },
            {
                type: "Dropdown",
                options: [
                  ["1.시계방향","1"],
                  ["2.반시계방향","2"],
                  ["3.정지","3"]
                ],
                fontSize: 11
            },
            {
                type: "Dropdown",
                options: [
                  ["1","1"],
                  ["2","2"],
                  ["3","3"],
                  ["4","4"],
                  ["5","5"]
                ],
                fontSize: 11
            },
            {
                type: "Indicator",
                img: "block_icon/hardware_03.png",
                size: 12
            }
        ],
        def: {
            params: [
                "1",
                "1",
                "1"
            ],
            type: "cobl_dcmotor"
        },
        paramsKeyMap: {
            MOTOR: 0,
            DIRECTION: 1,
            SPEED:2
        },
        class: "cobl",
        isNotFor : [ "cobl" ],
        "func": function(sprite, script) {
            var motor = script.getStringField("MOTOR");
            var direction = script.getStringField("DIRECTION");
            var speed = script.getStringField("SPEED");

            if (motor == 1) {
                Entry.hw.setDigitalPortValue("DC1_DIR", direction);
                Entry.hw.setDigitalPortValue("DC1_SPEED", speed);
                Entry.hw.update();
                delete Entry.hw.sendQueue["DC1_DIR"];
                delete Entry.hw.sendQueue["DC1_SPEED"];
            }

            if (motor == 2) {
                Entry.hw.setDigitalPortValue("DC2_DIR", direction);
                Entry.hw.setDigitalPortValue("DC2_SPEED", speed);
                Entry.hw.update();
                delete Entry.hw.sendQueue["DC2_DIR"];
                delete Entry.hw.sendQueue["DC2_SPEED"];
            }

            return script.callReturn();
        }
    },
    "cobl_extention_port": {
        color: "#00979D",
        fontColor: "#fff",
        skeleton: "basic",
        template: "15.USB포트%1단계%2 %3",
        params: [
            {
                type: "Dropdown",
                options: [
                  ["1","1"],
                  ["2","2"]
                ],
                fontSize: 11
            },
            {
                type: "Dropdown",
                options: [
                  ["0","0"],
                  ["1","1"],
                  ["2","2"],
                  ["3","3"],
                  ["4","4"],
                  ["5","5"]
                ],
                fontSize: 11
            },
            {
                type: "Indicator",
                img: "block_icon/hardware_03.png",
                size: 12
            }
        ],
        def: {
            params: [
                "1",
                "0"
            ],
            type: "cobl_extention_port"
        },
        paramsKeyMap: {
            PORT: 0,
            LEVEL: 1
        },
        class: "cobl",
        isNotFor : [ "cobl" ],
        "func": function(sprite, script) {
            var port = script.getStringField("PORT");
            var level = script.getStringField("LEVEL");

            if(port == 1){
                Entry.hw.setDigitalPortValue("EXUSB1", level);
                Entry.hw.update();
                delete Entry.hw.sendQueue["EXUSB1"];
            }

            if(port == 2){
                Entry.hw.setDigitalPortValue("EXUSB2", level);
                Entry.hw.update();
                delete Entry.hw.sendQueue["EXUSB2"];
            }
            return script.callReturn();
        }
    },
    "cobl_external_led": {
        color: "#00979D",
        fontColor: "#fff",
        skeleton: "basic",
        template: "16.외부LED%1(1~64)R%2G%3B%4 %5",
        params: [
            {
                type: "TextInput",
                value: 0,
                fontSize: 11
            },
            {
                type: "Dropdown",
                options: [
                  ["0","0"],
                  ["1","1"],
                  ["2","2"],
                  ["3","3"],
                  ["4","4"],
                  ["5","5"],
                  ["6","6"],
                  ["7","7"],
                  ["8","8"],
                  ["9","9"],
                  ["10","10"]
                ],
                fontSize: 11
            },            {
                type: "Dropdown",
                options: [
                  ["0","0"],
                  ["1","1"],
                  ["2","2"],
                  ["3","3"],
                  ["4","4"],
                  ["5","5"],
                  ["6","6"],
                  ["7","7"],
                  ["8","8"],
                  ["9","9"],
                  ["10","10"]
                ],
                fontSize: 11
            },            {
                type: "Dropdown",
                options: [
                  ["0","0"],
                  ["1","1"],
                  ["2","2"],
                  ["3","3"],
                  ["4","4"],
                  ["5","5"],
                  ["6","6"],
                  ["7","7"],
                  ["8","8"],
                  ["9","9"],
                  ["10","10"]
                ],
                fontSize: 11
            },
            {
                type: "Indicator",
                img: "block_icon/hardware_03.png",
                size: 12
            }
        ],
        def: {
            params: [
                "1",
                "1",
                "1",
                "1"
            ],
            type: "cobl_external_led"
        },
        paramsKeyMap: {
            LED: 0,
            RED: 1,
            GREEN : 2,
            BLUE : 3
        },
        class: "cobl",
        isNotFor : [ "cobl" ],
        "func": function(sprite, script) {
            var led = script.getNumberField("LED");
            var r = script.getStringField("RED");
            var g = script.getStringField("GREEN");
            var b = script.getStringField("BLUE");

            Entry.hw.setDigitalPortValue("ELED_IDX", led);
            Entry.hw.setDigitalPortValue("ELED_R", r);
            Entry.hw.setDigitalPortValue("ELED_G", g);
            Entry.hw.setDigitalPortValue("ELED_B", b);
            Entry.hw.update();

            delete Entry.hw.sendQueue["ELED_IDX"];
            delete Entry.hw.sendQueue["ELED_R"];
            delete Entry.hw.sendQueue["ELED_G"];
            delete Entry.hw.sendQueue["ELED_B"];

            return script.callReturn();
        }
    },
    "cobl_7_segment": {
        color: "#00979D",
        fontColor: "#fff",
        skeleton: "basic",
        template: "17.숫자전광판%1(0~9999) %2",
        params: [
            {
                type: "TextInput",
                value: 0
            },
            {
                type: "Indicator",
                img: "block_icon/hardware_03.png",
                size: 12
            }
        ],
        def: {
            type: "cobl_7_segment"
        },
        paramsKeyMap: {
            VALUE: 0
        },
        class: "cobl",
        isNotFor : [ "cobl" ],
        "func": function(sprite, script) {
            var value = script.getNumberField("VALUE");
            Entry.hw.setDigitalPortValue("7SEG", value);
            Entry.hw.update();
            delete Entry.hw.sendQueue["7SEG"];
            return script.callReturn();
        }
    },
    "start_drawing": {
        "color": "#FF9E20",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/brush_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "start_drawing"
        },
        "class": "brush_control",
        "isNotFor": [ "textBox" ],
        "func": function (sprite, script) {

            if (sprite.brush)
                sprite.brush.stop = false;
            else
                Entry.setBasicBrush(sprite);

            Entry.stage.sortZorder();
            sprite.brush.moveTo(sprite.getX(), sprite.getY()*-1);

            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Entry.start_drawing()"]}
    },
    "stop_drawing": {
        "color": "#FF9E20",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/brush_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "stop_drawing"
        },
        "class": "brush_control",
        "isNotFor": [ "textBox" ],
        "func": function (sprite, script) {
            if (sprite.brush && sprite.shape)
                sprite.brush.stop = true;

            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Entry.stop_drawing()"]}
    },
    "set_color": {
        "color": "#FF9E20",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Color"
            },
            {
                "type": "Indicator",
                "img": "block_icon/brush_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "set_color"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "brush_color",
        "isNotFor": [ "textBox" ],
        "func": function (sprite, script) {
            var colour = script.getField("VALUE", script);

            if (!sprite.brush) {
                Entry.setBasicBrush(sprite);
                sprite.brush.stop = true;
            }

            if (sprite.brush) {
                var rgb = Entry.hex2rgb(colour);
                sprite.brush.rgb = rgb;
                sprite.brush.endStroke();
                sprite.brush.beginStroke("rgba("+rgb.r+","+rgb.g+","+rgb.b+","+(sprite.brush.opacity/100)+")");

                sprite.brush.moveTo(sprite.getX(), sprite.getY()*-1);
            }

            return script.callReturn();
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Entry.set_brush_color_to(%1)",
                textParams: [
                    {
                        "type": "Color",
                        converter: Entry.block.converters.returnStringValue,
                        codeMap: "Entry.CodeMap.Entry.set_brush_color_to[0]" 
                    }
                ]
            }
        ]}
    },
    "set_random_color": {
        "color": "#FF9E20",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/brush_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "set_random_color"
        },
        "class": "brush_color",
        "isNotFor": [ "textBox" ],
        "func": function (sprite, script) {
            if (!sprite.brush) {
                Entry.setBasicBrush(sprite);
                sprite.brush.stop = true;
            }

            if (sprite.brush) {
                var rgb = Entry.generateRgb();
                sprite.brush.rgb = rgb;
                sprite.brush.endStroke();
                sprite.brush.beginStroke("rgba("+rgb.r+","+rgb.g+","+rgb.b+","+(sprite.brush.opacity/100)+")");

                sprite.brush.moveTo(sprite.getX(), sprite.getY()*-1);
            }
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Entry.set_brush_color_to_random()"]}
    },
    "change_thickness": {
        "color": "#FF9E20",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/brush_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "number",
                    "params": [ "1" ]
                },
                null
            ],
            "type": "change_thickness"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "brush_thickness",
        "isNotFor": [ "textBox" ],
        "func": function (sprite, script) {
            var thickness = script.getNumberValue("VALUE", script);

            if (!sprite.brush) {
                Entry.setBasicBrush(sprite);
                sprite.brush.stop = true;
            }

            if (sprite.brush) {
                sprite.brush.thickness += thickness;
                if (sprite.brush.thickness < 1)
                    sprite.brush.thickness = 1;

                sprite.brush.setStrokeStyle(sprite.brush.thickness);

                sprite.brush.moveTo(sprite.getX(), sprite.getY()*-1);
            }

            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Entry.add_brush_size(%1)"]}
    },
    "set_thickness": {
        "color": "#FF9E20",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/brush_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "number",
                    "params": [ "1" ]
                },
                null
            ],
            "type": "set_thickness"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "brush_thickness",
        "isNotFor": [ "textBox" ],
        "func": function (sprite, script) {
            var thickness = script.getNumberValue("VALUE", script);

            if (!sprite.brush) {
                Entry.setBasicBrush(sprite);
                sprite.brush.stop = true;
            }

            if (sprite.brush) {
                sprite.brush.thickness = thickness;
                sprite.brush.setStrokeStyle(sprite.brush.thickness);

                sprite.brush.moveTo(sprite.getX(), sprite.getY()*-1);
            }

            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Entry.set_brush_size(%1)"]}
    },
    "change_opacity": {
        "color": "#FF9E20",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/brush_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "number",
                    "params": [ "10" ]
                },
                null
            ],
            "type": "change_opacity"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "brush_opacity",
        "isNotFor": [ "textBox" ],
        "func": function (sprite, script) {
            var opacity = script.getNumberValue("VALUE", script);

            if (!sprite.brush) {
                Entry.setBasicBrush(sprite);
                sprite.brush.stop = true;
            }
            opacity = Entry.adjustValueWithMaxMin(sprite.brush.opacity + opacity, 0, 100);

            if (sprite.brush) {
                sprite.brush.opacity = opacity;
                sprite.brush.endStroke();
                var rgb = sprite.brush.rgb;
                sprite.brush.beginStroke("rgba("+rgb.r+","+rgb.g+","+rgb.b+","+(sprite.brush.opacity/100)+")");
                sprite.brush.moveTo(sprite.getX(), sprite.getY()*-1);
            }

            return script.callReturn();
        },
        "syntax": {"js": [], "py": [""]}
    },
    "set_opacity": {
        "color": "#FF9E20",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/brush_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "number",
                    "params": [ "50" ]
                },
                null
            ],
            "type": "set_opacity"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "brush_opacity",
        "isNotFor": [ "textBox" ],
        "func": function (sprite, script) {
            var opacity = script.getNumberValue("VALUE", script);

            if (!sprite.brush) {
                Entry.setBasicBrush(sprite);
                sprite.brush.stop = true;
            }

            if (sprite.brush) {
                sprite.brush.opacity = Entry.adjustValueWithMaxMin(opacity, 0, 100);
                sprite.brush.endStroke();
                var rgb = sprite.brush.rgb;
                sprite.brush.beginStroke("rgba("+rgb.r+","+rgb.g+","+rgb.b+","+(sprite.brush.opacity/100)+")");
                sprite.brush.moveTo(sprite.getX(), sprite.getY()*-1);
            }

            return script.callReturn();

        },
        "syntax": {"js": [], "py": [""]}
    },
    "brush_erase_all": {
        "color": "#FF9E20",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/brush_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "brush_erase_all"
        },
        "class": "brush_clear",
        "isNotFor": [ "textBox" ],
        "func": function (sprite, script) {
            var brush = sprite.brush;
            if (brush) {
                var stroke = brush._stroke.style;
                var style = brush._strokeStyle.width;
                brush.clear().setStrokeStyle(style).beginStroke(stroke);
                brush.moveTo(sprite.getX(), sprite.getY()*-1);
            }

            var stampEntities = sprite.parent.getStampEntities();
            stampEntities.map(function (entity) {
                entity.removeClone();
            });
            stampEntities = null;

            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Entry.clear_drawing()"]}
    },
    "brush_stamp": {
        "color": "#FF9E20",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/brush_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "brush_stamp"
        },
        "class": "stamp",
        "isNotFor": [ "textBox" ],
        "func": function (sprite, script) {
            sprite.parent.addStampEntity(sprite);

            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Entry.stamp()"]}
    },
    "change_brush_transparency": {
        "color": "#FF9E20",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/brush_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "number",
                    "params": [ "10" ]
                },
                null
            ],
            "type": "change_brush_transparency"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "brush_opacity",
        "isNotFor": [ "textBox" ],
        "func": function (sprite, script) {
            var opacity = script.getNumberValue("VALUE", script);

            if (!sprite.brush) {
                Entry.setBasicBrush(sprite);
                sprite.brush.stop = true;
            }
            opacity = Entry.adjustValueWithMaxMin(sprite.brush.opacity - opacity, 0, 100);

            if (sprite.brush) {
                sprite.brush.opacity = opacity;
                sprite.brush.endStroke();
                var rgb = sprite.brush.rgb;
                sprite.brush.beginStroke("rgba("+rgb.r+","+rgb.g+","+rgb.b+","+(sprite.brush.opacity/100)+")");
                sprite.brush.moveTo(sprite.getX(), sprite.getY()*-1);
            }

            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Entry.add_brush_transparency(%1)"]}
    },
    "set_brush_tranparency": {
        "color": "#FF9E20",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/brush_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "number",
                    "params": [ "50" ]
                },
                null
            ],
            "type": "set_brush_tranparency"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "brush_opacity",
        "isNotFor": [ "textBox" ],
        "func": function (sprite, script) {
            var opacity = script.getNumberValue("VALUE", script);

            if (!sprite.brush) {
                Entry.setBasicBrush(sprite);
                sprite.brush.stop = true;
            }

            if (sprite.brush) {
                sprite.brush.opacity = Entry.adjustValueWithMaxMin(opacity, 0, 100);
                sprite.brush.endStroke();
                var rgb = sprite.brush.rgb;
                sprite.brush.beginStroke("rgba("+rgb.r+","+rgb.g+","+rgb.b+","+(1 - sprite.brush.opacity/100)+")");
                sprite.brush.moveTo(sprite.getX(), sprite.getY()*-1);
            }

            return script.callReturn();

        },
        "syntax": {"js": [], "py": ["Entry.set_brush_transparency(%1)"]}
    },
    "number": {
        "color": "#FFD974",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "TextInput",
                "value": 10
            }
        ],
        "events": {},
        "def": {
            "params": []
        },
        "paramsKeyMap": {
            "NUM": 0
        },
        "func": function (sprite, script) {
            return script.getField('NUM', script);
        },
        "isPrimitive": true,
        "syntax": {"js": ["Scope", "%1"], "py": [
            {
                syntax: "%1",
                keyOption: "number",
                textParams: [
                    {
                        "type": "TextInput",
                        converter: Entry.block.converters.returnStringOrNumberByValue
                    },
                ]
            }
        ]}
    },
    "angle": {
        "color": "#FFD974",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Angle"
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "angle"
        },
        "paramsKeyMap": {
            "ANGLE": 0
        },
        "func": function (sprite, script) {
            return script.getNumberField("ANGLE");
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "%1",
                keyOption: "angle",
                textParams: [
                    {
                        "type": "Angle",
                        converter: Entry.block.converters.returnRawNumberValueByKey
                    },
                ]
            }
        ]}
    },
    "get_x_coordinate": {
        "color": "#FFD974",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_get_x_coordinate,
                "color": "#3D3D3D"
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "get_x_coordinate"
        },
        "class": "calc",
        "isNotFor": [],
        "func": function (sprite, script) {
            return sprite.getX();
        },
        "syntax": {"js": [], "py": [""]}
    },
    "get_y_coordinate": {
        "color": "#FFD974",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_get_y_coordinate,
                "color": "#3D3D3D"
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "get_y_coordinate"
        },
        "class": "calc",
        "isNotFor": [],
        "func": function (sprite, script) {
            return sprite.getY();
        },
        "syntax": {"js": [], "py": [""]}
    },
    "get_angle": {
        "color": "#FFD974",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_get_angle,
                "color": "#3D3D3D"
            }
        ],
        "events": {},
        "def": {
            "params": [ null ]
        },
        "func": function (sprite, script) {
            return parseFloat(sprite.getRotation().toFixed(1));
        },
        "syntax": {"js": [], "py": [""]}
    },
    "get_rotation_direction": {
        "color": "#FFD974",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.CALC_rotation_value,"ROTATION"],
                    [Lang.Blocks.CALC_direction_value,"DIRECTION"]
                ],
                "value": "ROTATION",
                "fontSize": 11
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "get_rotation_direction"
        },
        "paramsKeyMap": {
            "OPERATOR": 0
        },
        "class": "calc",
        "isNotFor": [],
        "func": function (sprite, script) {
            var o = script.getField("OPERATOR", script);
            if (o.toUpperCase() == 'DIRECTION')
                return parseFloat(sprite.getDirection().toFixed(1));
            else
                return parseFloat(sprite.getRotation().toFixed(1));
        },
        "syntax": {"js": [], "py": [""]}
    },
    "distance_something": {
        "color": "#FFD974",
        "vimModeFontColor": "black",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_distance_something_1,
                "color": "#3D3D3D"
            },
            {
                "type": "DropdownDynamic",
                "value": null,
                "menuName": "spritesWithMouse",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_CALC
            },
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_distance_something_2,
                "color": "#3D3D3D"
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null, null ],
            "type": "distance_something"
        },
        "paramsKeyMap": {
            "VALUE": 1
        },
        "class": "calc_distance",
        "isNotFor": [],
        "func": function (sprite, script) {
            var targetId = script.getField("VALUE", script);
            if (targetId == 'mouse') {
                var mousePos = Entry.stage.mouseCoordinate;
                return Math.sqrt(
                    Math.pow(sprite.getX() - mousePos.x, 2) +
                        Math.pow(sprite.getY() - mousePos.y, 2)
                );
            } else {
                var targetEntity = Entry.container.getEntity(targetId);
                return Math.sqrt(
                    Math.pow(sprite.getX() - targetEntity.getX(), 2) +
                        Math.pow(sprite.getY() - targetEntity.getY(), 2)
                );
            }
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Entry.value_of_distance_to(%2)",
                textParams: [
                    undefined,
                    {
                        "type": "DropdownDynamic",
                        "value": null,
                        "menuName": "spritesWithMouse",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_CALC,
                        converter: Entry.block.converters.returnStringKey
                    },
                ]
            }
        ]}
    },
    "coordinate_mouse": {
        "color": "#FFD974",
        "vimModeFontColor": "black",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_coordinate_mouse_1,
                "color": "#3D3D3D"
            },
            {
                "type": "Dropdown",
                "options": [
                    [ "x", "x" ],
                    [ "y", "y" ]
                ],
                "value": "x",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_CALC
            },
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_coordinate_mouse_2,
                "color": "#3D3D3D"
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null, null ],
            "type": "coordinate_mouse"
        },
        "paramsKeyMap": {
            "VALUE": 1
        },
        "class": "calc",
        "isNotFor": [],
        "func": function (sprite, script) {
            var targetCoordinate = script.getField("VALUE", script);
            if (targetCoordinate === 'x') {
                return Number(Entry.stage.mouseCoordinate.x);
            } else {
                return Number(Entry.stage.mouseCoordinate.y);
            }
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Entry.value_of_mouse_pointer(%2)",
                textParams: [
                    {
                        "type": "Text",
                        "text": Lang.Blocks.CALC_coordinate_mouse_1,
                        "color": "#3D3D3D"
                    },
                    {
                        "type": "Dropdown",
                        "options": [
                            [ "x", "x" ],
                            [ "y", "y" ]
                        ],
                        "value": "x",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_CALC,
                        converter: Entry.block.converters.returnStringKey
                    },
                    {
                        "type": "Text",
                        "text": Lang.Blocks.CALC_coordinate_mouse_2,
                        "color": "#3D3D3D"
                    }
                ]
            }
        ]}
    },
    "coordinate_object": {
        "color": "#FFD974",
        "vimModeFontColor": "black",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_coordinate_object_1,
                "color": "#3D3D3D"
            },
            {
                "type": "DropdownDynamic",
                "value": null,
                "menuName": "spritesWithSelf",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_CALC
            },
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_coordinate_object_2,
                "color": "#3D3D3D"
            },
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.CALC_coordinate_x_value,"x"],
                    [Lang.Blocks.CALC_coordinate_y_value, "y"],
                    [Lang.Blocks.CALC_coordinate_rotation_value, "rotation"],
                    [Lang.Blocks.CALC_coordinate_direction_value, "direction"],
                    [Lang.Blocks.CALC_coordinate_size_value, "size"],
                    [Lang.Blocks.CALC_picture_index, "picture_index"],
                    [Lang.Blocks.CALC_picture_name, "picture_name"]
                ],
                "value": "x",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_CALC
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null, null, null ],
            "type": "coordinate_object"
        },
        "paramsKeyMap": {
            "VALUE": 1,
            "COORDINATE": 3
        },
        "class": "calc",
        "isNotFor": [],
        "func": function (sprite, script) {
            var targetId = script.getField("VALUE", script);
            var targetEntity;
            if (targetId == 'self')
                targetEntity = sprite;
            else
                targetEntity = Entry.container.getEntity(targetId);

            var targetCoordinate = script.getField("COORDINATE", script);
            switch(targetCoordinate) {
                case 'x':
                    return targetEntity.getX();
                case 'y':
                    return targetEntity.getY();
                case 'rotation':
                    return targetEntity.getRotation();
                case 'direction':
                    return targetEntity.getDirection();
                case 'picture_index':
                    var object = targetEntity.parent;
                    var pictures = object.pictures;
                    return pictures.indexOf(targetEntity.picture) + 1;
                case 'size':
                    return Number(targetEntity.getSize().toFixed(1));
                case 'picture_name':
                    var object = targetEntity.parent;
                    var pictures = object.pictures;
                    var picture = pictures[pictures.indexOf(targetEntity.picture)];
                    return picture.name;
            }
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Entry.value_of_object(%2, %4)",
                textParams: [
                    undefined,
                    {
                        "type": "DropdownDynamic",
                        "value": null,
                        "menuName": "spritesWithSelf",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_CALC,
                        converter: Entry.block.converters.returnStringKey
                    },
                    undefined,
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.CALC_coordinate_x_value,"x"],
                            [Lang.Blocks.CALC_coordinate_y_value, "y"],
                            [Lang.Blocks.CALC_coordinate_rotation_value, "rotation"],
                            [Lang.Blocks.CALC_coordinate_direction_value, "direction"],
                            [Lang.Blocks.CALC_coordinate_size_value, "size"],
                            [Lang.Blocks.CALC_picture_index, "picture_index"],
                            [Lang.Blocks.CALC_picture_name, "picture_name"]
                        ],
                        "value": "x",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_CALC,
                        converter: Entry.block.converters.returnStringValue
                    }
                ]
            }
        ]}
    },
    "calc_basic": {
        "color": "#FFD974",
        "vimModeFontColor": "black",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Dropdown",
                "options": [
                    [ "+", "PLUS" ],
                    [ "-", "MINUS" ],
                    [ "x", "MULTI" ],
                    [ "/", "DIVIDE" ]
                ],
                "value": "PLUS",
                "fontSize": 11,
                noArrow: true
            },
            {
                "type": "Block",
                "accept": "string"
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "number",
                    "params": [ "10" ]
                },
                "PLUS",
                {
                    "type": "number",
                    "params": [ "10" ]
                }
            ],
            "type": "calc_basic"
        },
        "defs": [
            {
                "params": [
                    {
                        "type": "number",
                        "params": [ "10" ]
                    },
                    "PLUS",
                    {
                        "type": "number",
                        "params": [ "10" ]
                    }
                ],
                "type": "calc_basic"
            },
            {
                "params": [
                    {
                        "type": "number",
                        "params": [ "10" ]
                    },
                    "MINUS",
                    {
                        "type": "number",
                        "params": [ "10" ]
                    }
                ],
                "type": "calc_basic"
            },
            {
                "params": [
                    {
                        "type": "number",
                        "params": [ "10" ]
                    },
                    "MULTI",
                    {
                        "type": "number",
                        "params": [ "10" ]
                    }
                ],
                "type": "calc_basic"
            },
            {
                "params": [
                    {
                        "type": "number",
                        "params": [ "10" ]
                    },
                    "DIVIDE",
                    {
                        "type": "number",
                        "params": [ "10" ]
                    }
                ],
                "type": "calc_basic"
            }
        ],
        "paramsKeyMap": {
            "LEFTHAND": 0,
            "OPERATOR": 1,
            "RIGHTHAND": 2
        },
        "class": "calc",
        "isNotFor": [],
        "func": function (sprite, script) {
            var operator = script.getField("OPERATOR", script);
            var leftValue = script.getNumberValue("LEFTHAND", script);
            var rightValue = script.getNumberValue("RIGHTHAND", script);
            if (operator == "PLUS")
                return leftValue + rightValue;
            else if (operator == "MINUS")
                return leftValue - rightValue;
            else if (operator == "MULTI")
                return leftValue * rightValue;
            else
                return leftValue / rightValue;
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "(%1 %2 %3)", 
                keyOption: "calc_basic",
                textParams: [
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    {
                        "type": "Dropdown",
                        "options": [
                            [ "+", "PLUS" ],
                            [ "-", "MINUS" ],
                            [ "x", "MULTI" ],
                            [ "/", "DIVIDE" ]
                        ],
                        "value": "PLUS",
                        "fontSize": 11,
                        noArrow: true,
                        converter: Entry.block.converters.returnOperator
                    },
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                ]
            }
        ]}
    },
    "calc_plus": {
        "color": "#FFD974",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Text",
                "text": "+",
                "color": "#3D3D3D"
            },
            {
                "type": "Block",
                "accept": "string"
            }
        ],
        "events": {},
        "def": {
            "params": [ null ]
        },
        "paramsKeyMap": {
            "LEFTHAND": 0,
            "RIGHTHAND": 2
        },
        "func": function (sprite, script) {
            var leftValue = script.getNumberValue("LEFTHAND", script);
            var rightValue = script.getNumberValue("RIGHTHAND", script);
            return leftValue + rightValue;
        },
        "syntax": {"js": [], "py": [""]}
    },
    "calc_minus": {
        "color": "#FFD974",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Text",
                "text": "-",
                "color": "#3D3D3D"
            },
            {
                "type": "Block",
                "accept": "string"
            }
        ],
        "events": {},
        "def": {
            "params": [ null ]
        },
        "paramsKeyMap": {
            "LEFTHAND": 0,
            "RIGHTHAND": 2
        },
        "func": function (sprite, script) {
            var leftValue = script.getNumberValue("LEFTHAND", script);
            var rightValue = script.getNumberValue("RIGHTHAND", script);
            return leftValue - rightValue;
        },
        "syntax": {"js": [], "py": [""]}
    },
    "calc_times": {
        "color": "#FFD974",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Text",
                "text": "x",
                "color": "#3D3D3D"
            },
            {
                "type": "Block",
                "accept": "string"
            }
        ],
        "events": {},
        "def": {
            "params": [ null ]
        },
        "paramsKeyMap": {
            "LEFTHAND": 0,
            "RIGHTHAND": 2
        },
        "func": function (sprite, script) {
            var leftValue = script.getNumberValue("LEFTHAND", script);
            var rightValue = script.getNumberValue("RIGHTHAND", script);
            return leftValue * rightValue;
        },
        "syntax": {"js": [], "py": [""]}
    },
    "calc_divide": {
        "color": "#FFD974",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Text",
                "text": "/",
                "color": "#3D3D3D"
            },
            {
                "type": "Block",
                "accept": "string"
            }
        ],
        "events": {},
        "def": {
            "params": [ null ]
        },
        "paramsKeyMap": {
            "LEFTHAND": 0,
            "RIGHTHAND": 2
        },
        "func": function (sprite, script) {
            var leftValue = script.getNumberValue("LEFTHAND", script);
            var rightValue = script.getNumberValue("RIGHTHAND", script);
            return leftValue / rightValue;
        },
        "syntax": {"js": [], "py": [""]}
    },
    "calc_mod": {
        "color": "#FFD974",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Text",
                "text": "/",
                "color": "#3D3D3D"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_calc_mod_3,
                "color": "#3D3D3D"
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "number",
                    "params": [ "10" ]
                },
                null,
                {
                    "type": "number",
                    "params": [ "10" ]
                },
                null
            ],
            "type": "calc_mod"
        },
        "paramsKeyMap": {
            "LEFTHAND": 0,
            "RIGHTHAND": 2
        },
        "class": "calc",
        "isNotFor": [],
        "func": function (sprite, script) {
            var leftValue = script.getNumberValue("LEFTHAND", script);
            var rightValue = script.getNumberValue("RIGHTHAND", script);
            return leftValue % rightValue;
        },
        "syntax": {"js": [], "py": ["Entry.get_remainder(%1, %3)"]}
    },
    "calc_share": {
        "color": "#FFD974",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Text",
                "text": "/",
                "color": "#3D3D3D"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Text",
                "text": "의 몫",
                "color": "#3D3D3D"
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "number",
                    "params": [ "10" ]
                },
                null,
                {
                    "type": "number",
                    "params": [ "10" ]
                },
                null
            ],
            "type": "calc_share"
        },
        "paramsKeyMap": {
            "LEFTHAND": 0,
            "RIGHTHAND": 2
        },
        "class": "calc",
        "isNotFor": [],
        "func": function (sprite, script) {
            var leftValue = script.getNumberValue("LEFTHAND", script);
            var rightValue = script.getNumberValue("RIGHTHAND", script);
            return Math.floor(leftValue/rightValue);
        },
        "syntax": {"js": [], "py": [""]}
    },
    "calc_operation": {
        "color": "#FFD974",
        "vimModeFontColor": "black",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_calc_operation_of_1,
                "color": "#3D3D3D"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_calc_operation_of_2,
                "color": "#3D3D3D"
            },
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.CALC_calc_operation_square,"square"],
                    [Lang.Blocks.CALC_calc_operation_root, "root"],
                    [Lang.Blocks.CALC_calc_operation_sin, "sin"],
                    [Lang.Blocks.CALC_calc_operation_cos,"cos"],
                    [Lang.Blocks.CALC_calc_operation_tan,"tan"],
                    [Lang.Blocks.CALC_calc_operation_asin, "asin_radian"],
                    [Lang.Blocks.CALC_calc_operation_acos,"acos_radian"],
                    [Lang.Blocks.CALC_calc_operation_atan,"atan_radian"],
                    [Lang.Blocks.CALC_calc_operation_log,"log"],
                    [Lang.Blocks.CALC_calc_operation_ln,"ln"],
                    [Lang.Blocks.CALC_calc_operation_unnatural,"unnatural"],
                    [Lang.Blocks.CALC_calc_operation_floor,"floor"],
                    [Lang.Blocks.CALC_calc_operation_ceil,"ceil"],
                    [Lang.Blocks.CALC_calc_operation_round,"round"],
                    [Lang.Blocks.CALC_calc_operation_factorial,"factorial"],
                    [Lang.Blocks.CALC_calc_operation_abs,"abs"]
                ],
                "value": "square",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_CALC
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                {
                    "type": "number",
                    "params": [ "10" ]
                },
                null,
                null
            ],
            "type": "calc_operation"
        },
        "paramsKeyMap": {
            "LEFTHAND": 1,
            "VALUE": 3
        },
        "class": "calc",
        "isNotFor": [],
        "func": function (sprite, script) {
            var value = script.getNumberValue("LEFTHAND", script);
            var operator = script.getField("VALUE", script);
            var xRangeCheckList = ['asin_radian', 'acos_radian'];
            if ((xRangeCheckList.indexOf(operator) > -1) &&
                (value > 1 || value < -1))
                throw new Error('x range exceeded');

            var needToConvertList = ['sin', 'cos', 'tan'];
            if (operator.indexOf('_'))
                operator = operator.split('_')[0];

            if (needToConvertList.indexOf(operator) > -1)
                value = Entry.toRadian(value);

            var returnVal = 0;
            switch(operator){
                case "square":
                    returnVal = value * value;
                    break;
                case "factorial":
                    returnVal = Entry.factorial(value);
                    break;
                case "root":
                    returnVal = Math.sqrt(value);
                    break;
                case "log":
                    returnVal = Math.log(value) / Math.LN10;
                    break;
                case "ln":
                    returnVal = Math.log(value);
                    break;
                case "asin":
                case "acos":
                case "atan":
                    returnVal = Entry.toDegrees(Math[operator](value));
                    break;
                case "unnatural":
                    returnVal = value - Math.floor(value);
                    if (value < 0)
                        returnVal = 1 - returnVal;
                    break;
                default:
                    returnVal = Math[operator](value);
            }

            return returnVal;
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "(%2**2)", 
                params: [null, null, null, "square"],
                textParams: [undefined, 
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    undefined,
                    null
                ]
            },
            {
                syntax: "math.sqrt(%2)", 
                params: [null, null, null, "root"],
                textParams: [undefined, 
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    undefined,
                    null
                ]
            },
            {
                syntax: "math.sin(%2)", 
                params: [null, null, null, "sin"],
                textParams: [undefined, 
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    undefined,
                    null
                ]
            },
            {
                syntax: "math.cos(%2)", 
                params: [null, null, null, "cos"],
                textParams: [undefined, 
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    undefined,
                    null
                ]
            },
            {
                syntax: "math.tan(%2)", 
                params: [null, null, null, "tan"],
                textParams: [undefined, 
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    undefined,
                    null
                ]
            },
            {
                syntax: "math.asin(%2)", 
                params: [null, null, null, "asin_radian"],
                textParams: [undefined, 
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    undefined,
                    null
                ]
            },
            {
                syntax: "math.acos(%2)", 
                params: [null, null, null, "acos_radian"],
                textParams: [undefined, 
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    undefined,
                    null
                ]
            },
            {
                syntax: "math.atan(%2)", 
                params: [null, null, null, "atan_radian"],
                textParams: [undefined, 
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    undefined,
                    null
                ]
            },
            {
                syntax: "math.log10(%2)", 
                params: [null, null, null, "log"],
                textParams: [undefined, 
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    undefined,
                    null
                ]
            },
            {
                syntax: "math.log(%2)", 
                params: [null, null, null, "ln"],
                textParams: [undefined, 
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    undefined,
                    null
                ]
            },
            {
                syntax: "math.floor(%2)", 
                params: [null, null, null, "floor"],
                textParams: [undefined, 
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    undefined,
                    null
                ]
            },
            {
                syntax: "math.ceil(%2)", 
                params: [null, null, null, "ceil"],
                textParams: [undefined, 
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    undefined,
                    null
                ]
            },
            {
                syntax: "math.round(%2)", 
                params: [null, null, null, "round"],
                textParams: [undefined, 
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    undefined,
                    null
                ]
            },
            {
                syntax: "math.factorial(%2)", 
                params: [null, null, null, "factorial"],
                textParams: [undefined, 
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    undefined,
                    null
                ]
            },
            {
                syntax: "math.fabs(%2)", 
                params: [null, null, null, "abs"],
                textParams: [undefined, 
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    undefined,
                    null
                ]
            },
        ]}
    },
    "calc_rand": {
        "color": "#FFD974",
        "vimModeFontColor": "black",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_calc_rand_1,
                "color": "#3D3D3D"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_calc_rand_2,
                "color": "#3D3D3D"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_calc_rand_3,
                "color": "#3D3D3D"
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                {
                    "type": "number",
                    "params": [ "0" ]
                },
                null,
                {
                    "type": "number",
                    "params": [ "10" ]
                },
                null
            ],
            "type": "calc_rand"
        },
        "paramsKeyMap": {
            "LEFTHAND": 1,
            "RIGHTHAND": 3
        },
        "class": "calc",
        "isNotFor": [],
        "func": function (sprite, script) {
            var leftValue = script.getStringValue("LEFTHAND", script);
            var rightValue = script.getStringValue("RIGHTHAND", script);
            var left = Math.min(leftValue, rightValue);
            var right = Math.max(leftValue, rightValue);
            var isLeftFloat = Entry.isFloat(leftValue);
            var isRightFloat = Entry.isFloat(rightValue);
            if (isRightFloat || isLeftFloat)
                return  (Math.random() * (right - left) + left).toFixed(2);
            else
                return  Math.floor((Math.random() * (right - left +1) + left));
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "random.randint(%2, %4)"
            },
            {
                syntax: "random.uniform(%2, %4)"
            }
        ]}
    },
    "get_date": {
        "color": "#FFD974",
        "vimModeFontColor": "black",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_get_date_1,
                "color": "#3D3D3D"
            },
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.CALC_get_date_year,"YEAR"],
                    [Lang.Blocks.CALC_get_date_month,"MONTH"],
                    [Lang.Blocks.CALC_get_date_day,"DAY"],
                    [Lang.Blocks.CALC_get_date_hour,"HOUR"],
                    [Lang.Blocks.CALC_get_date_minute,"MINUTE"],
                    [Lang.Blocks.CALC_get_date_second,"SECOND"]
                ],
                "value": "YEAR",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_CALC
            },
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_get_date_2,
                "color": "#3D3D3D"
            }
        ],
        "events": {},
        "def": {
            "params": [ null, "YEAR", null ],
            "type": "get_date"
        },
        "paramsKeyMap": {
            "VALUE": 1
        },
        "class": "calc_date",
        "isNotFor": [],
        "func": function (sprite, script) {
            var operator = script.getField("VALUE", script);
            var dateTime = new Date();
            if (operator == "YEAR")
                return dateTime.getFullYear();
            else if (operator == "MONTH")
                return dateTime.getMonth()+1;
            else if (operator == "DAY")
                return dateTime.getDate();
            else if (operator == "HOUR")
                return dateTime.getHours();
            else if (operator == "MINUTE")
                return dateTime.getMinutes();
            else
                return dateTime.getSeconds();
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Entry.value_of_current_time(%2)",
                textParams: [
                    undefined,
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.CALC_get_date_year,"YEAR"],
                            [Lang.Blocks.CALC_get_date_month,"MONTH"],
                            [Lang.Blocks.CALC_get_date_day,"DAY"],
                            [Lang.Blocks.CALC_get_date_hour,"HOUR"],
                            [Lang.Blocks.CALC_get_date_minute,"MINUTE"],
                            [Lang.Blocks.CALC_get_date_second,"SECOND"]
                        ],
                        "value": "YEAR",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_CALC,
                        converter: Entry.block.converters.returnStringValue
                    },
                ]
            }
        ]}
    },
    "get_sound_duration": {
        "color": "#FFD974",
        "vimModeFontColor": "black",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_get_sound_duration_1,
                "color": "#3D3D3D"
            },
            {
                "type": "DropdownDynamic",
                "value": null,
                "menuName": "sounds",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_CALC
            },
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_get_sound_duration_2,
                "color": "#3D3D3D"
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null, null ],
            "type": "get_sound_duration"
        },
        "paramsKeyMap": {
            "VALUE": 1
        },
        "class": "calc_duration",
        "isNotFor": [],
        "func": function (sprite, script) {
            var soundId = script.getField("VALUE", script);
            var soundsArr = sprite.parent.sounds;

            for (var i = 0; i < soundsArr.length; i++) {
                if (soundsArr[i].id == soundId)
                    return soundsArr[i].duration;
            }
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Entry.value_of_sound_length_of(%2)",
                textParams: [
                    undefined,
                    {
                        "type": "DropdownDynamic",
                        "value": null,
                        "menuName": "sounds",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_CALC,
                        converter: Entry.block.converters.returnStringKey
                    },
                ]
            }
        ]}
    },
    "reset_project_timer": {
        "color": "#FFD974",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Text",
                "text": "초시계 초기화",
                "color": "#3D3D3D"
            }
        ],
        "events": {
            "viewAdd": [
                function() {
                    if (Entry.engine) Entry.engine.showProjectTimer();
                }
            ],
            "viewDestroy": [
                function(block) {
                    if (Entry.engine) Entry.engine.hideProjectTimer(block);
                }
            ]
        },
        "def": {
            "params": [ null ],
            "type": "reset_project_timer"
        },
        "class": "calc_timer",
        "isNotFor": [],
        "func": function (sprite, script) {
            Entry.engine.updateProjectTimer(0);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [""]}
    },
    "set_visible_project_timer": {
        "color": "#FFD974",
        "vimModeFontColor": "black",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_timer_visible_1,
                "color": "#3D3D3D"
            },
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.CALC_timer_visible_show,"SHOW"],
                    [Lang.Blocks.CALC_timer_visible_hide,"HIDE"]
                ],
                "value": "SHOW",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_CALC
            },
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_timer_visible_2,
                "color": "#3D3D3D"
            },
            {
                "type": "Indicator",
                "img": "block_icon/calc_01.png",
                "size": 12
            }
        ],
        "events": {
            "viewAdd": [
                function() {
                    if (Entry.engine) Entry.engine.showProjectTimer();
                }
            ],
            "viewDestroy": [
                function(block) {
                    if (Entry.engine) Entry.engine.hideProjectTimer(block);
                }
            ]
        },
        "def": {
            "params": [ null, "HIDE", null, null ],
            "type": "set_visible_project_timer"
        },
        "paramsKeyMap": {
            "ACTION": 1
        },
        "class": "calc_timer",
        "isNotFor": [],
        "func": function (sprite, script) {
            var action = script.getField("ACTION", script);
            var timer = Entry.engine.projectTimer;
            if (action == 'SHOW')
                timer.setVisible(true);
            else
                timer.setVisible(false);

            return script.callReturn();
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Entry.timer_view(%2)",
                textParams: [
                    undefined,
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.CALC_timer_visible_show,"SHOW"],
                            [Lang.Blocks.CALC_timer_visible_hide,"HIDE"]
                        ],
                        "value": "SHOW",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_CALC,
                        converter: Entry.block.converters.returnStringValue
                    },
                ]
            }
        ]}
    },
    "timer_variable": {
        "color": "#FFD974",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Text",
                "text": "초시계 값",
                "color": "#3D3D3D"
            },
            {
                "type": "Text",
                "text": " ",
                "color": "#3D3D3D"
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null ]
        },
        "func": function (sprite, script) {
            return Entry.container.inputValue.getValue();
        },
        "syntax": {"js": [], "py": [""]}
    },
    "get_project_timer_value": {
        "color": "#FFD974",
        "vimModeFontColor": "black",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_get_timer_value,
                "color": "#3D3D3D"
            },
            {
                "type": "Text",
                "text": "",
                "color": "#3D3D3D"
            }
        ],
        "events": {
            "viewAdd": [
                function() {
                    if (Entry.engine) Entry.engine.showProjectTimer();
                }
            ],
            "viewDestroy": [
                function(block) {
                    if (Entry.engine) Entry.engine.hideProjectTimer(block);
                }
            ]
        },
        "def": {
            "params": [ null, null ],
            "type": "get_project_timer_value"
        },
        "class": "calc_timer",
        "isNotFor": [],
        "func": function (sprite, script) {
            return Entry.engine.projectTimer.getValue();
        },
        "syntax": {"js": [], "py": ["Entry.value_of_timer()"]}
    },
    "char_at": {
        "color": "#FFD974",
        "vimModeFontColor": "black",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_char_at_1,
                "color": "#3D3D3D"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_char_at_2,
                "color": "#3D3D3D"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_char_at_3,
                "color": "#3D3D3D"
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                {
                    "type": "text",
                    "params": [ Lang.Blocks.hi_entry ]
                },
                null,
                {
                    "type": "number",
                    "params": [ "1" ]
                },
                null
            ],
            "type": "char_at"
        },
        "paramsKeyMap": {
            "LEFTHAND": 1,
            "RIGHTHAND": 3
        },
        "class": "calc_string",
        "isNotFor": [],
        "func": function (sprite, script) {
            var str = script.getStringValue("LEFTHAND", script);
            var index = script.getNumberValue("RIGHTHAND", script)-1;
            if (index <0 || index >str.length-1)
                throw new Error();
            else
                return str[index];
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "%2\[%4\]",
                textParams: [
                    {
                        "type": "Text",
                        "text": Lang.Blocks.CALC_char_at_1,
                        "color": "#3D3D3D"
                    },
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    {
                        "type": "Text",
                        "text": Lang.Blocks.CALC_char_at_2,
                        "color": "#3D3D3D"
                    },
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    {
                        "type": "Text",
                        "text": Lang.Blocks.CALC_char_at_3,
                        "color": "#3D3D3D"
                    }   
                ],
                keyOption: "char_at"
            }
        ]}
    },
    "length_of_string": {
        "color": "#FFD974",
        "vimModeFontColor": "black",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_length_of_string_1,
                "color": "#3D3D3D"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_length_of_string_2,
                "color": "#3D3D3D"
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                {
                    "type": "text",
                    "params": [ Lang.Blocks.entry ]
                },
                null
            ],
            "type": "length_of_string"
        },
        "paramsKeyMap": {
            "STRING": 1
        },
        "class": "calc_string",
        "isNotFor": [],
        "func": function (sprite, script) {
            return script.getStringValue("STRING", script).length;
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "len(%2)",
                keyOption: "length_of_string"
            }
        ]}
    },
    "substring": {
        "color": "#FFD974",
        "vimModeFontColor": "black",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_substring_1,
                "color": "#3D3D3D"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_substring_2,
                "color": "#3D3D3D"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_substring_3,
                "color": "#3D3D3D"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_substring_4,
                "color": "#3D3D3D"
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                {
                    "type": "text",
                    "params": [ Lang.Blocks.hi_entry ]
                },
                null,
                {
                    "type": "number",
                    "params": [ "2" ]
                },
                null,
                {
                    "type": "number",
                    "params": [ "5" ]
                },
                null
            ],
            "type": "substring"
        },
        "paramsKeyMap": {
            "STRING": 1,
            "START": 3,
            "END": 5
        },
        "class": "calc_string",
        "isNotFor": [],
        "func": function (sprite, script) {
            var str = script.getStringValue("STRING", script);
            var start = script.getNumberValue("START", script)-1;
            var end = script.getNumberValue("END", script)-1;
            var strLen = str.length-1;
            if (start <0 || end<0 || start>strLen || end>strLen)
                throw new Error();
            else
                return str.substring(Math.min(start, end), Math.max(start, end)+1);
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "%2\[%4:%6\]"
            }
        ]}
    },
    "replace_string": {
        "color": "#FFD974",
        "vimModeFontColor": "black",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_replace_string_1,
                "color": "#3D3D3D"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_replace_string_2,
                "color": "#3D3D3D"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_replace_string_3,
                "color": "#3D3D3D"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_replace_string_4,
                "color": "#3D3D3D"
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                {
                    "type": "text",
                    "params": [ Lang.Blocks.hi_entry ]
                },
                null,
                {
                    "type": "text",
                    "params": [ Lang.Blocks.hello ]
                },
                null,
                {
                    "type": "text",
                    "params": [ Lang.Blocks.nice ]
                },
                null
            ],
            "type": "replace_string"
        },
        "paramsKeyMap": {
            "STRING": 1,
            "OLD_WORD": 3,
            "NEW_WORD": 5
        },
        "class": "calc_string",
        "isNotFor": [],
        "func": function (sprite, script) {
            return script.getStringValue("STRING", script).
                replace(
                    new RegExp(script.getStringValue("OLD_WORD", script), 'gm'),
                    script.getStringValue("NEW_WORD", script)
                );
        },
        "syntax": {"js": [], "py": ["%2.replace(%4, %6)"]}
    },
    "change_string_case": {
        "color": "#FFD974",
        "vimModeFontColor": "black",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_change_string_case_1,
                "color": "#3D3D3D"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_change_string_case_2,
                "color": "#3D3D3D"
            },
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.CALC_change_string_case_sub_1,"toUpperCase"],
                    [Lang.Blocks.CALC_change_string_case_sub_2,"toLowerCase"]
                ],
                "value": "toUpperCase",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_CALC
            },
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_change_string_case_3,
                "color": "#3D3D3D"
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                {
                    "type": "text",
                    "params": [ "Hello Entry!" ]
                },
                null,
                null,
                null
            ],
            "type": "change_string_case"
        },
        "paramsKeyMap": {
            "STRING": 1,
            "CASE": 3
        },
        "class": "calc_string",
        "isNotFor": [],
        "func": function (sprite, script) {
            return script.getStringValue("STRING", script)[script.getField("CASE", script)]();
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "%2.upper()",
                params: [null,null,null,"toUpperCase",null],
                textParams: [
                    undefined,
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    undefined,
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.CALC_change_string_case_sub_1,"toUpperCase"],
                            [Lang.Blocks.CALC_change_string_case_sub_2,"toLowerCase"]
                        ],
                        "value": "toUpperCase",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_CALC,
                        converter: Entry.block.converters.returnStringValue
                    },
                ]
            },
            {
                syntax: "%2.lower()",
                params: [null,null,null,"toLowerCase",null],
                textParams: [
                    undefined,
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    undefined,
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.CALC_change_string_case_sub_1,"toUpperCase"],
                            [Lang.Blocks.CALC_change_string_case_sub_2,"toLowerCase"]
                        ],
                        "value": "toUpperCase",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_CALC,
                        converter: Entry.block.converters.returnStringValue
                    },
                ]
            }
        ]}
    },
    "index_of_string": {
        "color": "#FFD974",
        "vimModeFontColor": "black",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_index_of_string_1,
                "color": "#3D3D3D"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_index_of_string_2,
                "color": "#3D3D3D"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_index_of_string_3,
                "color": "#3D3D3D"
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                {
                    "type": "text",
                    "params": [ Lang.Blocks.hi_entry ]
                },
                null,
                {
                    "type": "text",
                    "params": [ Lang.Blocks.entry ]
                },
                null
            ],
            "type": "index_of_string"
        },
        "paramsKeyMap": {
            "LEFTHAND": 1,
            "RIGHTHAND": 3
        },
        "class": "calc_string",
        "isNotFor": [],
        "func": function (sprite, script) {
            var str = script.getStringValue("LEFTHAND", script);
            var target = script.getStringValue("RIGHTHAND", script);
            var index = str.indexOf(target);
            return index > -1 ? index + 1 : 0;
        },
        "syntax": {"js": [], "py": ["%2.find(%4)"]}
    },
    "combine_something": {
        "color": "#FFD974",
        "vimModeFontColor": "black",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Text",
                "text": Lang.Blocks.VARIABLE_combine_something_1,
                "color": "#3D3D3D"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Text",
                "text": Lang.Blocks.VARIABLE_combine_something_2,
                "color": "#3D3D3D"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Text",
                "text": Lang.Blocks.VARIABLE_combine_something_3,
                "color": "#3D3D3D"
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                {
                    "type": "text",
                    "params": [ Lang.Blocks.block_hi ]
                },
                null,
                {
                    "type": "text",
                    "params": [ Lang.Blocks.entry ]
                },
                null
            ],
            "type": "combine_something"
        },
        "paramsKeyMap": {
            "VALUE1": 1,
            "VALUE2": 3
        },
        "class": "calc_string",
        "isNotFor": [],
        "func": function (sprite, script) {
            var leftValue = script.getStringValue("VALUE1", script);
            var rightValue = script.getStringValue("VALUE2", script);

            return leftValue + rightValue;
        },
        "syntax": {"js": [], "py": ["(%2 + %4)"]}
    },
    "get_sound_volume": {
        "color": "#FFD974",
        "vimModeFontColor": "black",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_get_sound_volume,
                "color": "#3D3D3D"
            },
            {
                "type": "Text",
                "text": "",
                "color": "#3D3D3D"
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null ],
            "type": "get_sound_volume"
        },
        "class": "calc",
        "isNotFor": [
            ""
        ],
        "func": function (sprite, script) {
            return createjs.Sound.getVolume() * 100;
        },
        "syntax": {"js": [], "py": ["Entry.value_of_sound_volume()"]}
    },
    "quotient_and_mod": {
        "color": "#FFD974",
        "vimModeFontColor": "black",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_quotient_and_mod_1,
                "color": "#3D3D3D"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_quotient_and_mod_2,
                "color": "#3D3D3D"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_quotient_and_mod_3,
                "color": "#3D3D3D"
            },
            {
                "type": "Dropdown",
                "options": [
                      [Lang.Blocks.CALC_quotient_and_mod_sub_1,"QUOTIENT"],
                      [Lang.Blocks.CALC_quotient_and_mod_sub_2,"MOD"]
                ],
                "value": "QUOTIENT",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_CALC
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                {
                    "type": "text",
                    "params": [ "10" ]
                },
                null,
                {
                    "type": "text",
                    "params": [ "10" ]
                },
                null,
                null
            ],
            "type": "quotient_and_mod"
        },
        "paramsKeyMap": {
            "LEFTHAND": 1,
            "RIGHTHAND": 3,
            "OPERATOR": 5
        },
        "class": "calc",
        "isNotFor": [],
        "func": function (sprite, script) {
            var left = script.getNumberValue("LEFTHAND", script);
            var right = script.getNumberValue("RIGHTHAND", script);
            if (isNaN(left) || isNaN(right))
                throw new Error();
            var operator = script.getField("OPERATOR", script);
            if (operator == 'QUOTIENT')
                return Math.floor(left/right);
            else
                return left % right;
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "(%2 // %4)",
                params: [null,null,null,null,null,"QUOTIENT"],
                textParams: [
                    undefined,
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    undefined,
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    undefined,
                    {
                        "type": "Dropdown",
                        "options": [
                              [Lang.Blocks.CALC_quotient_and_mod_sub_1,"QUOTIENT"],
                              [Lang.Blocks.CALC_quotient_and_mod_sub_2,"MOD"]
                        ],
                        "value": "QUOTIENT",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_CALC,
                        converter: Entry.block.converters.returnStringValue
                    }
                ]
            },
            {
                syntax: "(%2 % %4)",
                params: [null,null,null,null,null,"MOD"],
                textParams: [
                    undefined,
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    undefined,
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    undefined,
                    {
                        "type": "Dropdown",
                        "options": [
                              [Lang.Blocks.CALC_quotient_and_mod_sub_1,"QUOTIENT"],
                              [Lang.Blocks.CALC_quotient_and_mod_sub_2,"MOD"]
                        ],
                        "value": "QUOTIENT",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_CALC,
                        converter: Entry.block.converters.returnStringValue
                    }
                ]
            }
        ]}
    },
    "choose_project_timer_action": {
        "color": "#FFD974",
        "vimModeFontColor": "black",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_choose_project_timer_action_1,
                "color": "#3D3D3D"
            },
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.CALC_choose_project_timer_action_sub_1,"START"],
                    [Lang.Blocks.CALC_choose_project_timer_action_sub_2,"STOP"],
                    [Lang.Blocks.CALC_choose_project_timer_action_sub_3,"RESET"]
                ],
                "value": "START",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_CALC
            },
            {
                "type": "Text",
                "text": Lang.Blocks.CALC_choose_project_timer_action_2,
                "color": "#3D3D3D"
            },
            {
                "type": "Indicator",
                "img": "block_icon/calc_01.png",
                "size": 12
            }
        ],
        "events": {
            "viewAdd": [
                function() {
                    if (Entry.engine) Entry.engine.showProjectTimer();
                }
            ],
            "dataDestroy": [
                function(block) {
                    if (Entry.engine) Entry.engine.hideProjectTimer(block);
                }
            ]
        },
        "def": {
            "params": [
                null,
                "START",
                null,
                null
            ],
            "type": "choose_project_timer_action"
        },
        "paramsKeyMap": {
            "ACTION": 1
        },
        "class": "calc_timer",
        "isNotFor": [],
        "func": function (sprite, script) {
            var action = script.getField('ACTION');
            var engine = Entry.engine;
            var timer = engine.projectTimer;

            if (action == 'START') {
                if (!timer.isInit) {
                    engine.startProjectTimer();
                }
                else if (timer.isInit && timer.isPaused) {
                    if (timer.pauseStart)
                        timer.pausedTime += (new Date()).getTime() - timer.pauseStart;
                    delete timer.pauseStart;
                    timer.isPaused = false;
                }
            } else if (action == 'STOP') {
                if (timer.isInit && !timer.isPaused) {
                    timer.isPaused = true;
                    timer.pauseStart = (new Date()).getTime();
                }
            } else if (action == 'RESET') {
                if (timer.isInit) {
                    timer.setValue(0);
                    timer.start = (new Date()).getTime();
                    timer.pausedTime = 0;
                    delete timer.pauseStart;
                }

            }
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Entry.timer(%2)",
                textParams: [
                    undefined,
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.CALC_choose_project_timer_action_sub_1,"START"],
                            [Lang.Blocks.CALC_choose_project_timer_action_sub_2,"STOP"],
                            [Lang.Blocks.CALC_choose_project_timer_action_sub_3,"RESET"]
                        ],
                        "value": "START",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_CALC,
                        converter: Entry.block.converters.returnStringValue
                    },
                ]
            }
        ]}
    },
    "wait_second": {
        "color": "#498deb",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/flow_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "number",
                    "params": [ "2" ]
                },
                null
            ],
            "type": "wait_second"
        },
        "paramsKeyMap": {
            "SECOND": 0
        },
        "class": "delay",
        "isNotFor": [],
        "func": function (sprite, script) {
            if (!script.isStart) {
                script.isStart = true;
                script.timeFlag = 1;
                var timeValue = script.getNumberValue("SECOND", script);
                var fps = Entry.FPS || 60;
                timeValue = 60/fps*timeValue*1000;
                setTimeout(function() {
                    script.timeFlag = 0;
                }, timeValue);
                return script;
            } else if (script.timeFlag == 1) {
                return script;
            } else {
                delete script.timeFlag;
                delete script.isStart;
                Entry.engine.isContinue = false;
                return script.callReturn();
            }
        },
        "syntax": {"js": [], "py": ["Entry.wait_for_sec(%1)"]}
    },
    "repeat_basic": {
        "color": "#498deb",
        "skeleton": "basic_loop",
        "statements": [
            {
                "accept": "basic"
            }
        ],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/flow_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "number",
                    "params": [ "10" ]
                },
                null
            ],
            "type": "repeat_basic"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "statementsKeyMap": {
            "DO": 0
        },
        "class": "repeat",
        "isNotFor": [],
        "func": function (sprite, script) {
            var iterNumber;
            if (!script.isLooped) {
                script.isLooped = true;
                var iterNumber = script.getNumberValue("VALUE", script);
                if(iterNumber < 0) throw new Error(Lang.Blocks.FLOW_repeat_basic_errorMsg);
                script.iterCount = Math.floor(iterNumber);
            }
            if (script.iterCount != 0 && !(script.iterCount < 0)) {
                script.iterCount--;
                return script.getStatement("DO", script);
            } else {
                delete script.isLooped;
                delete script.iterCount;
                return script.callReturn();
            }
        },
        "syntax": {"js": [], "py": [
            {syntax: "for i in range(%1):\n$1", template: "for i in range(%1):"}
        ]}
    },
    "repeat_inf": {
        "color": "#498deb",
        "skeleton": "basic_loop",
        "statements": [
            {
                "accept": "basic"
            }
        ],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/flow_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "repeat_inf"
        },
        "statementsKeyMap": {
            "DO": 0
        },
        "class": "repeat",
        "isNotFor": [],
        "func": function (sprite, script) {
            //return script.getStatement("DO", script);
            script.isLooped = true;
            return script.getStatement('DO');
        },
        "syntax": {"js": [], "py": [
            {syntax: "while True:\n$1", template: "while True:"}
        ]}
    },
    "stop_repeat": {
        "color": "#498deb",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/flow_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                null
            ],
            "type": "stop_repeat"
        },
        "class": "repeat",
        "isNotFor": [],
        "func": function (sprite, script) {
            return this.executor.breakLoop();
        },
        "syntax": {"js": [], "py": ["break"]}
    },
    "wait_until_true": {
        "color": "#498deb",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "boolean"
            },
            {
                "type": "Indicator",
                "img": "block_icon/flow_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "True"
                },
                null
            ],
            "type": "wait_until_true"
        },
        "paramsKeyMap": {
            "BOOL": 0
        },
        "class": "wait",
        "isNotFor": [],
        "func": function (sprite, script) {
            var value = script.getBooleanValue("BOOL", script);
            if (value) {
                return script.callReturn();
            } else {
                return script;
            }
        },
        "syntax": {"js": [], "py": ["Entry.wait_until(%1)"]}
    },
    "_if": {
        "color": "#498deb",
        "skeleton": "basic_loop",
        "statements": [
            {
                "accept": "basic"
            }
        ],
        "params": [
            {
                "type": "Block",
                "accept": "boolean"
            },
            {
                "type": "Indicator",
                "img": "block_icon/flow_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "True"
                },
                null
            ],
            "type": "_if"
        },
        "paramsKeyMap": {
            "BOOL": 0
        },
        "statementsKeyMap": {
            "STACK": 0
        },
        "class": "condition",
        "isNotFor": [],
        "func": function (sprite, script) {
            if (script.isCondition) {
                delete script.isCondition;
                return script.callReturn();
            }
            var value = script.getBooleanValue("BOOL", script);
            if (value) {
                script.isCondition = true;
                return script.getStatement("STACK", script);
            } else {
                return script.callReturn();
            }
        },
        "syntax": {"js": [], "py": [
            {syntax: "if %1:\n$1", template: "if %1:"}
        ]}
    },
    "if_else": {
        "color": "#498deb",
        "skeleton": "basic_double_loop",
        "statements": [
            {
                "accept": "basic"
            },
            {
                "accept": "basic"
            }
        ],
        "params": [
            {
                "type": "Block",
                "accept": "boolean"
            },
            {
                "type": "Indicator",
                "img": "block_icon/flow_03.png",
                "size": 12
            },
            {
                "type": "LineBreak"
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "True"
                },
                null
            ],
            "type": "if_else"
        },
        "paramsKeyMap": {
            "BOOL": 0
        },
        "statementsKeyMap": {
            "STACK_IF": 0,
            "STACK_ELSE": 1
        },
        "class": "condition",
        "isNotFor": [],
        "func": function (sprite, script) {
            if (script.isCondition) {
                delete script.isCondition;
                return script.callReturn();
            }
            var value = script.getBooleanValue("BOOL", script);
            script.isCondition = true;
            if (value)
                return script.getStatement("STACK_IF", script);
            else
                return script.getStatement("STACK_ELSE", script);
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "if %1:\n$1\nelse:\n$2",
                template: "if %1: %3 else:",
                textParams: [
                    {
                        "type": "Block",
                        "accept": "boolean"
                    },
                    undefined,
                    {
                        "type": "LineBreak"
                    }
                ]
            }
        ]}
    },
    "create_clone": {
        "color": "#498deb",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "DropdownDynamic",
                "value": null,
                "menuName": "clone",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_FLOW
            },
            {
                "type": "Indicator",
                "img": "block_icon/flow_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null ],
            "type": "create_clone"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "clone",
        "isNotFor": [],
        "func": function (sprite, script) {
            var targetSpriteId = script.getField("VALUE", script);
            var returnBlock = script.callReturn();
            if (targetSpriteId == "self")
                sprite.parent.addCloneEntity(sprite.parent, sprite, null);
            else {
                var object = Entry.container.getObject(targetSpriteId);
                object.addCloneEntity(sprite.parent, null, null);
            }
            return returnBlock;
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Entry.make_clone_of(%1)",
                textParams: [
                    {
                        "type": "DropdownDynamic",
                        "value": null,
                        "menuName": "clone",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_FLOW,
                        converter: Entry.block.converters.returnStringKey
                    },
                ]
            }
        ]}
    },
    "delete_clone": {
        "color": "#498deb",
        "skeleton": "basic_without_next",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/flow_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "delete_clone"
        },
        "class": "clone",
        "isNotFor": [],
        "func": function (sprite, script) {
            if (!sprite.isClone)
                return script.callReturn();
            sprite.removeClone();
            return this.die();
        },
        "syntax": {"js": [], "py": ["Entry.remove_this_clone()"]}
    },
    "when_clone_start": {
        "color": "#498deb",
        "skeleton": "basic_event",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/start_icon_clone.png",
                "size": 17,
                "position": {
                    "x": 0,
                    "y": -2
                }
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "when_clone_start"
        },
        "class": "clone",
        "isNotFor": [],
        "func": function (sprite, script) {
            return script.callReturn();
        },
        "event": "when_clone_start",
        "syntax": {"js": [], "py": ["def when_make_clone():"]}
    },
    "stop_run": {
        "color": "#498deb",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/flow_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null ]
        },
        "func": function (sprite, script) {
            return Entry.engine.toggleStop();
        },
        "syntax": {"js": [], "py": [""]}
    },
    "repeat_while_true": {
        "color": "#498deb",
        "skeleton": "basic_loop",
        "statements": [
            {
                "accept": "basic"
            }
        ],
        "params": [
            {
                "type": "Block",
                "accept": "boolean"
            },
            {
                "type": "Dropdown",
                "options": [
                    [ Lang.Blocks.FLOW_repeat_while_true_until, "until" ],
                    [ Lang.Blocks.FLOW_repeat_while_true_while, "while" ]
                ],
                "value": "until",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_FLOW
            },
            {
                "type": "Indicator",
                "img": "block_icon/flow_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "True"
                },
                null,
                null
            ],
            "type": "repeat_while_true"
        },
        "paramsKeyMap": {
            "BOOL": 0,
            "OPTION": 1
        },
        "statementsKeyMap": {
            "DO": 0
        },
        "class": "repeat",
        "isNotFor": [],
        "func": function (sprite, script) {
            var value = script.getBooleanValue("BOOL", script);

            if (script.getField("OPTION", script) == 'until')
                value = !value;
            script.isLooped = value;

            return value ? script.getStatement("DO", script) :
                script.callReturn();
        },
        "syntax": {"js": [], "py": [
            {syntax: "while %1 %2:\n$1", template: "while %1 %2:"}
        ]}
    },
    "stop_object": {
        "color": "#498deb",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ Lang.Blocks.FLOW_stop_object_all, "all" ],
                    [ Lang.Blocks.FLOW_stop_object_this_object, "thisOnly" ],
                    [ Lang.Blocks.FLOW_stop_object_this_thread, "thisThread" ],
                    [ Lang.Blocks.FLOW_stop_object_other_thread, "otherThread" ]
                ],
                "value": "all",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_FLOW
            },
            {
                "type": "Indicator",
                "img": "block_icon/flow_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null ],
            "type": "stop_object"
        },
        "paramsKeyMap": {
            "TARGET": 0
        },
        "class": "terminate",
        "isNotFor": [],
        "func": function (sprite, script) {
            var target = script.getField("TARGET", script);
            var container = Entry.container;

            switch(target) {
                case 'all':
                    container.mapObject(function(obj) {
                        obj.script.clearExecutors();
                    }, null);
                    return this.die();
                case 'thisOnly':
                    sprite.parent.script.clearExecutorsByEntity(sprite);
                    return this.die();
                case 'thisObject':
                    sprite.parent.script.clearExecutors();
                return this.die();
                case 'thisThread':
                    return this.die();
                case 'otherThread':
                    var executor = this.executor;
                    var code = sprite.parent.script;
                    var executors = code.executors;

                    for (var i = 0 ; i < executors.length; i++) {
                        var currentExecutor = executors[i];
                        if (currentExecutor !== executor) {
                            code.removeExecutor(currentExecutor);
                            --i;
                        }
                    }
                    return script.callReturn();
            }
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Entry.stop_code(%1)",
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [ Lang.Blocks.FLOW_stop_object_all, "all" ],
                            [ Lang.Blocks.FLOW_stop_object_this_object, "thisOnly" ],
                            [ Lang.Blocks.FLOW_stop_object_this_thread, "thisThread" ],
                            [ Lang.Blocks.FLOW_stop_object_other_thread, "otherThread" ]
                        ],
                        "value": "all",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_FLOW,
                        converter: Entry.block.converters.returnStringValue,
                        codeMap: "Entry.CodeMap.Entry.stop_code[0]"
                    }
                ]
            }
        ]}
    },
    "restart_project": {
        "color": "#498deb",
        "skeleton": "basic_without_next",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/flow_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "restart_project"
        },
        "class": "terminate",
        "isNotFor": [],
        "func": function (sprite, script) {
            Entry.engine.toggleStop();
            Entry.engine.toggleRun();
        },
        "syntax": {"js": [], "py": ["Entry.start_again()"]}
    },
    "remove_all_clones": {
        "color": "#498deb",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/flow_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "remove_all_clones"
        },
        "class": "clone",
        "isNotFor": [],
        "func": function (sprite, script) {
            var clonedEntities = sprite.parent.getClonedEntities();
            clonedEntities.map(function (entity) {
                entity.removeClone();
            });
            clonedEntities = null;

            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Entry.remove_all_clone()"]}
    },
    "functionAddButton": {
        "skeleton": "basic_button",
        "color": "#eee",
        "isNotFor": [
            "functionInit",
            "textMode"
        ],
        "params": [
            {
                "type": "Text",
                "text": Lang.Workspace.function_create,
                "color": "#333",
                "align": "center"
            }
        ],
        "events": {
            "mousedown": [
                function() {
                    Entry.variableContainer.createFunction();
                }
            ]
        }
    },
    "function_field_label": {
        "skeleton": "basic_param",
        "isNotFor": [ "functionEdit" ],
        "color": "#f9c535",
        "params": [
            {
                "type": "TextInput",
                "value": Lang.Blocks.FUNCTION_explanation_1
            },
            {
                "type": "Output",
                "accept": "param"
            }
        ],
        paramsKeyMap:{
            NAME: 0,
            NEXT: 1
        },
        "def": {
            "params": [ "이름" ],
            "type": "function_field_label"
        },
        //"syntax": {"js": [], "py": ["%1function_field_label#"]}
        "syntax": {"js": [], "py": ["name"]}
    },
    "function_field_string": {
        "skeleton": "basic_param",
        "isNotFor": [ "functionEdit" ],
        "color": "#ffd974",
        "params": [
            {
                "type": "Block",
                "accept": "string",
                "restore": true
            },
            {
                "type": "Output",
                "accept": "param"
            }
        ],
        paramsKeyMap:{
            PARAM: 0,
            NEXT: 1
        },
        "def": {
            "params": [
                {
                    "type": "text",
                    "params": [ "문자/숫자값" ]
                }
            ],
            "type": "function_field_string"
        },
        //"syntax": {"js": [], "py": ["%1function_field_string#"]}
        "syntax": {"js": [], "py": ["value"]}
    },
    "function_field_boolean": {
        "skeleton": "basic_param",
        "isNotFor": [ "functionEdit" ],
        "color": "#aeb8ff",
        "params": [
            {
                "type": "Block",
                "accept": "boolean",
                "restore": true
            },
            {
                "type": "Output",
                "accept": "param"
            }
        ],
        paramsKeyMap:{
            PARAM: 0,
            NEXT: 1
        },
        "def": {
            "params": [
                {
                    "type": "True",
                    "params": [ "판단값" ]
                }
            ],
            "type": "function_field_boolean"
        },
        //"syntax": {"js": [], "py": ["%1function_field_boolean#"]}
        "syntax": {"js": [], "py": ["boolean"]}
    },
    "function_param_string": {
        "skeleton": "basic_string_field",
        "color": "#ffd974",
        "template": "%1 %2",
        "events": {
            "viewAdd": [
                function() {
                    Entry.Func.refreshMenuCode();
                }
            ]
        },
        func: function() {
            return this.executor.register.params[this.executor.register.paramMap[this.block.type]];
        },
        "syntax": {"js": [], "py": [""]}
    },
    "function_param_boolean": {
        "skeleton": "basic_boolean_field",
        "color": "#aeb8ff",
        "template": "%1 %2",
        "events": {
            "viewAdd": [
                function() {
                    Entry.Func.refreshMenuCode();
                }
            ]
        },
        func: function() {
            return this.executor.register.params[this.executor.register.paramMap[this.block.type]];
        },
        "syntax": {"js": [], "py": [""]}
    },
    "function_create": {
        "skeleton": "basic_create",
        "color": "#cc7337",
        "event": "funcDef",
        "params": [
            {
                "type": "Block",
                "accept": "param",
                "value": {
                    "type": "function_field_label",
                    "params": [Lang.Blocks.FUNC]
                }
            },
            {
                "type": "Indicator",
                "img": "block_icon/function_03.png",
                "size": 12
            }
        ],
        paramsKeyMap:{
            FIELD: 0
        },
        func: function() {
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "%1", 
                keyOption: "function_create"
            }
        ]}
    },
    "function_general": {
        "skeleton": "basic",
        "color": "#cc7337",
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/function_03.png",
                "size": 12
            }
        ],
        "events": {
            "dataAdd": [
                function(block) {
                    var vc = Entry.variableContainer;
                    if (vc) vc.addRef('_functionRefs', block);
                }
            ],
            "dataDestroy": [
                function(block) {
                    var vc = Entry.variableContainer;
                    if (vc) vc.removeRef('_functionRefs', block);
                }
            ],
            "dblclick": [
                function(blockView) {
                    var mode = blockView.getBoard().workspace.getMode();
                    if (mode !== Entry.Workspace.MODE_BOARD) return;
                    if (Entry.type !== "workspace") return;
                    var block = blockView.block;
                    var id = block.type.substr(5);
                    Entry.Func.edit(Entry.variableContainer.functions_[id]);
                }
            ]
        },
        func: function(entity) {
            if (!this.initiated) {
                this.initiated = true;

                var func = Entry.variableContainer.getFunction(
                    this.block.type.substr(5, 9)
                );
                this.funcCode = func.content;
                this.funcExecutor = this.funcCode.raiseEvent("funcDef", entity)[0];
                this.funcExecutor.register.params = this.getParams();
                var paramMap = {};
                this.funcExecutor.register.paramMap = func.paramMap;
            }
            this.funcExecutor.execute();
            if (!this.funcExecutor.isEnd()) {
                this.funcCode.removeExecutor(this.funcExecutor);
                return Entry.STATIC.BREAK;
            }
        },
        "syntax": {"js": [], "py": [""]}
    },
    "hamster_hand_found": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_boolean_field",
        "statements": [],
        "params": [],
        "events": {},
        "def": {
            "params": [],
            "type": "hamster_hand_found"
        },
        "class": "hamster_sensor",
        "isNotFor": [ "hamster" ],
        "func": function (sprite, script) {
            var pd = Entry.hw.portData;
            return pd.leftProximity > 50 || pd.rightProximity > 50;
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Hamster.hand_found()"
            }
        ]}
    },
    "hamster_value": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.HAMSTER_sensor_left_proximity, "leftProximity"],
                    [Lang.Blocks.HAMSTER_sensor_right_proximity, "rightProximity"],
                    [Lang.Blocks.HAMSTER_sensor_left_floor, "leftFloor"],
                    [Lang.Blocks.HAMSTER_sensor_right_floor, "rightFloor"],
                    [Lang.Blocks.HAMSTER_sensor_acceleration_x, "accelerationX"],
                    [Lang.Blocks.HAMSTER_sensor_acceleration_y, "accelerationY"],
                    [Lang.Blocks.HAMSTER_sensor_acceleration_z, "accelerationZ"],
                    [Lang.Blocks.HAMSTER_sensor_light, "light"],
                    [Lang.Blocks.HAMSTER_sensor_temperature, "temperature"],
                    [Lang.Blocks.HAMSTER_sensor_signal_strength, "signalStrength"],
                    [Lang.Blocks.HAMSTER_sensor_input_a, "inputA"],
                    [Lang.Blocks.HAMSTER_sensor_input_b, "inputB"]
                ],
                "value": "leftProximity",
                "fontSize": 11
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "hamster_value"
        },
        "paramsKeyMap": {
            "DEVICE": 0
        },
        "class": "hamster_sensor",
        "isNotFor": [ "hamster" ],
        "func": function (sprite, script) {
            var pd = Entry.hw.portData;
            var dev = script.getField('DEVICE');
            return pd[dev];
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Hamster.left_proximity()",
                textParams:[
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_sensor_left_proximity, "leftProximity"],
                            [Lang.Blocks.HAMSTER_sensor_right_proximity, "rightProximity"],
                            [Lang.Blocks.HAMSTER_sensor_left_floor, "leftFloor"],
                            [Lang.Blocks.HAMSTER_sensor_right_floor, "rightFloor"],
                            [Lang.Blocks.HAMSTER_sensor_acceleration_x, "accelerationX"],
                            [Lang.Blocks.HAMSTER_sensor_acceleration_y, "accelerationY"],
                            [Lang.Blocks.HAMSTER_sensor_acceleration_z, "accelerationZ"],
                            [Lang.Blocks.HAMSTER_sensor_light, "light"],
                            [Lang.Blocks.HAMSTER_sensor_temperature, "temperature"],
                            [Lang.Blocks.HAMSTER_sensor_signal_strength, "signalStrength"],
                            [Lang.Blocks.HAMSTER_sensor_input_a, "inputA"],
                            [Lang.Blocks.HAMSTER_sensor_input_b, "inputB"]
                        ],
                        "value": "leftProximity",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    }
                ],
                params: ["leftProximity"]
            },
            {
                syntax: "Hamster.right_proximity()", 
                textParams:[
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_sensor_left_proximity, "leftProximity"],
                            [Lang.Blocks.HAMSTER_sensor_right_proximity, "rightProximity"],
                            [Lang.Blocks.HAMSTER_sensor_left_floor, "leftFloor"],
                            [Lang.Blocks.HAMSTER_sensor_right_floor, "rightFloor"],
                            [Lang.Blocks.HAMSTER_sensor_acceleration_x, "accelerationX"],
                            [Lang.Blocks.HAMSTER_sensor_acceleration_y, "accelerationY"],
                            [Lang.Blocks.HAMSTER_sensor_acceleration_z, "accelerationZ"],
                            [Lang.Blocks.HAMSTER_sensor_light, "light"],
                            [Lang.Blocks.HAMSTER_sensor_temperature, "temperature"],
                            [Lang.Blocks.HAMSTER_sensor_signal_strength, "signalStrength"],
                            [Lang.Blocks.HAMSTER_sensor_input_a, "inputA"],
                            [Lang.Blocks.HAMSTER_sensor_input_b, "inputB"]
                        ],
                        "value": "leftProximity",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    }
                ],
                params: ["rightProximity"]
            },
            {
                syntax: "Hamster.left_floor()", 
                textParams:[
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_sensor_left_proximity, "leftProximity"],
                            [Lang.Blocks.HAMSTER_sensor_right_proximity, "rightProximity"],
                            [Lang.Blocks.HAMSTER_sensor_left_floor, "leftFloor"],
                            [Lang.Blocks.HAMSTER_sensor_right_floor, "rightFloor"],
                            [Lang.Blocks.HAMSTER_sensor_acceleration_x, "accelerationX"],
                            [Lang.Blocks.HAMSTER_sensor_acceleration_y, "accelerationY"],
                            [Lang.Blocks.HAMSTER_sensor_acceleration_z, "accelerationZ"],
                            [Lang.Blocks.HAMSTER_sensor_light, "light"],
                            [Lang.Blocks.HAMSTER_sensor_temperature, "temperature"],
                            [Lang.Blocks.HAMSTER_sensor_signal_strength, "signalStrength"],
                            [Lang.Blocks.HAMSTER_sensor_input_a, "inputA"],
                            [Lang.Blocks.HAMSTER_sensor_input_b, "inputB"]
                        ],
                        "value": "leftProximity",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    }
                ],
                params: ["leftFloor"]
            },
            {
                syntax: "Hamster.right_floor()", 
                textParams:[
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_sensor_left_proximity, "leftProximity"],
                            [Lang.Blocks.HAMSTER_sensor_right_proximity, "rightProximity"],
                            [Lang.Blocks.HAMSTER_sensor_left_floor, "leftFloor"],
                            [Lang.Blocks.HAMSTER_sensor_right_floor, "rightFloor"],
                            [Lang.Blocks.HAMSTER_sensor_acceleration_x, "accelerationX"],
                            [Lang.Blocks.HAMSTER_sensor_acceleration_y, "accelerationY"],
                            [Lang.Blocks.HAMSTER_sensor_acceleration_z, "accelerationZ"],
                            [Lang.Blocks.HAMSTER_sensor_light, "light"],
                            [Lang.Blocks.HAMSTER_sensor_temperature, "temperature"],
                            [Lang.Blocks.HAMSTER_sensor_signal_strength, "signalStrength"],
                            [Lang.Blocks.HAMSTER_sensor_input_a, "inputA"],
                            [Lang.Blocks.HAMSTER_sensor_input_b, "inputB"]
                        ],
                        "value": "leftProximity",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    }
                ],
                params: ["rightFloor"]
            },
            {
                syntax: "Hamster.acceleration_x()", 
                textParams:[
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_sensor_left_proximity, "leftProximity"],
                            [Lang.Blocks.HAMSTER_sensor_right_proximity, "rightProximity"],
                            [Lang.Blocks.HAMSTER_sensor_left_floor, "leftFloor"],
                            [Lang.Blocks.HAMSTER_sensor_right_floor, "rightFloor"],
                            [Lang.Blocks.HAMSTER_sensor_acceleration_x, "accelerationX"],
                            [Lang.Blocks.HAMSTER_sensor_acceleration_y, "accelerationY"],
                            [Lang.Blocks.HAMSTER_sensor_acceleration_z, "accelerationZ"],
                            [Lang.Blocks.HAMSTER_sensor_light, "light"],
                            [Lang.Blocks.HAMSTER_sensor_temperature, "temperature"],
                            [Lang.Blocks.HAMSTER_sensor_signal_strength, "signalStrength"],
                            [Lang.Blocks.HAMSTER_sensor_input_a, "inputA"],
                            [Lang.Blocks.HAMSTER_sensor_input_b, "inputB"]
                        ],
                        "value": "leftProximity",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    }
                ],
                params: ["accelerationX"]
            },
            {
                syntax: "Hamster.acceleration_y()", 
                textParams:[
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_sensor_left_proximity, "leftProximity"],
                            [Lang.Blocks.HAMSTER_sensor_right_proximity, "rightProximity"],
                            [Lang.Blocks.HAMSTER_sensor_left_floor, "leftFloor"],
                            [Lang.Blocks.HAMSTER_sensor_right_floor, "rightFloor"],
                            [Lang.Blocks.HAMSTER_sensor_acceleration_x, "accelerationX"],
                            [Lang.Blocks.HAMSTER_sensor_acceleration_y, "accelerationY"],
                            [Lang.Blocks.HAMSTER_sensor_acceleration_z, "accelerationZ"],
                            [Lang.Blocks.HAMSTER_sensor_light, "light"],
                            [Lang.Blocks.HAMSTER_sensor_temperature, "temperature"],
                            [Lang.Blocks.HAMSTER_sensor_signal_strength, "signalStrength"],
                            [Lang.Blocks.HAMSTER_sensor_input_a, "inputA"],
                            [Lang.Blocks.HAMSTER_sensor_input_b, "inputB"]
                        ],
                        "value": "leftProximity",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    }
                ],
                params: ["accelerationY"]
            },
            {
                syntax: "Hamster.acceleration_z()", 
                textParams:[
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_sensor_left_proximity, "leftProximity"],
                            [Lang.Blocks.HAMSTER_sensor_right_proximity, "rightProximity"],
                            [Lang.Blocks.HAMSTER_sensor_left_floor, "leftFloor"],
                            [Lang.Blocks.HAMSTER_sensor_right_floor, "rightFloor"],
                            [Lang.Blocks.HAMSTER_sensor_acceleration_x, "accelerationX"],
                            [Lang.Blocks.HAMSTER_sensor_acceleration_y, "accelerationY"],
                            [Lang.Blocks.HAMSTER_sensor_acceleration_z, "accelerationZ"],
                            [Lang.Blocks.HAMSTER_sensor_light, "light"],
                            [Lang.Blocks.HAMSTER_sensor_temperature, "temperature"],
                            [Lang.Blocks.HAMSTER_sensor_signal_strength, "signalStrength"],
                            [Lang.Blocks.HAMSTER_sensor_input_a, "inputA"],
                            [Lang.Blocks.HAMSTER_sensor_input_b, "inputB"]
                        ],
                        "value": "leftProximity",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    }
                ],
                params: ["accelerationZ"]
            },
            {
                syntax: "Hamster.light()", 
                textParams:[
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_sensor_left_proximity, "leftProximity"],
                            [Lang.Blocks.HAMSTER_sensor_right_proximity, "rightProximity"],
                            [Lang.Blocks.HAMSTER_sensor_left_floor, "leftFloor"],
                            [Lang.Blocks.HAMSTER_sensor_right_floor, "rightFloor"],
                            [Lang.Blocks.HAMSTER_sensor_acceleration_x, "accelerationX"],
                            [Lang.Blocks.HAMSTER_sensor_acceleration_y, "accelerationY"],
                            [Lang.Blocks.HAMSTER_sensor_acceleration_z, "accelerationZ"],
                            [Lang.Blocks.HAMSTER_sensor_light, "light"],
                            [Lang.Blocks.HAMSTER_sensor_temperature, "temperature"],
                            [Lang.Blocks.HAMSTER_sensor_signal_strength, "signalStrength"],
                            [Lang.Blocks.HAMSTER_sensor_input_a, "inputA"],
                            [Lang.Blocks.HAMSTER_sensor_input_b, "inputB"]
                        ],
                        "value": "leftProximity",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    }
                ],
                params: ["light"]
            },
            {
                syntax: "Hamster.temperature()", 
                textParams:[
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_sensor_left_proximity, "leftProximity"],
                            [Lang.Blocks.HAMSTER_sensor_right_proximity, "rightProximity"],
                            [Lang.Blocks.HAMSTER_sensor_left_floor, "leftFloor"],
                            [Lang.Blocks.HAMSTER_sensor_right_floor, "rightFloor"],
                            [Lang.Blocks.HAMSTER_sensor_acceleration_x, "accelerationX"],
                            [Lang.Blocks.HAMSTER_sensor_acceleration_y, "accelerationY"],
                            [Lang.Blocks.HAMSTER_sensor_acceleration_z, "accelerationZ"],
                            [Lang.Blocks.HAMSTER_sensor_light, "light"],
                            [Lang.Blocks.HAMSTER_sensor_temperature, "temperature"],
                            [Lang.Blocks.HAMSTER_sensor_signal_strength, "signalStrength"],
                            [Lang.Blocks.HAMSTER_sensor_input_a, "inputA"],
                            [Lang.Blocks.HAMSTER_sensor_input_b, "inputB"]
                        ],
                        "value": "leftProximity",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    }
                ],
                params: ["temperature"]
            },
            {
                syntax: "Hamster.signal_strength()", 
                textParams:[
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_sensor_left_proximity, "leftProximity"],
                            [Lang.Blocks.HAMSTER_sensor_right_proximity, "rightProximity"],
                            [Lang.Blocks.HAMSTER_sensor_left_floor, "leftFloor"],
                            [Lang.Blocks.HAMSTER_sensor_right_floor, "rightFloor"],
                            [Lang.Blocks.HAMSTER_sensor_acceleration_x, "accelerationX"],
                            [Lang.Blocks.HAMSTER_sensor_acceleration_y, "accelerationY"],
                            [Lang.Blocks.HAMSTER_sensor_acceleration_z, "accelerationZ"],
                            [Lang.Blocks.HAMSTER_sensor_light, "light"],
                            [Lang.Blocks.HAMSTER_sensor_temperature, "temperature"],
                            [Lang.Blocks.HAMSTER_sensor_signal_strength, "signalStrength"],
                            [Lang.Blocks.HAMSTER_sensor_input_a, "inputA"],
                            [Lang.Blocks.HAMSTER_sensor_input_b, "inputB"]
                        ],
                        "value": "leftProximity",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    }
                ],
                params: ["signalStrength"]
            },
            {
                syntax: "Hamster.input_a()", 
                textParams:[
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_sensor_left_proximity, "leftProximity"],
                            [Lang.Blocks.HAMSTER_sensor_right_proximity, "rightProximity"],
                            [Lang.Blocks.HAMSTER_sensor_left_floor, "leftFloor"],
                            [Lang.Blocks.HAMSTER_sensor_right_floor, "rightFloor"],
                            [Lang.Blocks.HAMSTER_sensor_acceleration_x, "accelerationX"],
                            [Lang.Blocks.HAMSTER_sensor_acceleration_y, "accelerationY"],
                            [Lang.Blocks.HAMSTER_sensor_acceleration_z, "accelerationZ"],
                            [Lang.Blocks.HAMSTER_sensor_light, "light"],
                            [Lang.Blocks.HAMSTER_sensor_temperature, "temperature"],
                            [Lang.Blocks.HAMSTER_sensor_signal_strength, "signalStrength"],
                            [Lang.Blocks.HAMSTER_sensor_input_a, "inputA"],
                            [Lang.Blocks.HAMSTER_sensor_input_b, "inputB"]
                        ],
                        "value": "leftProximity",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    }
                ],
                params: ["inputA"]
            },
            {
                syntax: "Hamster.input_b()", 
                textParams:[
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_sensor_left_proximity, "leftProximity"],
                            [Lang.Blocks.HAMSTER_sensor_right_proximity, "rightProximity"],
                            [Lang.Blocks.HAMSTER_sensor_left_floor, "leftFloor"],
                            [Lang.Blocks.HAMSTER_sensor_right_floor, "rightFloor"],
                            [Lang.Blocks.HAMSTER_sensor_acceleration_x, "accelerationX"],
                            [Lang.Blocks.HAMSTER_sensor_acceleration_y, "accelerationY"],
                            [Lang.Blocks.HAMSTER_sensor_acceleration_z, "accelerationZ"],
                            [Lang.Blocks.HAMSTER_sensor_light, "light"],
                            [Lang.Blocks.HAMSTER_sensor_temperature, "temperature"],
                            [Lang.Blocks.HAMSTER_sensor_signal_strength, "signalStrength"],
                            [Lang.Blocks.HAMSTER_sensor_input_a, "inputA"],
                            [Lang.Blocks.HAMSTER_sensor_input_b, "inputB"]
                        ],
                        "value": "leftProximity",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    }
                ],
                params: ["inputB"]
            }
        ]}
    },
    "hamster_move_forward_once": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "hamster_move_forward_once"
        },
        "class": "hamster_board",
        "isNotFor": [ "hamster" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            var pd = Entry.hw.portData;
            if (!script.isStart) {
                script.isStart = true;
                script.isMoving = true;
                script.count = 0;
                script.boardState = 1;
                sq.leftWheel = 45;
                sq.rightWheel = 45;
                Entry.Hamster.setLineTracerMode(sq, 0);
                return script;
            } else if (script.isMoving) {
                switch(script.boardState) {
                    case 1: {
                        if(script.count < 2) {
                            if(pd.leftFloor < 50 && pd.rightFloor < 50)
                                script.count ++;
                            else
                                script.count = 0;
                            var diff = pd.leftFloor - pd.rightFloor;
                            sq.leftWheel = 45 + diff * 0.25;
                            sq.rightWheel = 45 - diff * 0.25;
                        } else {
                            script.count = 0;
                            script.boardState = 2;
                        }
                        break;
                    }
                case 2: {
                    var diff = pd.leftFloor - pd.rightFloor;
                    sq.leftWheel = 45 + diff * 0.25;
                    sq.rightWheel = 45 - diff * 0.25;
                    script.boardState = 3;
                    var timer = setTimeout(function() {
                        script.boardState = 4;
                        Entry.Hamster.removeTimeout(timer);
                    }, 250);
                    Entry.Hamster.timeouts.push(timer);
                    break;
                }
            case 3: {
                var diff = pd.leftFloor - pd.rightFloor;
                sq.leftWheel = 45 + diff * 0.25;
                sq.rightWheel = 45 - diff * 0.25;
                break;
            }
        case 4: {
            sq.leftWheel = 0;
            sq.rightWheel = 0;
            script.boardState = 0;
            script.isMoving = false;
            break;
        }
                }
                return script;
            } else {
                delete script.isStart;
                delete script.isMoving;
                delete script.count;
                delete script.boardState;
                Entry.engine.isContinue = false;
                sq.leftWheel = 0;
                sq.rightWheel = 0;
                return script.callReturn();
            }
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Hamster.move_forward()"
            }
        ]}
    },
    "hamster_turn_once": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.HAMSTER_turn_once_left,"LEFT"],
                    [Lang.Blocks.HAMSTER_turn_right,"RIGHT"]
                ],
                "value": "LEFT",
                "fontSize": 11
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null ],
            "type": "hamster_turn_once"
        },
        "paramsKeyMap": {
            "DIRECTION": 0
        },
        "class": "hamster_board",
        "isNotFor": [ "hamster" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            var pd = Entry.hw.portData;
            if (!script.isStart) {
                script.isStart = true;
                script.isMoving = true;
                script.count = 0;
                script.boardState = 1;
                var direction = script.getField("DIRECTION", script);
                if (direction == 'LEFT') {
                    script.isLeft = true;
                    sq.leftWheel = -45;
                    sq.rightWheel = 45;
                } else {
                    script.isLeft = false;
                    sq.leftWheel = 45;
                    sq.rightWheel = -45;
                }
                Entry.Hamster.setLineTracerMode(sq, 0);
                return script;
            } else if (script.isMoving) {
                if(script.isLeft) {
                    switch(script.boardState) {
                        case 1: {
                            if(script.count < 2) {
                                if(pd.leftFloor > 50)
                                    script.count ++;
                            } else {
                                script.count = 0;
                                script.boardState = 2;
                            }
                            break;
                        }
                    case 2: {
                        if(pd.leftFloor < 20) {
                            script.boardState = 3;
                        }
                        break;
                    }
                case 3: {
                    if(script.count < 2) {
                        if(pd.leftFloor < 20)
                            script.count ++;
                    } else {
                        script.count = 0;
                        script.boardState = 4;
                    }
                    break;
                }
            case 4: {
                if(pd.leftFloor > 50) {
                    script.boardState = 5;
                }
                break;
            }
        case 5: {
            var diff = pd.leftFloor - pd.rightFloor;
            if(diff > -15) {
                sq.leftWheel = 0;
                sq.rightWheel = 0;
                script.boardState = 0;
                script.isMoving = false;
            } else {
                sq.leftWheel = diff * 0.5;
                sq.rightWheel = -diff * 0.5;
            }
            break;
        }
                    }
                } else {
                    switch(script.boardState) {
                        case 1: {
                            if(script.count < 2) {
                                if(pd.rightFloor > 50)
                                    script.count ++;
                            } else {
                                script.count = 0;
                                script.boardState = 2;
                            }
                            break;
                        }
                    case 2: {
                        if(pd.rightFloor < 20) {
                            script.boardState = 3;
                        }
                        break;
                    }
                case 3: {
                    if(script.count < 2) {
                        if(pd.rightFloor < 20)
                            script.count ++;
                    } else {
                        script.count = 0;
                        script.boardState = 4;
                    }
                    break;
                }
            case 4: {
                if(pd.rightFloor > 50) {
                    script.boardState = 5;
                }
                break;
            }
        case 5: {
            var diff = pd.rightFloor - pd.leftFloor;
            if(diff > -15) {
                sq.leftWheel = 0;
                sq.rightWheel = 0;
                script.boardState = 0;
                script.isMoving = false;
            } else {
                sq.leftWheel = -diff * 0.5;
                sq.rightWheel = diff * 0.5;
            }
            break;
        }
                    }
                }
                return script;
            } else {
                delete script.isStart;
                delete script.isMoving;
                delete script.count;
                delete script.boardState;
                delete script.isLeft;
                Entry.engine.isContinue = false;
                sq.leftWheel = 0;
                sq.rightWheel = 0;
                return script.callReturn();
            }
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Hamster.board_left()",  
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_turn_once_left,"LEFT"],
                            [Lang.Blocks.HAMSTER_turn_right,"RIGHT"]
                        ],
                        "value": "LEFT",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue,
                    }
                ],
                params: ["LEFT"]
            },
            {
                syntax: "Hamster.board_right()", 
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_turn_once_left,"LEFT"],
                            [Lang.Blocks.HAMSTER_turn_right,"RIGHT"]
                        ],
                        "value": "LEFT",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    }
                ],
                params: ["RIGHT"]
            }
        ]}
    },
    "hamster_move_forward_for_secs": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "text",
                    "params": [ "1" ]
                },
                null
            ],
            "type": "hamster_move_forward_for_secs"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "hamster_wheel",
        "isNotFor": [ "hamster" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            if (!script.isStart) {
                script.isStart = true;
                script.timeFlag = 1;
                sq.leftWheel = 30;
                sq.rightWheel = 30;
                Entry.Hamster.setLineTracerMode(sq, 0);
                var timeValue = script.getNumberValue("VALUE") * 1000;
                var timer = setTimeout(function() {
                    script.timeFlag = 0;
                    Entry.Hamster.removeTimeout(timer);
                }, timeValue);
                Entry.Hamster.timeouts.push(timer);
                return script;
            } else if (script.timeFlag == 1) {
                return script;
            } else {
                delete script.isStart;
                delete script.timeFlag;
                Entry.engine.isContinue = false;
                sq.leftWheel = 0;
                sq.rightWheel = 0;
                return script.callReturn();
            }
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Hamster.move_forward(%1)",
                textParams: [
                    {
                        "type": "Block",
                        "accept": "string"
                    }
                ]
            }
        ]}
    },
    "hamster_move_backward_for_secs": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "text",
                    "params": [ "1" ]
                },
                null
            ],
            "type": "hamster_move_backward_for_secs"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "hamster_wheel",
        "isNotFor": [ "hamster" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            if (!script.isStart) {
                script.isStart = true;
                script.timeFlag = 1;
                sq.leftWheel = -30;
                sq.rightWheel = -30;
                Entry.Hamster.setLineTracerMode(sq, 0);
                var timeValue = script.getNumberValue("VALUE") * 1000;
                var timer = setTimeout(function() {
                    script.timeFlag = 0;
                    Entry.Hamster.removeTimeout(timer);
                }, timeValue);
                Entry.Hamster.timeouts.push(timer);
                return script;
            } else if (script.timeFlag == 1) {
                return script;
            } else {
                delete script.isStart;
                delete script.timeFlag;
                Entry.engine.isContinue = false;
                sq.leftWheel = 0;
                sq.rightWheel = 0;
                return script.callReturn();
            }
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Hamster.move_backward(%1)",
                textParams: [
                            {
                        "type": "Block",
                        "accept": "string"
                    }
                ]
            }
        ]}
    },
    "hamster_turn_for_secs": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.HAMSTER_turn_once_left,"LEFT"],
                    [Lang.Blocks.HAMSTER_turn_right,"RIGHT"]
                ],
                "value": "LEFT",
                "fontSize": 11
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                {
                    "type": "text",
                    "params": [ "1" ]
                },
                null
            ],
            "type": "hamster_turn_for_secs"
        },
        "paramsKeyMap": {
            "DIRECTION": 0,
            "VALUE": 1
        },
        "class": "hamster_wheel",
        "isNotFor": [ "hamster" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            if (!script.isStart) {
                script.isStart = true;
                script.timeFlag = 1;
                var direction = script.getField("DIRECTION", script);
                if (direction == 'LEFT') {
                    sq.leftWheel = -30;
                    sq.rightWheel = 30;
                } else {
                    sq.leftWheel = 30;
                    sq.rightWheel = -30;
                }
                Entry.Hamster.setLineTracerMode(sq, 0);
                var timeValue = script.getNumberValue("VALUE") * 1000;
                var timer = setTimeout(function() {
                    script.timeFlag = 0;
                    Entry.Hamster.removeTimeout(timer);
                }, timeValue);
                Entry.Hamster.timeouts.push(timer);
                return script;
            } else if (script.timeFlag == 1) {
                return script;
            } else {
                delete script.isStart;
                delete script.timeFlag;
                Entry.engine.isContinue = false;
                sq.leftWheel = 0;
                sq.rightWheel = 0;
                return script.callReturn();
            }
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Hamster.turn_left(%2)", 
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_turn_once_left,"LEFT"],
                            [Lang.Blocks.HAMSTER_turn_right,"RIGHT"]
                        ],
                        "value": "LEFT",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue,
                    },
                    {
                        "type": "Block",
                        "accept": "string"
                    }
                ],
                params: ["LEFT"]
            },
            {
                syntax: "Hamster.turn_right(%2)", 
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_turn_once_left,"LEFT"],
                            [Lang.Blocks.HAMSTER_turn_right,"RIGHT"]
                        ],
                        "value": "LEFT",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    },
                    {
                        "type": "Block",
                        "accept": "string"
                    }
                ],
                params: ["RIGHT"]
            }
        ]}
    },
    "hamster_change_both_wheels_by": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "text",
                    "params": [ "10" ]
                },
                {
                    "type": "text",
                    "params": [ "10" ]
                },
                null
            ],
            "type": "hamster_change_both_wheels_by"
        },
        "paramsKeyMap": {
            "LEFT": 0,
            "RIGHT": 1
        },
        "class": "hamster_wheel",
        "isNotFor": [ "hamster" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            var left = script.getNumberValue('LEFT');
            var right = script.getNumberValue('RIGHT');
            sq.leftWheel = sq.leftWheel != undefined ? sq.leftWheel + left : left;
            sq.rightWheel = sq.rightWheel != undefined ? sq.rightWheel + right : right;
            Entry.Hamster.setLineTracerMode(sq, 0);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Hamster.wheels_by(%1, %2)",
                textParams: [
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    {
                        "type": "Block",
                        "accept": "string"
                    }
                ]
            }
        ]}
    },
    "hamster_set_both_wheels_to": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "text",
                    "params": [ "30" ]
                },
                {
                    "type": "text",
                    "params": [ "30" ]
                },
                null
            ],
            "type": "hamster_set_both_wheels_to"
        },
        "paramsKeyMap": {
            "LEFT": 0,
            "RIGHT": 1
        },
        "class": "hamster_wheel",
        "isNotFor": [ "hamster" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            sq.leftWheel = script.getNumberValue('LEFT');
            sq.rightWheel = script.getNumberValue('RIGHT');
            Entry.Hamster.setLineTracerMode(sq, 0);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Hamster.wheels(%1, %2)",
                textParams: [
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    {
                        "type": "Block",
                        "accept": "string"
                    }
                ]
            }
        ]}
    },
    "hamster_change_wheel_by": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.HAMSTER_left_wheel,"LEFT"],
                    [Lang.Blocks.HAMSTER_right_wheel,"RIGHT"],
                    [Lang.Blocks.HAMSTER_both_wheels,"BOTH"]
                ],
                "value": "LEFT",
                "fontSize": 11
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                {
                    "type": "text",
                    "params": [ "10" ]
                },
                null
            ],
            "type": "hamster_change_wheel_by"
        },
        "paramsKeyMap": {
            "DIRECTION": 0,
            "VALUE": 1
        },
        "class": "hamster_wheel",
        "isNotFor": [ "hamster" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            var direction = script.getField('DIRECTION');
            var value = script.getNumberValue('VALUE');
            if (direction == 'LEFT') {
                sq.leftWheel = sq.leftWheel != undefined ? sq.leftWheel + value : value;
            } else if (direction == 'RIGHT') {
                sq.rightWheel = sq.rightWheel != undefined ? sq.rightWheel + value : value;
            } else {
                sq.leftWheel = sq.leftWheel != undefined ? sq.leftWheel + value : value;
                sq.rightWheel = sq.rightWheel != undefined ? sq.rightWheel + value : value;
            }
            Entry.Hamster.setLineTracerMode(sq, 0);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Hamster.left_wheel_by(%2)", 
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_left_wheel,"LEFT"],
                            [Lang.Blocks.HAMSTER_right_wheel,"RIGHT"],
                            [Lang.Blocks.HAMSTER_both_wheels,"BOTH"]
                        ],
                        "value": "LEFT",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    },
                    {
                        "type": "Block",
                        "accept": "string"
                    }
                ],
                params: ["LEFT"]
            },
            {
                syntax: "Hamster.right_wheel_by(%2)", 
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_left_wheel,"LEFT"],
                            [Lang.Blocks.HAMSTER_right_wheel,"RIGHT"],
                            [Lang.Blocks.HAMSTER_both_wheels,"BOTH"]
                        ],
                        "value": "LEFT",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    },
                    {
                        "type": "Block",
                        "accept": "string"
                    }
                ],
                params: ["RIGHT"]
            },
            {
                syntax: "Hamster.wheels_by(%2)", 
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_left_wheel,"LEFT"],
                            [Lang.Blocks.HAMSTER_right_wheel,"RIGHT"],
                            [Lang.Blocks.HAMSTER_both_wheels,"BOTH"]
                        ],
                        "value": "LEFT",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    },
                    {
                        "type": "Block",
                        "accept": "string"
                    }
                ],
                params: ["BOTH"], 
                keyOption: "SAME"
            }
        ]}
    },
    "hamster_set_wheel_to": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.HAMSTER_left_wheel,"LEFT"],
                    [Lang.Blocks.HAMSTER_right_wheel,"RIGHT"],
                    [Lang.Blocks.HAMSTER_both_wheels,"BOTH"]
                ],
                "value": "LEFT",
                "fontSize": 11
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                {
                    "type": "text",
                    "params": [ "30" ]
                },
                null
            ],
            "type": "hamster_set_wheel_to"
        },
        "paramsKeyMap": {
            "DIRECTION": 0,
            "VALUE": 1
        },
        "class": "hamster_wheel",
        "isNotFor": [ "hamster" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            var direction = script.getField('DIRECTION');
            var value = script.getNumberValue('VALUE');
            if (direction == 'LEFT') {
                sq.leftWheel = value;
            } else if (direction == 'RIGHT') {
                sq.rightWheel = value;
            } else {
                sq.leftWheel = value;
                sq.rightWheel = value;
            }
            Entry.Hamster.setLineTracerMode(sq, 0);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Hamster.left_wheel(%2)", 
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_left_wheel,"LEFT"],
                            [Lang.Blocks.HAMSTER_right_wheel,"RIGHT"],
                            [Lang.Blocks.HAMSTER_both_wheels,"BOTH"]
                        ],
                        "value": "LEFT",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    },
                    {
                        "type": "Block",
                        "accept": "string"
                    }
                ],
                params: ["LEFT"]
            },
            {
                syntax: "Hamster.right_wheel(%2)", 
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_left_wheel,"LEFT"],
                            [Lang.Blocks.HAMSTER_right_wheel,"RIGHT"],
                            [Lang.Blocks.HAMSTER_both_wheels,"BOTH"]
                        ],
                        "value": "LEFT",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    },
                    {
                        "type": "Block",
                        "accept": "string"
                    }
                ],
                params: ["RIGHT"]
            },
            {
                syntax: "Hamster.wheels(%2)",
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_left_wheel,"LEFT"],
                            [Lang.Blocks.HAMSTER_right_wheel,"RIGHT"],
                            [Lang.Blocks.HAMSTER_both_wheels,"BOTH"]
                        ],
                        "value": "LEFT",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    },
                    {
                        "type": "Block",
                        "accept": "string"
                    }
                ], 
                params: ["BOTH"], 
                keyOption: "SAME"
            }
        ]}
    },
    "hamster_follow_line_using": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.HAMSTER_color_black,"BLACK"],
                    [Lang.Blocks.HAMSTER_color_white,"WHITE"]
                ],
                "value": "BLACK",
                "fontSize": 11
            },
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.HAMSTER_left_floor_sensor,"LEFT"],
                    [Lang.Blocks.HAMSTER_right_floor_sensor,"RIGHT"],
                    [Lang.Blocks.HAMSTER_both_floor_sensors,"BOTH"]
                ],
                "value": "LEFT",
                "fontSize": 11
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null, null ],
            "type": "hamster_follow_line_using"
        },
        "paramsKeyMap": {
            "COLOR": 0,
            "DIRECTION": 1
        },
        "class": "hamster_wheel",
        "isNotFor": [ "hamster" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            var color = script.getField('COLOR');
            var direction = script.getField('DIRECTION');

            var mode = 1;
            if (direction == 'RIGHT') mode = 2;
            else if (direction == 'BOTH') mode = 3;
            if (color == 'WHITE') mode += 7;

            sq.leftWheel = 0;
            sq.rightWheel = 0;
            Entry.Hamster.setLineTracerMode(sq, mode);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Hamster.line_tracer_mode(Hamster.LINE_TRACER_MODE_BLACK_LEFT_SENSOR)", 
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_color_black,"BLACK"],
                            [Lang.Blocks.HAMSTER_color_white,"WHITE"]
                        ],
                        "value": "BLACK",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    },
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_left_floor_sensor,"LEFT"],
                            [Lang.Blocks.HAMSTER_right_floor_sensor,"RIGHT"],
                            [Lang.Blocks.HAMSTER_both_floor_sensors,"BOTH"]
                        ],
                        "value": "LEFT",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    }
                ],
                params: ["BLACK", "LEFT"]
            },
            {
                syntax: "Hamster.line_tracer_mode(Hamster.LINE_TRACER_MODE_WHITE_LEFT_SENSOR)", 
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_color_black,"BLACK"],
                            [Lang.Blocks.HAMSTER_color_white,"WHITE"]
                        ],
                        "value": "BLACK",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    },
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_left_floor_sensor,"LEFT"],
                            [Lang.Blocks.HAMSTER_right_floor_sensor,"RIGHT"],
                            [Lang.Blocks.HAMSTER_both_floor_sensors,"BOTH"]
                        ],
                        "value": "LEFT",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    }
                ],
                params: ["WHITE", "LEFT"]
            },
            {
                syntax: "Hamster.line_tracer_mode(Hamster.LINE_TRACER_MODE_BLACK_RIGHT_SENSOR)", 
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_color_black,"BLACK"],
                            [Lang.Blocks.HAMSTER_color_white,"WHITE"]
                        ],
                        "value": "BLACK",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    },
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_left_floor_sensor,"LEFT"],
                            [Lang.Blocks.HAMSTER_right_floor_sensor,"RIGHT"],
                            [Lang.Blocks.HAMSTER_both_floor_sensors,"BOTH"]
                        ],
                        "value": "LEFT",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    }
                ],
                params: ["BLACK", "RIGHT"]
            },
            {
                syntax: "Hamster.line_tracer_mode(Hamster.LINE_TRACER_MODE_BLACK_BOTH_SENSORS)", 
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_color_black,"BLACK"],
                            [Lang.Blocks.HAMSTER_color_white,"WHITE"]
                        ],
                        "value": "BLACK",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    },
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_left_floor_sensor,"LEFT"],
                            [Lang.Blocks.HAMSTER_right_floor_sensor,"RIGHT"],
                            [Lang.Blocks.HAMSTER_both_floor_sensors,"BOTH"]
                        ],
                        "value": "LEFT",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    }
                ],
                params: ["BLACK", "BOTH"]
            }

        ]}
    },
    "hamster_follow_line_until": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.HAMSTER_color_black,"BLACK"],
                    [Lang.Blocks.HAMSTER_color_white,"WHITE"]
                ],
                "value": "BLACK",
                "fontSize": 11
            },
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.HAMSTER_left_floor_sensor,"LEFT"],
                    [Lang.Blocks.HAMSTER_right_floor_sensor,"RIGHT"],
                    [Lang.Blocks.HAMSTER_front,"FRONT"],
                    [Lang.Blocks.HAMSTER_rear,"REAR"]
                ],
                "value": "LEFT",
                "fontSize": 11
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null, null ],
            "type": "hamster_follow_line_until"
        },
        "paramsKeyMap": {
            "COLOR": 0,
            "DIRECTION": 1
        },
        "class": "hamster_wheel",
        "isNotFor": [ "hamster" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            var pd = Entry.hw.portData;
            var color = script.getField('COLOR');
            var direction = script.getField('DIRECTION');

            var mode = 4;
            if (direction == 'RIGHT') mode = 5;
            else if (direction == 'FRONT') mode = 6;
            else if (direction == 'REAR') mode = 7;
            if (color == 'WHITE') mode += 7;

            if (!script.isStart) {
                script.isStart = true;
                sq.leftWheel = 0;
                sq.rightWheel = 0;
                Entry.Hamster.setLineTracerMode(sq, mode);
                return script;
            } else {
                var hamster = Entry.Hamster;
                if (pd.lineTracerStateId != hamster.lineTracerStateId) {
                    hamster.lineTracerStateId = pd.lineTracerStateId;
                    if (pd.lineTracerState == 0x40) {
                        delete script.isStart;
                        Entry.engine.isContinue = false;
                        hamster.setLineTracerMode(sq, 0);
                        return script.callReturn();
                    }
                }
                return script;
            }
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Hamster.line_tracer_mode(Hamster.LINE_TRACER_MODE_BLACK_TURN_LEFT)", 
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_color_black,"BLACK"],
                            [Lang.Blocks.HAMSTER_color_white,"WHITE"]
                        ],
                        "value": "BLACK",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    },
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_left_floor_sensor,"LEFT"],
                            [Lang.Blocks.HAMSTER_right_floor_sensor,"RIGHT"],
                            [Lang.Blocks.HAMSTER_front,"FRONT"],
                            [Lang.Blocks.HAMSTER_rear,"REAR"]
                        ],
                        "value": "LEFT",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    },
                ],
                params: ["BLACK", "LEFT"]
            },
            {
                syntax: "Hamster.line_tracer_mode(Hamster.LINE_TRACER_MODE_WHITE_TURN_LEFT)", 
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_color_black,"BLACK"],
                            [Lang.Blocks.HAMSTER_color_white,"WHITE"]
                        ],
                        "value": "BLACK",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    },
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_left_floor_sensor,"LEFT"],
                            [Lang.Blocks.HAMSTER_right_floor_sensor,"RIGHT"],
                            [Lang.Blocks.HAMSTER_front,"FRONT"],
                            [Lang.Blocks.HAMSTER_rear,"REAR"]
                        ],
                        "value": "LEFT",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    },
                ],
                params: ["WHITE", "LEFT"]
            },
            {
                syntax: "Hamster.line_tracer_mode(Hamster.LINE_TRACER_MODE_BLACK_TURN_RIGHT)", 
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_color_black,"BLACK"],
                            [Lang.Blocks.HAMSTER_color_white,"WHITE"]
                        ],
                        "value": "BLACK",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    },
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_left_floor_sensor,"LEFT"],
                            [Lang.Blocks.HAMSTER_right_floor_sensor,"RIGHT"],
                            [Lang.Blocks.HAMSTER_front,"FRONT"],
                            [Lang.Blocks.HAMSTER_rear,"REAR"]
                        ],
                        "value": "LEFT",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    },
                ],
                params: ["BLACK", "RIGHT"]
            },
            {
                syntax: "Hamster.line_tracer_mode(Hamster.LINE_TRACER_MODE_BLACK_MOVE_FORWARD)", 
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_color_black,"BLACK"],
                            [Lang.Blocks.HAMSTER_color_white,"WHITE"]
                        ],
                        "value": "BLACK",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    },
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_left_floor_sensor,"LEFT"],
                            [Lang.Blocks.HAMSTER_right_floor_sensor,"RIGHT"],
                            [Lang.Blocks.HAMSTER_front,"FRONT"],
                            [Lang.Blocks.HAMSTER_rear,"REAR"]
                        ],
                        "value": "LEFT",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    },
                ],
                params: ["BLACK", "FRONT"]
            },
            {
                syntax: "Hamster.line_tracer_mode(Hamster.LINE_TRACER_MODE_BLACK_UTURN)", 
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_color_black,"BLACK"],
                            [Lang.Blocks.HAMSTER_color_white,"WHITE"]
                        ],
                        "value": "BLACK",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    },
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_left_floor_sensor,"LEFT"],
                            [Lang.Blocks.HAMSTER_right_floor_sensor,"RIGHT"],
                            [Lang.Blocks.HAMSTER_front,"FRONT"],
                            [Lang.Blocks.HAMSTER_rear,"REAR"]
                        ],
                        "value": "LEFT",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    },
                ],
                params: ["BLACK", "REAR"]
            }
        ]}
    },
    "hamster_set_following_speed_to": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ "1", "1" ],
                    [ "2", "2" ],
                    [ "3", "3" ],
                    [ "4", "4" ],
                    [ "5", "5" ],
                    [ "6", "6" ],
                    [ "7", "7" ],
                    [ "8", "8" ]
                ],
                "value": "1",
                "fontSize": 11
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ "5", null ],
            "type": "hamster_set_following_speed_to"
        },
        "paramsKeyMap": {
            "SPEED": 0
        },
        "class": "hamster_wheel",
        "isNotFor": [ "hamster" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            sq.lineTracerSpeed = Number(script.getField("SPEED", script));
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Hamster.line_tracer_speed(%1)",
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [ "1", "1" ],
                            [ "2", "2" ],
                            [ "3", "3" ],
                            [ "4", "4" ],
                            [ "5", "5" ],
                            [ "6", "6" ],
                            [ "7", "7" ],
                            [ "8", "8" ]
                        ],
                        "value": "1",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringOrNumberByValue
                    }
                ]
            }
        ]}
    },
    "hamster_stop": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "hamster_stop"
        },
        "class": "hamster_wheel",
        "isNotFor": [ "hamster" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            sq.leftWheel = 0;
            sq.rightWheel = 0;
            Entry.Hamster.setLineTracerMode(sq, 0);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Hamster.stop()"
            }

        ]}
    },
    "hamster_set_led_to": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.HAMSTER_left_led,"LEFT"],
                    [Lang.Blocks.HAMSTER_right_led,"RIGHT"],
                    [Lang.Blocks.HAMSTER_both_leds,"BOTH"]
                ],
                "value": "LEFT",
                "fontSize": 11
            },
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.HAMSTER_color_red,"4"],
                    [Lang.Blocks.HAMSTER_color_yellow,"6"],
                    [Lang.Blocks.HAMSTER_color_green,"2"],
                    [Lang.Blocks.HAMSTER_color_cyan,"3"],
                    [Lang.Blocks.HAMSTER_color_blue,"1"],
                    [Lang.Blocks.HAMSTER_color_magenta,"5"],
                    [Lang.Blocks.HAMSTER_color_white,"7"]
                ],
                "value": "4",
                "fontSize": 11
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null, null ],
            "type": "hamster_set_led_to"
        },
        "paramsKeyMap": {
            "DIRECTION": 0,
            "COLOR": 1
        },
        "class": "hamster_led",
        "isNotFor": [ "hamster" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            var direction = script.getField("DIRECTION", script);
            var color = Number(script.getField("COLOR", script));
            if (direction == 'LEFT') {
                sq.leftLed = color;
            } else if (direction == 'RIGHT') {
                sq.rightLed = color;
            } else {
                sq.leftLed = color;
                sq.rightLed = color;
            }
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Hamster.left_led(Hamster.LED_RED)", 
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_left_led,"LEFT"],
                            [Lang.Blocks.HAMSTER_right_led,"RIGHT"],
                            [Lang.Blocks.HAMSTER_both_leds,"BOTH"]
                        ],
                        "value": "LEFT",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    },
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_color_red,"4"],
                            [Lang.Blocks.HAMSTER_color_yellow,"6"],
                            [Lang.Blocks.HAMSTER_color_green,"2"],
                            [Lang.Blocks.HAMSTER_color_cyan,"3"],
                            [Lang.Blocks.HAMSTER_color_blue,"1"],
                            [Lang.Blocks.HAMSTER_color_magenta,"5"],
                            [Lang.Blocks.HAMSTER_color_white,"7"]
                        ],
                        "value": "4",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    }
                ],
                params: ["LEFT", "4"]
            },
            {
                syntax: "Hamster.right_led(Hamster.LED_RED)", 
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_left_led,"LEFT"],
                            [Lang.Blocks.HAMSTER_right_led,"RIGHT"],
                            [Lang.Blocks.HAMSTER_both_leds,"BOTH"]
                        ],
                        "value": "LEFT",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    },
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_color_red,"4"],
                            [Lang.Blocks.HAMSTER_color_yellow,"6"],
                            [Lang.Blocks.HAMSTER_color_green,"2"],
                            [Lang.Blocks.HAMSTER_color_cyan,"3"],
                            [Lang.Blocks.HAMSTER_color_blue,"1"],
                            [Lang.Blocks.HAMSTER_color_magenta,"5"],
                            [Lang.Blocks.HAMSTER_color_white,"7"]
                        ],
                        "value": "4",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    }
                ],
                params: ["RIGHT", "4"]
            },
            {
                syntax: "Hamster.leds(Hamster.LED_RED)", 
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_left_led,"LEFT"],
                            [Lang.Blocks.HAMSTER_right_led,"RIGHT"],
                            [Lang.Blocks.HAMSTER_both_leds,"BOTH"]
                        ],
                        "value": "LEFT",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    },
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_color_red,"4"],
                            [Lang.Blocks.HAMSTER_color_yellow,"6"],
                            [Lang.Blocks.HAMSTER_color_green,"2"],
                            [Lang.Blocks.HAMSTER_color_cyan,"3"],
                            [Lang.Blocks.HAMSTER_color_blue,"1"],
                            [Lang.Blocks.HAMSTER_color_magenta,"5"],
                            [Lang.Blocks.HAMSTER_color_white,"7"]
                        ],
                        "value": "4",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    }
                ],
                params: ["BOTH", "4"]
            },
            {
                syntax: "Hamster.left_led(Hamster.LED_YELLOW)", 
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_left_led,"LEFT"],
                            [Lang.Blocks.HAMSTER_right_led,"RIGHT"],
                            [Lang.Blocks.HAMSTER_both_leds,"BOTH"]
                        ],
                        "value": "LEFT",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    },
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_color_red,"4"],
                            [Lang.Blocks.HAMSTER_color_yellow,"6"],
                            [Lang.Blocks.HAMSTER_color_green,"2"],
                            [Lang.Blocks.HAMSTER_color_cyan,"3"],
                            [Lang.Blocks.HAMSTER_color_blue,"1"],
                            [Lang.Blocks.HAMSTER_color_magenta,"5"],
                            [Lang.Blocks.HAMSTER_color_white,"7"]
                        ],
                        "value": "4",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    }
                ],
                params: ["LEFT", "6"]
            },
            {
                syntax: "Hamster.left_led(Hamster.LED_GREEN)", 
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_left_led,"LEFT"],
                            [Lang.Blocks.HAMSTER_right_led,"RIGHT"],
                            [Lang.Blocks.HAMSTER_both_leds,"BOTH"]
                        ],
                        "value": "LEFT",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    },
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_color_red,"4"],
                            [Lang.Blocks.HAMSTER_color_yellow,"6"],
                            [Lang.Blocks.HAMSTER_color_green,"2"],
                            [Lang.Blocks.HAMSTER_color_cyan,"3"],
                            [Lang.Blocks.HAMSTER_color_blue,"1"],
                            [Lang.Blocks.HAMSTER_color_magenta,"5"],
                            [Lang.Blocks.HAMSTER_color_white,"7"]
                        ],
                        "value": "4",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    }
                ],
                params: ["LEFT", "2"]
            },
            {
                syntax: "Hamster.left_led(Hamster.LED_CYAN)", 
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_left_led,"LEFT"],
                            [Lang.Blocks.HAMSTER_right_led,"RIGHT"],
                            [Lang.Blocks.HAMSTER_both_leds,"BOTH"]
                        ],
                        "value": "LEFT",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    },
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_color_red,"4"],
                            [Lang.Blocks.HAMSTER_color_yellow,"6"],
                            [Lang.Blocks.HAMSTER_color_green,"2"],
                            [Lang.Blocks.HAMSTER_color_cyan,"3"],
                            [Lang.Blocks.HAMSTER_color_blue,"1"],
                            [Lang.Blocks.HAMSTER_color_magenta,"5"],
                            [Lang.Blocks.HAMSTER_color_white,"7"]
                        ],
                        "value": "4",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    }
                ],
                params: ["LEFT", "3"]
            },
            {
                syntax: "Hamster.left_led(Hamster.LED_BLUE)", 
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_left_led,"LEFT"],
                            [Lang.Blocks.HAMSTER_right_led,"RIGHT"],
                            [Lang.Blocks.HAMSTER_both_leds,"BOTH"]
                        ],
                        "value": "LEFT",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    },
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_color_red,"4"],
                            [Lang.Blocks.HAMSTER_color_yellow,"6"],
                            [Lang.Blocks.HAMSTER_color_green,"2"],
                            [Lang.Blocks.HAMSTER_color_cyan,"3"],
                            [Lang.Blocks.HAMSTER_color_blue,"1"],
                            [Lang.Blocks.HAMSTER_color_magenta,"5"],
                            [Lang.Blocks.HAMSTER_color_white,"7"]
                        ],
                        "value": "4",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    }
                ],
                params: ["LEFT", "1"]
            },
            {
                syntax: "Hamster.left_led(Hamster.LED_MAGENTA)", 
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_left_led,"LEFT"],
                            [Lang.Blocks.HAMSTER_right_led,"RIGHT"],
                            [Lang.Blocks.HAMSTER_both_leds,"BOTH"]
                        ],
                        "value": "LEFT",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    },
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_color_red,"4"],
                            [Lang.Blocks.HAMSTER_color_yellow,"6"],
                            [Lang.Blocks.HAMSTER_color_green,"2"],
                            [Lang.Blocks.HAMSTER_color_cyan,"3"],
                            [Lang.Blocks.HAMSTER_color_blue,"1"],
                            [Lang.Blocks.HAMSTER_color_magenta,"5"],
                            [Lang.Blocks.HAMSTER_color_white,"7"]
                        ],
                        "value": "4",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    }
                ],
                params: ["LEFT", "5"]
            },
            {
                syntax: "Hamster.left_led(Hamster.LED_WHITE)", 
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_left_led,"LEFT"],
                            [Lang.Blocks.HAMSTER_right_led,"RIGHT"],
                            [Lang.Blocks.HAMSTER_both_leds,"BOTH"]
                        ],
                        "value": "LEFT",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    },
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_color_red,"4"],
                            [Lang.Blocks.HAMSTER_color_yellow,"6"],
                            [Lang.Blocks.HAMSTER_color_green,"2"],
                            [Lang.Blocks.HAMSTER_color_cyan,"3"],
                            [Lang.Blocks.HAMSTER_color_blue,"1"],
                            [Lang.Blocks.HAMSTER_color_magenta,"5"],
                            [Lang.Blocks.HAMSTER_color_white,"7"]
                        ],
                        "value": "4",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    }
                ],
                params: ["LEFT", "7"]
            }
        ]}
    },
    "hamster_clear_led": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.HAMSTER_left_led,"LEFT"],
                    [Lang.Blocks.HAMSTER_right_led,"RIGHT"],
                    [Lang.Blocks.HAMSTER_both_leds,"BOTH"]
                ],
                "value": "LEFT",
                "fontSize": 11
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null ],
            "type": "hamster_clear_led"
        },
        "paramsKeyMap": {
            "DIRECTION": 0
        },
        "class": "hamster_led",
        "isNotFor": [ "hamster" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            var direction = script.getField("DIRECTION", script);
            if (direction == 'LEFT') {
                sq.leftLed = 0;
            } else if (direction == 'RIGHT') {
                sq.rightLed = 0;
            } else {
                sq.leftLed = 0;
                sq.rightLed = 0;
            }
            return script.callReturn(); 
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Hamster.left_led(0)", 
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_left_led,"LEFT"],
                            [Lang.Blocks.HAMSTER_right_led,"RIGHT"],
                            [Lang.Blocks.HAMSTER_both_leds,"BOTH"]
                        ],
                        "value": "LEFT",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    }
                ],
                params: ["LEFT"]
            },
            {
                syntax: "Hamster.left_led(Hamster.LED_OFF)", 
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_left_led,"LEFT"],
                            [Lang.Blocks.HAMSTER_right_led,"RIGHT"],
                            [Lang.Blocks.HAMSTER_both_leds,"BOTH"]
                        ],
                        "value": "LEFT",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    }
                ],
                params: ["LEFT"]
            },
            {
                syntax: "Hamster.right_led(0)", 
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_left_led,"LEFT"],
                            [Lang.Blocks.HAMSTER_right_led,"RIGHT"],
                            [Lang.Blocks.HAMSTER_both_leds,"BOTH"]
                        ],
                        "value": "LEFT",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    }
                ],
                params: ["RIGHT"]
            },
            {
                syntax: "Hamster.right_led(Hamster.LED_OFF)", 
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_left_led,"LEFT"],
                            [Lang.Blocks.HAMSTER_right_led,"RIGHT"],
                            [Lang.Blocks.HAMSTER_both_leds,"BOTH"]
                        ],
                        "value": "LEFT",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    }
                ],
                params: ["RIGHT"]
            },
            {
                syntax: "Hamster.leds(0)", 
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_left_led,"LEFT"],
                            [Lang.Blocks.HAMSTER_right_led,"RIGHT"],
                            [Lang.Blocks.HAMSTER_both_leds,"BOTH"]
                        ],
                        "value": "LEFT",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    }
                ],
                params: ["BOTH"]
            },
            {
                syntax: "Hamster.leds(Hamster.LED_OFF)", 
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_left_led,"LEFT"],
                            [Lang.Blocks.HAMSTER_right_led,"RIGHT"],
                            [Lang.Blocks.HAMSTER_both_leds,"BOTH"]
                        ],
                        "value": "LEFT",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    }
                ],
                params: ["BOTH"]
            }
        ]}
    },
    "hamster_beep": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "hamster_beep"
        },
        "class": "hamster_buzzer",
        "isNotFor": [ "hamster" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            if (!script.isStart) {
                script.isStart = true;
                script.timeFlag = 1;
                sq.buzzer = 440;
                sq.note = 0;
                var timeValue = 0.2 * 1000;
                var timer = setTimeout(function() {
                    script.timeFlag = 0;
                    Entry.Hamster.removeTimeout(timer);
                }, timeValue);
                Entry.Hamster.timeouts.push(timer);
                return script;
            } else if (script.timeFlag == 1) {
                return script;
            } else {
                delete script.isStart;
                delete script.timeFlag;
                Entry.engine.isContinue = false;
                sq.buzzer = 0;
                return script.callReturn();
            }
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Hamster.beep()"
            }
        ]}
    },
    "hamster_change_buzzer_by": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "text",
                    "params": [ "10" ]
                },
                null
            ],
            "type": "hamster_change_buzzer_by"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "hamster_buzzer",
        "isNotFor": [ "hamster" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            var value = script.getNumberValue('VALUE');
            sq.buzzer = sq.buzzer != undefined ? sq.buzzer + value : value;
            sq.note = 0;
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Hamster.add_buzzer_sound(%1)"
            }
        ]}
    },
    "hamster_set_buzzer_to": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "text",
                    "params": [ "1000" ]
                },
                null
            ],
            "type": "hamster_set_buzzer_to"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "hamster_buzzer",
        "isNotFor": [ "hamster" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            sq.buzzer = script.getNumberValue('VALUE');
            sq.note = 0;
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [
            { 
                syntax: "Hamster.set_buzzer_sound(%1)"
            }
        ]}
    },
    "hamster_clear_buzzer": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "hamster_clear_buzzer"
        },
        "class": "hamster_buzzer",
        "isNotFor": [ "hamster" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            sq.buzzer = 0;
            sq.note = 0;
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Hamster.buzzer(0)", params: [null]
            },
        ]}
    },
    "hamster_play_note_for": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.ALBERT_note_c + '',"4"],
                    [Lang.Blocks.ALBERT_note_c + '#',"5"],
                    [Lang.Blocks.ALBERT_note_d + '',"6"],
                    [Lang.Blocks.ALBERT_note_e + 'b',"7"],
                    [Lang.Blocks.ALBERT_note_e + '',"8"],
                    [Lang.Blocks.ALBERT_note_f + '',"9"],
                    [Lang.Blocks.ALBERT_note_f + '#',"10"],
                    [Lang.Blocks.ALBERT_note_g + '',"11"],
                    [Lang.Blocks.ALBERT_note_g + '#',"12"],
                    [Lang.Blocks.ALBERT_note_a + '',"13"],
                    [Lang.Blocks.ALBERT_note_b + 'b',"14"],
                    [Lang.Blocks.ALBERT_note_b + '',"15"]
                ],
                "value": "4",
                "fontSize": 11
            },
            {
                "type": "Dropdown",
                "options": [
                    [ "1", "1" ],
                    [ "2", "2" ],
                    [ "3", "3" ],
                    [ "4", "4" ],
                    [ "5", "5" ],
                    [ "6", "6" ],
                    [ "7", "7" ]
                ],
                "value": "1",
                "fontSize": 11
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                "4",
                {
                    "type": "text",
                    "params": [ "0.5" ]
                },
                null
            ],
            "type": "hamster_play_note_for"
        },
        "paramsKeyMap": {
            "NOTE": 0,
            "OCTAVE": 1,
            "VALUE": 2
        },
        "class": "hamster_buzzer",
        "isNotFor": [ "hamster" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            if (!script.isStart) {
                var note = script.getNumberField("NOTE", script);
                var octave = script.getNumberField("OCTAVE", script);
                var beat = script.getNumberValue("VALUE", script);
                var tempo = Entry.Hamster.tempo;
                note += (octave-1)*12;
                var timeValue = beat*60*1000/tempo;
                script.isStart = true;
                script.timeFlag = 1;
                sq.buzzer = 0;
                sq.note = note;
                if (timeValue > 100) {
                    var timer1 = setTimeout(function() {
                        sq.note = 0;
                        Entry.Hamster.removeTimeout(timer1);
                    }, timeValue-100);
                    Entry.Hamster.timeouts.push(timer1);
                }
                var timer2 = setTimeout(function() {
                    script.timeFlag = 0;
                    Entry.Hamster.removeTimeout(timer2);
                }, timeValue);
                Entry.Hamster.timeouts.push(timer2);
                return script;
            } else if (script.timeFlag == 1) {
                return script;
            } else {
                delete script.isStart;
                delete script.timeFlag;
                Entry.engine.isContinue = false;
                sq.note = 0;
                return script.callReturn();
            }
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Hamster.note(%1, %2, %3)",
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.ALBERT_note_c + '',"4"],
                            [Lang.Blocks.ALBERT_note_c + '#',"5"],
                            [Lang.Blocks.ALBERT_note_d + '',"6"],
                            [Lang.Blocks.ALBERT_note_e + 'b',"7"],
                            [Lang.Blocks.ALBERT_note_e + '',"8"],
                            [Lang.Blocks.ALBERT_note_f + '',"9"],
                            [Lang.Blocks.ALBERT_note_f + '#',"10"],
                            [Lang.Blocks.ALBERT_note_g + '',"11"],
                            [Lang.Blocks.ALBERT_note_g + '#',"12"],
                            [Lang.Blocks.ALBERT_note_a + '',"13"],
                            [Lang.Blocks.ALBERT_note_b + 'b',"14"],
                            [Lang.Blocks.ALBERT_note_b + '',"15"]
                        ],
                        "value": "4",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue,
                        codeMap: "Entry.CodeMap.Hamster.note[0]",
                        caseType: "no",
                        paramType: "variable"

                    },
                    {
                        "type": "Dropdown",
                        "options": [
                            [ "1", "1" ],
                            [ "2", "2" ],
                            [ "3", "3" ],
                            [ "4", "4" ],
                            [ "5", "5" ],
                            [ "6", "6" ],
                            [ "7", "7" ]
                        ],
                        "value": "1",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringOrNumberByValue
                    },
                    {
                        "type": "Block",
                        "accept": "string"
                    }
                ]
            },
        ]}
    },
    "hamster_rest_for": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "text",
                    "params": [ "0.25" ]
                },
                null
            ],
            "type": "hamster_rest_for"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "hamster_buzzer",
        "isNotFor": [ "hamster" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            if (!script.isStart) {
                script.isStart = true;
                script.timeFlag = 1;
                var timeValue = script.getNumberValue('VALUE');
                timeValue = timeValue*60*1000/Entry.Hamster.tempo;
                sq.buzzer = 0;
                sq.note = 0;
                var timer = setTimeout(function() {
                    script.timeFlag = 0;
                    Entry.Hamster.removeTimeout(timer);
                }, timeValue);
                Entry.Hamster.timeouts.push(timer);
                return script;
            } else if (script.timeFlag == 1) {
                return script;
            } else {
                delete script.isStart;
                delete script.timeFlag;
                Entry.engine.isContinue = false;
                return script.callReturn();
            }
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Hamster.note(0,%1)", 
                textParams: [
                    {
                        "type": "Block",
                        "accept": "string"
                    }
                ],
                keyOption: "0"
            },
            {
                syntax: "Hamster.note(Hamster.NOTE_OFF,%1)", 
                textParams: [
                    {
                        "type": "Block",
                        "accept": "string"
                    }
                ],
                keyOption: "Hamster.NOTE_OFF"
            }
        ]}
    },
    "hamster_change_tempo_by": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "text",
                    "params": [ "20" ]
                },
                null
            ],
            "type": "hamster_change_tempo_by"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "hamster_buzzer",
        "isNotFor": [ "hamster" ],
        "func": function (sprite, script) {
            Entry.Hamster.tempo += script.getNumberValue('VALUE');
            if (Entry.Hamster.tempo < 1) Entry.Hamster.tempo = 1;
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Hamster.tempo_by(%1)",
                textParams: [
                    {
                        "type": "Block",
                        "accept": "string"
                    }
                ]
            }
        ]}
    },
    "hamster_set_tempo_to": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "text",
                    "params": [ "60" ]
                },
                null
            ],
            "type": "hamster_set_tempo_to"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "hamster_buzzer",
        "isNotFor": [ "hamster" ],
        "func": function (sprite, script) {
            Entry.Hamster.tempo = script.getNumberValue('VALUE');
            if (Entry.Hamster.tempo < 1) Entry.Hamster.tempo = 1;
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Hamster.tempo(%1)",
                textParams: [
                    {
                        "type": "Block",
                        "accept": "string"
                    }
                ]
            }
        ]}
    },
    "hamster_set_port_to": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.HAMSTER_port_a, "A"],
                    [Lang.Blocks.HAMSTER_port_b, "B"],
                    [Lang.Blocks.HAMSTER_port_ab, "AB"]
                ],
                "value": "A",
                "fontSize": 11
            },
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.HAMSTER_analog_input, "0"],
                    [Lang.Blocks.HAMSTER_digital_input, "1"],
                    [Lang.Blocks.HAMSTER_servo_output, "8"],
                    [Lang.Blocks.HAMSTER_pwm_output, "9"],
                    [Lang.Blocks.HAMSTER_digital_output, "10"]
                ],
                "value": "0",
                "fontSize": 11
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null, null ],
            "type": "hamster_set_port_to"
        },
        "paramsKeyMap": {
            "PORT": 0,
            "MODE": 1
        },
        "class": "hamster_port",
        "isNotFor": [ "hamster" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            var port = script.getField("PORT", script);
            var mode = Number(script.getField("MODE", script));
            if (port == 'A') {
                sq.ioModeA = mode;
            } else if (port == 'B') {
                sq.ioModeB = mode;
            } else {
                sq.ioModeA = mode;
                sq.ioModeB = mode;
            }
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Hamster.io_mode_a(Hamster.IO_MODE_ANALOG_INPUT)", 
                textParams: [{converter: Entry.block.converters.returnStringValue}],
                params: ["A", "0"]
            },
            {
                syntax: "Hamster.io_mode_a(Hamster.IO_MODE_DIGITAL_INPUT)", 
                textParams: [{converter: Entry.block.converters.returnStringValue}],
                params: ["A", "1"]
            },
            {
                syntax: "Hamster.io_mode_a(Hamster.IO_MODE_SERVO_OUTPUT)", 
                textParams: [{converter: Entry.block.converters.returnStringValue}],
                params: ["A", "8"]
            },
            {
                syntax: "Hamster.io_mode_a(Hamster.IO_MODE_PWM_OUTPUT)", 
                textParams: [{converter: Entry.block.converters.returnStringValue}],
                params: ["A", "9"]
            },
            {
                syntax: "Hamster.io_mode_a(Hamster.IO_MODE_DIGITAL_OUTPUT)", 
                textParams: [{converter: Entry.block.converters.returnStringValue}],
                params: ["A", "10"]
            },
            {
                syntax: "Hamster.io_mode_b(Hamster.IO_MODE_ANALOG_INPUT)", 
                textParams: [{converter: Entry.block.converters.returnStringValue}],
                params: ["B", "0"]
            },
            {
                syntax: "Hamster.io_mode_b(Hamster.IO_MODE_DIGITAL_INPUT)", 
                textParams: [{converter: Entry.block.converters.returnStringValue}],
                params: ["B", "1"]
            },
            {
                syntax: "Hamster.io_mode_b(Hamster.IO_MODE_SERVO_OUTPUT)", 
                textParams: [{converter: Entry.block.converters.returnStringValue}],
                params: ["B", "8"]
            },
            {
                syntax: "Hamster.io_mode_b(Hamster.IO_MODE_PWM_OUTPUT)", 
                textParams: [{converter: Entry.block.converters.returnStringValue}],
                params: ["B", "9"]
            },
            {
                syntax: "Hamster.io_mode_b(Hamster.IO_MODE_DIGITAL_OUTPUT)", 
                textParams: [{converter: Entry.block.converters.returnStringValue}],
                params: ["B", "10"]
            },
            {
                syntax: "Hamster.io_modes(Hamster.IO_MODE_ANALOG_INPUT)", 
                textParams: [{converter: Entry.block.converters.returnStringValue}],
                params: ["AB", "0"]
            },
            {
                syntax: "Hamster.io_modes(Hamster.IO_MODE_ANALOG_INPUT,Hamster.IO_MODE_DIGITAL_INPUT)", 
                textParams: [{converter: Entry.block.converters.returnStringValue}],
                params: ["AB", "1"]
            },
            {
                syntax: "Hamster.io_modes(Hamster.IO_MODE_ANALOG_INPUT,Hamster.IO_MODE_SERVO_OUTPUT)", 
                textParams: [{converter: Entry.block.converters.returnStringValue}],
                params: ["AB", "8"]
            },
            {
                syntax: "Hamster.io_modes(Hamster.IO_MODE_ANALOG_INPUT,Hamster.IO_MODE_PWM_OUTPUT)", 
                textParams: [{converter: Entry.block.converters.returnStringValue}],
                params: ["AB", "9"]
            },
            {
                syntax: "Hamster.io_modes(Hamster.IO_MODE_ANALOG_INPUT,Hamster.IO_MODE_DIGITAL_OUTPUT)", 
                textParams: [{converter: Entry.block.converters.returnStringValue}],
                params: ["AB", "10"]
            },
        ]}
    },
    "hamster_change_output_by": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.HAMSTER_port_a, "A"],
                    [Lang.Blocks.HAMSTER_port_b, "B"],
                    [Lang.Blocks.HAMSTER_port_ab, "AB"]
                ],
                "value": "A",
                "fontSize": 11
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                {
                    "type": "text",
                    "params": [ "10" ]
                },
                null
            ],
            "type": "hamster_change_output_by"
        },
        "paramsKeyMap": {
            "PORT": 0,
            "VALUE": 1
        },
        "class": "hamster_port",
        "isNotFor": [ "hamster" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            var port = script.getField('PORT');
            var value = script.getNumberValue('VALUE');
            if (port == 'A') {
                sq.outputA = sq.outputA != undefined ? sq.outputA + value : value;
            } else if (port == 'B') {
                sq.outputB = sq.outputB != undefined ? sq.outputB + value : value;
            } else {
                sq.outputA = sq.outputA != undefined ? sq.outputA + value : value;
                sq.outputB = sq.outputB != undefined ? sq.outputB + value : value;
            }
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Hamster.output_a_by(%2)", 
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_port_a, "A"],
                            [Lang.Blocks.HAMSTER_port_b, "B"],
                            [Lang.Blocks.HAMSTER_port_ab, "AB"]
                        ],
                        "value": "A",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    },
                    {
                        "type": "Block",
                        "accept": "string"
                    }
                ],
                params: ["A"]
            },
            {
                syntax: "Hamster.output_b_by(%2)", 
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_port_a, "A"],
                            [Lang.Blocks.HAMSTER_port_b, "B"],
                            [Lang.Blocks.HAMSTER_port_ab, "AB"]
                        ],
                        "value": "A",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    },
                    {
                        "type": "Block",
                        "accept": "string"
                    }
                ],
                params: ["B"]
            },
            {
                syntax: "Hamster.outputs_by(%2)", 
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_port_a, "A"],
                            [Lang.Blocks.HAMSTER_port_b, "B"],
                            [Lang.Blocks.HAMSTER_port_ab, "AB"]
                        ],
                        "value": "A",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    },
                    {
                        "type": "Block",
                        "accept": "string"
                    }
                ],
                params: ["AB"]
            }
        ]}
    },
    "hamster_set_output_to": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.HAMSTER_port_a, "A"],
                    [Lang.Blocks.HAMSTER_port_b, "B"],
                    [Lang.Blocks.HAMSTER_port_ab, "AB"]
                ],
                "value": "A",
                "fontSize": 11
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                {
                    "type": "text",
                    "params": [ "100" ]
                },
                null
            ],
            "type": "hamster_set_output_to"
        },
        "paramsKeyMap": {
            "PORT": 0,
            "VALUE": 1
        },
        "class": "hamster_port",
        "isNotFor": [ "hamster" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            var port = script.getField('PORT');
            var value = script.getNumberValue('VALUE');
            if (port == 'A') {
                sq.outputA = value;
            } else if (port == 'B') {
                sq.outputB = value;
            } else {
                sq.outputA = value;
                sq.outputB = value
            }
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Hamster.output_a(%2)", 
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_port_a, "A"],
                            [Lang.Blocks.HAMSTER_port_b, "B"],
                            [Lang.Blocks.HAMSTER_port_ab, "AB"]
                        ],
                        "value": "A",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    },
                    {
                        "type": "Block",
                        "accept": "string"
                    }
                ],
                params: ["A"]
            },
            {
                syntax: "Hamster.output_b(%2)", 
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_port_a, "A"],
                            [Lang.Blocks.HAMSTER_port_b, "B"],
                            [Lang.Blocks.HAMSTER_port_ab, "AB"]
                        ],
                        "value": "A",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    },
                    {
                        "type": "Block",
                        "accept": "string"
                    }
                ],
                params: ["B"]
            },
            {
                syntax: "Hamster.outputs(%2,%2)", 
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.HAMSTER_port_a, "A"],
                            [Lang.Blocks.HAMSTER_port_b, "B"],
                            [Lang.Blocks.HAMSTER_port_ab, "AB"]
                        ],
                        "value": "A",
                        "fontSize": 11,
                        converter: Entry.block.converters.returnStringValue
                    },
                    {
                        "type": "Block",
                        "accept": "string"
                    }
                ],
                params: ["AB"]
            }
        ]}
    },
    "is_clicked": {
        "color": "#AEB8FF",
        "vimModeFontColor": "black",
        "skeleton": "basic_boolean_field",
        "statements": [],
        "params": [
            {
                "type": "Text",
                "text": Lang.Blocks.JUDGEMENT_is_clicked,
                "color": "#3D3D3D"
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "is_clicked"
        },
        "class": "boolean_input",
        "isNotFor": [],
        "func": function (sprite, script) {
            return Entry.stage.isClick;
        },
        "syntax": {"js": [], "py": ["Entry.is_mouse_clicked()"]}
    },
    "is_press_some_key": {
        "color": "#AEB8FF",
        "vimModeFontColor": "black",
        "skeleton": "basic_boolean_field",
        "statements": [],
        "params": [
            {
                "type": "Keyboard",
                "value": 81
            },
            {
                "type": "Text",
                "text": Lang.Blocks.JUDGEMENT_is_press_some_key_2,
                "color": "#3D3D3D"
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null ],
            "type": "is_press_some_key"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "boolean_input",
        "isNotFor": [],
        "func": function (sprite, script) {
            var keycode = Number(script.getField("VALUE", script));
            return Entry.pressedKeys.indexOf(keycode) >= 0;
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Entry.is_key_pressed(%1)",
                textParams: [
                    {
                        "type": "Keyboard",
                        "value": '81',
                        converter: Entry.block.converters.keyboardCode
                    }
                ]
            }
        ]}
    },
    "reach_something": {
        "color": "#AEB8FF",
        "vimModeFontColor": "black",
        "skeleton": "basic_boolean_field",
        "statements": [],
        "params": [
            {
                "type": "Text",
                "text": Lang.Blocks.JUDGEMENT_reach_something_1,
                "color": "#3D3D3D"
            },
            {
                "type": "DropdownDynamic",
                "value": null,
                "menuName": "collision",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_JUDGE
            },
            {
                "type": "Text",
                "text": Lang.Blocks.JUDGEMENT_reach_something_2,
                "color": "#3D3D3D"
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null, null ],
            "type": "reach_something"
        },
        "paramsKeyMap": {
            "VALUE": 1
        },
        "class": "boolean_collision",
        "isNotFor": [],
        "func": function (sprite, script) {
            if (!sprite.getVisible())
                return false;
            var targetSpriteId = script.getField("VALUE", script);
            var reg = /wall/;
            var ath = 0.2;
            var object = sprite.object
            var isWall = reg.test(targetSpriteId);
            var collision = ndgmr.checkPixelCollision;
            if (isWall) {
                var wall = Entry.stage.wall;
                switch(targetSpriteId) {
                    case 'wall':
                        return  !!(collision(object,wall.up,ath,true) ||
                            collision(object,wall.down,ath,true) ||
                            collision(object,wall.left,ath,true) ||
                                collision(object,wall.right,ath, true));
                    case 'wall_up':
                        return !!collision(object,wall.up,ath,true);
                    case 'wall_down':
                        return !!collision(object,wall.down,ath,true);
                    case 'wall_right':
                        return !!collision(object,wall.right,ath,true);
                    case 'wall_left':
                        return !!collision(object,wall.left,ath,true);
                }
            } else if (targetSpriteId == 'mouse') {
                var stage = Entry.stage.canvas;
                var pt = object.globalToLocal(stage.mouseX, stage.mouseY);
                return object.hitTest(pt.x, pt.y);
            } else {
                var targetSprite = Entry.container.getEntity(targetSpriteId);
                if (targetSprite.type == "textBox" || sprite.type == 'textBox') {
                    var targetBound = targetSprite.object.getTransformedBounds();
                    var bound = object.getTransformedBounds();
                    if (Entry.checkCollisionRect(bound, targetBound))
                        return true;
                    var clonedEntities = targetSprite.parent.clonedEntities;
                    for (var i=0, len=clonedEntities.length; i<len; i++) {
                        var entity = clonedEntities[i];
                        if(entity.isStamp || !entity.getVisible()) continue;
                        if (Entry.checkCollisionRect(bound, entity.object.getTransformedBounds()))
                            return true;
                    }
                } else {
                    if (targetSprite.getVisible() &&
                        collision(object,targetSprite.object,ath,true))
                        return true;
                    var clonedEntities = targetSprite.parent.clonedEntities;
                    for (var i=0, len=clonedEntities.length; i<len; i++) {
                        var entity = clonedEntities[i];
                        if(entity.isStamp || !entity.getVisible()) continue;
                        if (collision(object,entity.object,ath,true))
                            return true;
                    }
                }
            }
            return false;
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Entry.is_touched(%2)",
                textParams: [
                    undefined,
                    {
                        "type": "DropdownDynamic",
                        "value": null,
                        "menuName": "collision",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_JUDGE,
                        converter: Entry.block.converters.returnObjectOrStringValue
                    },
                ]
            }
        ]}
    },
    "boolean_comparison": {
        "color": "#AEB8FF",
        "skeleton": "basic_boolean_field",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Dropdown",
                "options": [
                    [ "=", "EQUAL" ],
                    [ "<", "SMALLER" ],
                    [ ">", "BIGGER" ]
                ],
                "value": "EQUAL",
                "fontSize": 11
            },
            {
                "type": "Block",
                "accept": "string"
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            type: "boolean_comparison"
        },
        "paramsKeyMap": {
            "LEFTHAND": 0,
            "OPERATOR": 1,
            "RIGHTHAND": 2
        },
        "func": function (sprite, script) {
            var operator = script.getField("OPERATOR", script);
            var leftValue = script.getNumberValue("LEFTHAND", script);
            var rightValue = script.getNumberValue("RIGHTHAND", script);
            if (operator == "EQUAL")
                return leftValue == rightValue;
            else if (operator == "BIGGER")
                return leftValue > rightValue;
            else
                return leftValue < rightValue;
        },
        "syntax": {"js": [], "py": [""]}
    },
    "boolean_equal": {
        "color": "#AEB8FF",
        "skeleton": "basic_boolean_field",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Text",
                "text": "=",
                "color": "#3D3D3D"
            },
            {
                "type": "Block",
                "accept": "string"
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "number",
                    "params": [ "10" ]
                },
                null,
                {
                    "type": "number",
                    "params": [ "10" ]
                }
            ],
            "type": "boolean_equal"
        },
        "paramsKeyMap": {
            "LEFTHAND": 0,
            "RIGHTHAND": 2
        },
        "class": "boolean_compare",
        "isNotFor": [],
        "func": function (sprite, script) {
            var leftValue = script.getStringValue("LEFTHAND", script);
            var rightValue = script.getStringValue("RIGHTHAND", script);
            return leftValue == rightValue;
        },
        "syntax": {"js": [], "py": [""]}
    },
    "boolean_bigger": {
        "color": "#AEB8FF",
        "skeleton": "basic_boolean_field",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Text",
                "text": ">",
                "color": "#3D3D3D"
            },
            {
                "type": "Block",
                "accept": "string"
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "number",
                    "params": [ "10" ]
                },
                null,
                {
                    "type": "number",
                    "params": [ "10" ]
                }
            ],
            "type": "boolean_bigger"
        },
        "paramsKeyMap": {
            "LEFTHAND": 0,
            "RIGHTHAND": 2
        },
        "class": "boolean_compare",
        "isNotFor": [],
        "func": function (sprite, script) {
            var leftValue = script.getNumberValue("LEFTHAND", script);
            var rightValue = script.getNumberValue("RIGHTHAND", script);
            return leftValue > rightValue;
        },
        "syntax": {"js": [], "py": [""]}
    },
    "boolean_smaller": {
        "color": "#AEB8FF",
        "skeleton": "basic_boolean_field",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Text",
                "text": "<",
                "color": "#3D3D3D"
            },
            {
                "type": "Block",
                "accept": "string"
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "number",
                    "params": [ "10" ]
                },
                null,
                {
                    "type": "number",
                    "params": [ "10" ]
                }
            ],
            "type": "boolean_smaller"
        },
        "paramsKeyMap": {
            "LEFTHAND": 0,
            "RIGHTHAND": 2
        },
        "class": "boolean_compare",
        "isNotFor": [],
        "func": function (sprite, script) {
            var leftValue = script.getNumberValue("LEFTHAND", script);
            var rightValue = script.getNumberValue("RIGHTHAND", script);
            return leftValue < rightValue;
        },
        "syntax": {"js": [], "py": [""]}
    },
    "boolean_and_or": {
        "color": "#AEB8FF",
        "skeleton": "basic_boolean_field",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "boolean"
            },
            {
                "type": "Dropdown",
                "options": [
                    [ Lang.Blocks.JUDGEMENT_boolean_and, "AND" ],
                    [ Lang.Blocks.JUDGEMENT_boolean_or, "OR" ]
                ],
                "value": "AND",
                "fontSize": 11
            },
            {
                "type": "Block",
                "accept": "boolean"
            }
        ],
        "events": {},
        "def": {
            "params": [ null ]
        },
        "paramsKeyMap": {
            "LEFTHAND": 0,
            "OPERATOR": 1,
            "RIGHTHAND": 2
        },
        "func": function (sprite, script) {
            var operator = script.getField("OPERATOR", script);
            var leftValue = script.getBooleanValue("LEFTHAND", script);
            var rightValue = script.getBooleanValue("RIGHTHAND", script);
            if (operator == "AND")
                return leftValue && rightValue;
            else
                return leftValue || rightValue;
        },
        "syntax": {"js": [], "py": [""]}
    },
    "boolean_and": {
        "color": "#AEB8FF",
        "vimModeFontColor": "black",
        "skeleton": "basic_boolean_field",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "boolean"
            },
            {
                "type": "Text",
                "text": Lang.Blocks.JUDGEMENT_boolean_and,
                "color": "#3D3D3D"
            },
            {
                "type": "Block",
                "accept": "boolean"
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "True"
                },
                null,
                {
                    "type": "True"
                }
            ],
            "type": "boolean_and"
        },
        "paramsKeyMap": {
            "LEFTHAND": 0,
            "RIGHTHAND": 2
        },
        "class": "boolean",
        "isNotFor": [],
        "func": function (sprite, script) {
            var leftValue = script.getBooleanValue("LEFTHAND", script);
            var rightValue = script.getBooleanValue("RIGHTHAND", script);
            return leftValue && rightValue;
        },
        "syntax": {"js": [], "py": ["(%1 and %3)"]}
    },
    "boolean_or": {
        "color": "#AEB8FF",
        "vimModeFontColor": "black",
        "skeleton": "basic_boolean_field",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "boolean"
            },
            {
                "type": "Text",
                "text": Lang.Blocks.JUDGEMENT_boolean_or,
                "color": "#3D3D3D"
            },
            {
                "type": "Block",
                "accept": "boolean"
            }
        ],
        "events": {},
        "def": {
            "params": [
                { "type": "True" },
                null,
                { "type": "False" }
            ],
            "type": "boolean_or"
        },
        "paramsKeyMap": {
            "LEFTHAND": 0,
            "RIGHTHAND": 2
        },
        "class": "boolean",
        "isNotFor": [],
        "func": function (sprite, script) {
            var leftValue = script.getBooleanValue("LEFTHAND", script);
            var rightValue = script.getBooleanValue("RIGHTHAND", script);
            return leftValue || rightValue;
        },
        "syntax": {"js": [], "py": ["(%1 or %3)"]}
    },
    "boolean_not": {
        "color": "#AEB8FF",
        "vimModeFontColor": "black",
        "skeleton": "basic_boolean_field",
        "statements": [],
        "params": [
            {
                "type": "Text",
                "text": Lang.Blocks.JUDGEMENT_boolean_not_1,
                "color": "#3D3D3D"
            },
            {
                "type": "Block",
                "accept": "boolean"
            },
            {
                "type": "Text",
                "text": Lang.Blocks.JUDGEMENT_boolean_not_2,
                "color": "#3D3D3D"
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                { "type": "True" },
                null
            ],
            "type": "boolean_not"
        },
        "paramsKeyMap": {
            "VALUE": 1
        },
        "class": "boolean",
        "isNotFor": [],
        "func": function (sprite, script) {
            return !script.getBooleanValue("VALUE");
        },
        "syntax": {"js": [], "py": ["not (%2)"]}
    },
    "true_or_false": {
        "color": "#AEB8FF",
        "skeleton": "basic_boolean_field",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.JUDGEMENT_true,"true"],
                    [Lang.Blocks.JUDGEMENT_false, "false"]
                ],
                "value": "true",
                "fontSize": 11
            }
        ],
        "events": {},
        "def": {
            "params": [ null ]
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "func": function (sprite, script) {
            var value = script.children[0].textContent;
            return value == "true";
        },
        "syntax": {"js": [], "py": [""]}
    },
    "True": {
        "color": "#AEB8FF",
        "skeleton": "basic_boolean_field",
        "statements": [],
        "params": [
            {
                "type": "Text",
                "text": Lang.Blocks.JUDGEMENT_true,
                "color": "#3D3D3D"
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            type: "True"
        },
        "func": function (sprite, script) {
            return true;
        },
        "isPrimitive": true,
        "syntax": {"js": ["Scope", "true"], "py": ["True"]}
    },
    "False": {
        "color": "#AEB8FF",
        "skeleton": "basic_boolean_field",
        "statements": [],
        "params": [
            {
                "type": "Text",
                "text": Lang.Blocks.JUDGEMENT_false,
                "color": "#3D3D3D"
            }
        ],
        "events": {},
        "def": {
            "params": [
                null
            ],
            type: "False"
        },
        "func": function (sprite, script) {
            return false;
        },
        "isPrimitive": true,
        "syntax": {"js": [], "py": ["False"]}
    },
    "boolean_basic_operator": {
        "color": "#AEB8FF",
        "vimModeFontColor": "black",
        "skeleton": "basic_boolean_field",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Dropdown",
                "options": [
                    [ "=", "EQUAL" ],
                    [ ">", "GREATER" ],
                    [ "<", "LESS" ],
                    [ "≥", "GREATER_OR_EQUAL" ],
                    [ "≤", "LESS_OR_EQUAL" ]
                ],
                "value": "EQUAL",
                "fontSize": 11,
                noArrow: true
            },
            {
                "type": "Block",
                "accept": "string"
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "text",
                    "params": [ "10" ]
                },
                "EQUAL",
                {
                    "type": "text",
                    "params": [ "10" ]
                }
            ],
            "type": "boolean_basic_operator"
        },
        "defs": [
            {
                "params": [
                    {
                        "type": "text",
                        "params": [ "10" ]
                    },
                    "EQUAL",
                    {
                        "type": "text",
                        "params": [ "10" ]
                    }
                ],
                "type": "boolean_basic_operator"
            },
            {
                "params": [
                    {
                        "type": "text",
                        "params": [ "10" ]
                    },
                    "GREATER",
                    {
                        "type": "text",
                        "params": [ "10" ]
                    }
                ],
                "type": "boolean_basic_operator"
            },
            {
                "params": [
                    {
                        "type": "text",
                        "params": [ "10" ]
                    },
                    "LESS",
                    {
                        "type": "text",
                        "params": [ "10" ]
                    }
                ],
                "type": "boolean_basic_operator"
            },
            {
                "params": [
                    {
                        "type": "text",
                        "params": [ "10" ]
                    },
                    "GREATER_OR_EQUAL",
                    {
                        "type": "text",
                        "params": [ "10" ]
                    }
                ],
                "type": "boolean_basic_operator"
            },
            {
                "params": [
                    {
                        "type": "text",
                        "params": [ "10" ]
                    },
                    "LESS_OR_EQUAL",
                    {
                        "type": "text",
                        "params": [ "10" ]
                    }
                ],
                "type": "boolean_basic_operator"
            }
        ],
        "paramsKeyMap": {
            "LEFTHAND": 0,
            "OPERATOR": 1,
            "RIGHTHAND": 2
        },
        "class": "boolean_compare",
        "isNotFor": [],
        "func": function (sprite, script) {
            var operator = script.getField("OPERATOR", script);
            var leftValue = script.getStringValue("LEFTHAND", script);
            var rightValue = script.getStringValue("RIGHTHAND", script);

            switch(operator) {
                case 'EQUAL':
                    return leftValue == rightValue;
                case 'GREATER':
                    return Number(leftValue) > Number(rightValue);
                case 'LESS':
                    return Number(leftValue) < Number(rightValue);
                case 'GREATER_OR_EQUAL':
                    return Number(leftValue) >= Number(rightValue);
                case 'LESS_OR_EQUAL':
                    return Number(leftValue) <= Number(rightValue);
            }
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "(%1 %2 %3)",
                keyOption:"boolean_basic_operator",
                textParams: [
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    {
                        "type": "Dropdown",
                        "options": [
                            [ "=", "EQUAL" ],
                            [ ">", "GREATER" ],
                            [ "<", "LESS" ],
                            [ "≥", "GREATER_OR_EQUAL" ],
                            [ "≤", "LESS_OR_EQUAL" ]
                        ],
                        "value": "EQUAL",
                        "fontSize": 11,
                        noArrow: true,
                        converter: Entry.block.converters.returnOperator
                    },
                    {
                        "type": "Block",
                        "accept": "string"
                    }
                ]
            }
        ]}
    },
    "show": {
        "color": "#EC4466",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/looks_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "show"
        },
        "class": "visibility",
        "isNotFor": [],
        "func": function (sprite, script) {
            sprite.setVisible(true);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Entry.show()"]}
    },
    "hide": {
        "color": "#EC4466",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/looks_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "hide"
        },
        "class": "visibility",
        "isNotFor": [],
        "func": function (sprite, script) {
            sprite.setVisible(false);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Entry.hide()"]}
    },
    "dialog_time": {
        "color": "#EC4466",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Dropdown",
                "options": [
                    [ Lang.Blocks.speak, "speak" ]
                ],
                "value": "speak",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_LOOKS
            },
            {
                "type": "Indicator",
                "img": "block_icon/looks_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "text",
                    "params": [ Lang.Blocks.block_hi ]
                },
                {
                    "type": "number",
                    "params": [ "4" ]
                },
                null,
                null
            ],
            "type": "dialog_time"
        },
        "paramsKeyMap": {
            "VALUE": 0,
            "SECOND": 1,
            "OPTION": 2
        },
        "class": "say",
        "isNotFor": [ "textBox" ],
        "func": function (sprite, script) {
            if (!script.isStart) {
                var timeValue = script.getNumberValue("SECOND", script);
                var message = script.getStringValue("VALUE", script);
                var mode = script.getField("OPTION", script);
                script.isStart = true;
                script.timeFlag = 1;
                if (!message && typeof message != 'number')
                    message = '    ';
                message = Entry.convertToRoundedDecimals(message, 3);
                new Entry.Dialog(sprite, message, mode);
                sprite.syncDialogVisible(sprite.getVisible());
                setTimeout(function() {
                    script.timeFlag = 0;
                }, timeValue * 1000);
            }
            if (script.timeFlag == 0) {
                delete script.timeFlag;
                delete script.isStart;
                if(sprite.dialog)   sprite.dialog.remove();
                return script.callReturn();
            } else {
                if (!sprite.dialog) {
                    var message = script.getStringValue("VALUE", script);
                    var mode = script.getField("OPTION", script);
                    if (!message && typeof message != 'number')
                        message = '    ';
                    message = Entry.convertToRoundedDecimals(message, 3);
                    new Entry.Dialog(sprite, message, mode);
                    sprite.syncDialogVisible(sprite.getVisible());
                }
                return script;
            }
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Entry.print_for_sec(%1, %2)",
                params: [null,null,"speak"],  
                textParams: [
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    {
                        "type": "Dropdown",
                        "options": [
                            [ Lang.Blocks.speak, "speak" ]
                        ],
                        "value": "speak",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_LOOKS,
                        converter: Entry.block.converters.returnStringValue
                    },
                ]
            }
        ]}
    },
    "dialog": {
        "color": "#EC4466",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Dropdown",
                "options": [
                    [ Lang.Blocks.speak, "speak" ]
                ],
                "value": "speak",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_LOOKS
            },
            {
                "type": "Indicator",
                "img": "block_icon/looks_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "text",
                    "params": [ Lang.Blocks.block_hi ]
                },
                null, null
            ],
            "type": "dialog"
        },
        "paramsKeyMap": {
            "VALUE": 0,
            "OPTION": 1
        },
        "class": "say",
        "isNotFor": [ "textBox" ],
        "func": function (sprite, script) {
            var message = script.getStringValue("VALUE", script);
            if (!message && typeof message != 'number') {
                message = '    ';
            }
            var mode = script.getField("OPTION", script);
            message = Entry.convertToRoundedDecimals(message, 3);
            new Entry.Dialog(sprite, message, mode);
            sprite.syncDialogVisible(sprite.getVisible());
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Entry.print(%1)",
                params: [null,"speak"]
            }
        ]}
    },
    "remove_dialog": {
        "color": "#EC4466",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/looks_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "remove_dialog"
        },
        "class": "say",
        "isNotFor": [ "textBox" ],
        "func": function (sprite, script) {
            if(sprite.dialog)   sprite.dialog.remove();
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Entry.clear_print()"]}
    },
    "change_to_nth_shape": {
        "color": "#EC4466",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "DropdownDynamic",
                "value": null,
                "menuName": "pictures",
                "fontSize": 11
            },
            {
                "type": "Indicator",
                "img": "block_icon/looks_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null ],
            "type": "change_to_nth_shape"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "shape",
        "isNotFor": [],
        "func": function (sprite, script) {
            var imageId = script.getField("VALUE", script);
            var picture = sprite.parent.getPicture(imageId);
            sprite.setImage(picture);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [""]}
    },
    "change_to_next_shape": {
        "color": "#EC4466",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ Lang.Blocks.LOOKS_change_shape_next, "next" ],
                    [ Lang.Blocks.LOOKS_change_shape_prev, "prev" ]
                ],
                "value": "next",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_LOOKS
            },
            {
                "type": "Indicator",
                "img": "block_icon/looks_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null ],
            "type": "change_to_next_shape"
        },
        "paramsKeyMap": {
            "DRIECTION": 0
        },
        "class": "shape",
        "isNotFor": [ "textBox" ],
        "func": function (sprite, script) {
            var picture;
            if(script.getStringField("DRIECTION") !== 'prev') {
                picture = sprite.parent.getNextPicture(sprite.picture.id);
            } else {
                picture = sprite.parent.getPrevPicture(sprite.picture.id);
            }
            sprite.setImage(picture);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Entry.change_shape_to(%1)",
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [ Lang.Blocks.LOOKS_change_shape_next, "next" ],
                            [ Lang.Blocks.LOOKS_change_shape_prev, "prev" ]
                        ],
                        "value": "next",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_LOOKS,
                        converter: Entry.block.converters.returnStringValue,
                        codeMap: Entry.CodeMap.Entry.change_shape_to[0]
                    },
                ]
            }
        ]}
    },
    "set_effect_volume": {
        "color": "#EC4466",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.color, "color"],
                    [Lang.Blocks.brightness, "brightness"],
                    [Lang.Blocks.opacity, "opacity"]
                ],
                "value": "color",
                "fontSize": 11
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/looks_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                {
                    "type": "number",
                    "params": [ "10" ]
                },
                null
            ],
            "type": "set_effect_volume"
        },
        "paramsKeyMap": {
            "EFFECT": 0,
            "VALUE": 1
        },
        "class": "effect",
        "isNotFor": [ "textBox" ],
        "func": function (sprite, script) {
            var effect = script.getField("EFFECT", script);
            var effectValue = script.getNumberValue("VALUE", script);
            if (effect == "color") {
                sprite.effect.hue = effectValue + sprite.effect.hue;
            } else if (effect == "lens") {
            } else if (effect == "swriling") {
            } else if (effect == "pixel") {
            } else if (effect == "mosaic") {
            } else if (effect == "brightness") {
                sprite.effect.brightness = effectValue + sprite.effect.brightness;
            } else if (effect == "blur") {
            } else if (effect == "opacity") {
                sprite.effect.alpha = (sprite.effect.alpha + effectValue / 100) ;
            }
            sprite.applyFilter(true);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Entry.set_effect_volume(%1, %2)"]}
    },
    "set_effect": {
        "color": "#EC4466",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.color, "color"],
                    [Lang.Blocks.brightness, "brightness"],
                    [Lang.Blocks.opacity, "opacity"]
                ],
                "value": "color",
                "fontSize": 11
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/looks_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                {
                    "type": "number",
                    "params": [ "100" ]
                },
                null
            ],
            "type": "set_effect"
        },
        "paramsKeyMap": {
            "EFFECT": 0,
            "VALUE": 1
        },
        "class": "effect",
        "isNotFor": [ "textBox" ],
        "func": function (sprite, script) {
            var effect = script.getField("EFFECT", script);
            var effectValue = script.getNumberValue("VALUE", script);
            if (effect == "color") {
                sprite.effect.hue = effectValue;
            } else if (effect == "lens") {
            } else if (effect == "swriling") {
            } else if (effect == "pixel") {
            } else if (effect == "mosaic") {
            } else if (effect == "brightness") {
                sprite.effect.brightness = effectValue;
            } else if (effect == "blur") {
            } else if (effect == "opacity") {
                sprite.effect.alpha = effectValue / 100;
            }
            sprite.applyFilter(true);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Entry.set_effect(%1, %2)"]}
    },
    "erase_all_effects": {
        "color": "#EC4466",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/looks_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "erase_all_effects"
        },
        "class": "effect",
        "isNotFor": [ "textBox" ],
        "func": function (sprite, script) {
            sprite.resetFilter();
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Entry.clear_effect()"]}
    },
    "change_scale_percent": {
        "color": "#EC4466",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/looks_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "number",
                    "params": [ "10" ]
                },
                null
            ],
            "type": "change_scale_percent"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "scale",
        "isNotFor": [],
        "func": function (sprite, script) {
            var scaleValue = (script.getNumberValue("VALUE", script) + 100) / 100;
            sprite.setScaleX(sprite.getScaleX() * scaleValue);
            sprite.setScaleY(sprite.getScaleY() * scaleValue);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [""]}
    },
    "set_scale_percent": {
        "color": "#EC4466",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/looks_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "number",
                    "params": [ "100" ]
                },
                null
            ],
            "type": "set_scale_percent"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "scale",
        "isNotFor": [],
        "func": function (sprite, script) {
            var scaleValue = script.getNumberValue("VALUE", script) / 100;
            var snapshot = sprite.snapshot_;
            sprite.setScaleX(scaleValue * snapshot.scaleX);
            sprite.setScaleY(scaleValue * snapshot.scaleY);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [""]}
    },
    "change_scale_size": {
        "color": "#EC4466",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/looks_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "number",
                    "params": [ "10" ]
                },
                null
            ],
            "type": "change_scale_size"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "scale",
        "isNotFor": [],
        "func": function (sprite, script) {
            var sizeValue = script.getNumberValue("VALUE", script);
            sprite.setSize(sprite.getSize() + sizeValue);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Entry.add_size(%1)"]}
    },
    "set_scale_size": {
        "color": "#EC4466",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/looks_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "number",
                    "params": [ "100" ]
                },
                null
            ],
            "type": "set_scale_size"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "scale",
        "isNotFor": [],
        "func": function (sprite, script) {
            var sizeValue = script.getNumberValue("VALUE", script);
            sprite.setSize(sizeValue);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Entry.set_size(%1)"]}
    },
    "flip_y": {
        "color": "#EC4466",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/looks_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "flip_y"
        },
        "class": "flip",
        "isNotFor": [],
        "func": function (sprite, script) {
            sprite.setScaleX((-1)*sprite.getScaleX());
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Entry.flip_vertical()"]}
    },
    "flip_x": {
        "color": "#EC4466",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/looks_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                null
            ],
            "type": "flip_x"
        },
        "class": "flip",
        "isNotFor": [],
        "func": function (sprite, script) {
            sprite.setScaleY((-1)*sprite.getScaleY());
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Entry.flip_horizontal()"]}
    },
    "set_object_order": {
        "color": "#EC4466",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "DropdownDynamic",
                "value": null,
                "menuName": "objectSequence",
                "fontSize": 11
            },
            {
                "type": "Indicator",
                "img": "block_icon/looks_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null ],
            "type": "set_object_order"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "z-index",
        "isNotFor": [],
        "func": function (sprite, script) {
            var targetIndex = script.getField("VALUE", script);
            //var currentIndex = Entry.container.getBelongedObjectsToScene().indexOf(sprite.parent);
            var currentIndex = Entry.container.getCurrentObjects().indexOf(sprite.parent);

            if (currentIndex > -1) {
                Entry.container.moveElementByBlock(currentIndex, targetIndex);
                return script.callReturn();
            } else
                throw new Error('object is not available');
        },
        "syntax": {"js": [], "py": [""]}
    },
    "get_pictures": {
        "color": "#EC4466",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "DropdownDynamic",
                "value": null,
                "menuName": "pictures",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_LOOKS
            }
        ],
        "events": {},
        "def": {
            "params": [ null ]
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "func": function (sprite, script) {
            return script.getStringField("VALUE");
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "%1", keyOption: "get_pictures",
                textParams: [
                    {
                        "type": "DropdownDynamic",
                        "value": null,
                        "menuName": "pictures",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_LOOKS,
                        converter: Entry.block.converters.returnStringKey
                    }
                ]
            }
        ]}
    },
    "change_to_some_shape": {
        "color": "#EC4466",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/looks_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "get_pictures",
                    "id": "z4jm"
                },
                null
            ],
            "type": "change_to_some_shape"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "shape",
        "isNotFor": [ "textBox" ],
        "func": function (sprite, script) {
            var imageId = script.getStringValue("VALUE");
            var value = Entry.parseNumber(imageId);
            var picture = sprite.parent.getPicture(imageId);

            sprite.setImage(picture);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Entry.change_shape(%1)"]}
    },
    "add_effect_amount": {
        "color": "#EC4466",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ Lang.Blocks.color, "color" ],
                    [ Lang.Blocks.brightness, "brightness" ],
                    [ Lang.Blocks.transparency, "transparency" ]
                ],
                "value": "color",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_LOOKS
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/looks_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                {
                    "type": "number",
                    "params": [ "10" ]
                },
                null
            ],
            "type": "add_effect_amount"
        },
        "paramsKeyMap": {
            "EFFECT": 0,
            "VALUE": 1
        },
        "class": "effect",
        "isNotFor": [ "textBox" ],
        "func": function (sprite, script) {
            var effect = script.getField("EFFECT", script);
            var effectValue = script.getNumberValue("VALUE", script);
            if (effect == "color") {
                sprite.effect.hsv = effectValue + sprite.effect.hsv;
            } else if (effect == "brightness") {
                sprite.effect.brightness = effectValue + sprite.effect.brightness;
            } else if (effect == "transparency") {
                sprite.effect.alpha = (sprite.effect.alpha - effectValue / 100) ;
            }
            sprite.applyFilter(true);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Entry.add_effect(%1, %2)",
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [ Lang.Blocks.color, "color" ],
                            [ Lang.Blocks.brightness, "brightness" ],
                            [ Lang.Blocks.transparency, "transparency" ]
                        ],
                        "value": "color",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_LOOKS,
                        converter: Entry.block.converters.returnStringValue,
                        codeMap: Entry.CodeMap.Entry.add_effect[0]
                    },
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                ]
            }
        ]}
    },
    "change_effect_amount": {
        "color": "#EC4466",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ Lang.Blocks.color, "color" ],
                    [ Lang.Blocks.brightness, "brightness" ],
                    [ Lang.Blocks.transparency, "transparency" ]
                ],
                "value": "color",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_LOOKS
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/looks_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                {
                    "type": "number",
                    "params": [ "100" ]
                },
                null
            ],
            "type": "change_effect_amount"
        },
        "paramsKeyMap": {
            "EFFECT": 0,
            "VALUE": 1
        },
        "class": "effect",
        "isNotFor": [ "textBox" ],
        "func": function (sprite, script) {
            var effect = script.getField("EFFECT", script);
            var effectValue = script.getNumberValue("VALUE", script);
            if (effect == "color") {
                sprite.effect.hsv = effectValue;
            } else if (effect == "brightness") {
                sprite.effect.brightness = effectValue;
            } else if (effect == "transparency") {
                sprite.effect.alpha = 1 - (effectValue / 100);
            }
            sprite.applyFilter(true);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Entry.set_effect(%1, %2)",
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [ Lang.Blocks.color, "color" ],
                            [ Lang.Blocks.brightness, "brightness" ],
                            [ Lang.Blocks.transparency, "transparency" ]
                        ],
                        "value": "color",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_LOOKS,
                        converter: Entry.block.converters.returnStringValue,
                        codeMap: Entry.CodeMap.Entry.set_effect[0]
                    },
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                ]
            }
        ]}
    },
    "set_effect_amount": {
        "color": "#EC4466",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.color, "color"],
                    [Lang.Blocks.brightness, "brightness"],
                    [Lang.Blocks.transparency, "transparency"]
                ],
                "value": "color",
                "fontSize": 11
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/looks_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                {
                    "type": "number",
                    "params": [ "10" ]
                },
                null
            ],
            "type": "set_effect_amount"
        },
        "paramsKeyMap": {
            "EFFECT": 0,
            "VALUE": 1
        },
        "class": "effect",
        "isNotFor": [ "textBox" ],
        "func": function (sprite, script) {
            var effect = script.getField("EFFECT", script);
            var effectValue = script.getNumberValue("VALUE", script);
            if (effect == "color") {
                sprite.effect.hue = effectValue + sprite.effect.hue;
            } else if (effect == "brightness") {
                sprite.effect.brightness = effectValue + sprite.effect.brightness;
            } else if (effect == "transparency") {
                sprite.effect.alpha = (sprite.effect.alpha - effectValue / 100) ;
            }
            sprite.applyFilter(true);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [""]}
    },
    "set_entity_effect": {
        "color": "#EC4466",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.color, "color"],
                    [Lang.Blocks.brightness, "brightness"],
                    [Lang.Blocks.transparency, "transparency"]
                ],
                "value": "color",
                "fontSize": 11
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/looks_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                {
                    "type": "number",
                    "params": [ "100" ]
                },
                null
            ],
            "type": "set_entity_effect"
        },
        "paramsKeyMap": {
            "EFFECT": 0,
            "VALUE": 1
        },
        "class": "effect",
        "isNotFor": [ "textBox" ],
        "func": function (sprite, script) {
            var effect = script.getField("EFFECT", script);
            var effectValue = script.getNumberValue("VALUE", script);
            if (effect == "color") {
                sprite.effect.hue = effectValue;
            } else if (effect == "brightness") {
                sprite.effect.brightness = effectValue;
            } else if (effect == "transparency") {
                sprite.effect.alpha = 1 - (effectValue / 100);
            }
            sprite.applyFilter(true);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [""]}
    },
    "change_object_index": {
        "color": "#EC4466",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ Lang.Blocks.LOOKS_change_object_index_sub_1, "FRONT" ],
                    [ Lang.Blocks.LOOKS_change_object_index_sub_2, "FORWARD" ],
                    [ Lang.Blocks.LOOKS_change_object_index_sub_3, "BACKWARD" ],
                    [ Lang.Blocks.LOOKS_change_object_index_sub_4, "BACK" ]
                ],
                "value": "FRONT",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_LOOKS
            },
            {
                "type": "Indicator",
                "img": "block_icon/looks_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null ],
            "type": "change_object_index"
        },
        "paramsKeyMap": {
            "LOCATION": 0
        },
        "class": "z-index",
        "isNotFor": [],
        "func": function (sprite, script) {
            var targetIndex;
            var location = script.getField("LOCATION", script);
            var objects = Entry.container.getCurrentObjects();
            var currentIndex = objects.indexOf(sprite.parent);
            var max = objects.length-1

            if (currentIndex < 0)
                throw new Error('object is not available for current scene');

            switch (location) {
                case 'FRONT':
                    targetIndex = 0;
                    break;
                case 'FORWARD':
                    targetIndex = Math.max(0, currentIndex-1);
                    break;
                case 'BACKWARD':
                    targetIndex = Math.min(max, currentIndex+1);
                    break;
                case 'BACK':
                    targetIndex = max;
                    break;

            }

            Entry.container.moveElementByBlock(currentIndex, targetIndex);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Entry.send_layer_to(%1)",
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [ Lang.Blocks.LOOKS_change_object_index_sub_1, "FRONT" ],
                            [ Lang.Blocks.LOOKS_change_object_index_sub_2, "FORWARD" ],
                            [ Lang.Blocks.LOOKS_change_object_index_sub_3, "BACKWARD" ],
                            [ Lang.Blocks.LOOKS_change_object_index_sub_4, "BACK" ]
                        ],
                        "value": "FRONT",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_LOOKS,
                        converter: Entry.block.converters.returnStringValue,
                        codeMap: Entry.CodeMap.Entry.send_layer_to[0]
                    },
                ]
            }
        ]}
    },
    "move_direction": {
        "color": "#A751E3",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/moving_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "number",
                    "params": [ "10" ]
                },
                null
            ],
            "type": "move_direction"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "walk",
        "isNotFor": [],
        "func": function (sprite, script) {
            var value = script.getNumberValue("VALUE", script);
            sprite.setX(sprite.getX() + value * Math.cos((sprite.getRotation() + sprite.getDirection() - 90) / 180 * Math.PI));
            sprite.setY(sprite.getY() - value * Math.sin((sprite.getRotation() + sprite.getDirection() - 90) / 180 * Math.PI));
            if (sprite.brush && !sprite.brush.stop) {
                sprite.brush.lineTo(sprite.getX(), sprite.getY()*-1);
            }
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Entry.move_to_direction(%1)"]}
    },
    "move_x": {
        "color": "#A751E3",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/moving_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "number",
                    "params": [ "10" ]
                },
                null
            ],
            "type": "move_x"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "move_relative",
        "isNotFor": [],
        "func": function (sprite, script) {
            var value = script.getNumberValue("VALUE", script);
            sprite.setX(sprite.getX() + value);
            if (sprite.brush && !sprite.brush.stop) {
                sprite.brush.lineTo(sprite.getX(), sprite.getY()*-1);
            }
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Entry.add_x(%1)"]}
    },
    "move_y": {
        "color": "#A751E3",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/moving_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "number",
                    "params": [ "10" ]
                },
                null
            ],
            "type": "move_y"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "move_relative",
        "isNotFor": [],
        "func": function (sprite, script) {
            var value = script.getNumberValue("VALUE", script);
            sprite.setY(sprite.getY() + value);
            if (sprite.brush && !sprite.brush.stop) {
                sprite.brush.lineTo(sprite.getX(), sprite.getY()*-1);
            }
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Entry.add_y(%1)"]}
    },
    "locate_xy_time": {
        "color": "#A751E3",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/moving_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "number",
                    "params": [ "2" ]
                },
                {
                    "type": "number",
                    "params": [ "10" ]
                },
                {
                    "type": "number",
                    "params": [ "10" ]
                },
                null
            ],
            "type": "locate_xy_time"
        },
        "paramsKeyMap": {
            "VALUE1": 0,
            "VALUE2": 1,
            "VALUE3": 2
        },
        "class": "move_absolute",
        "isNotFor": [],
        "func": function (sprite, script) {
            if (!script.isStart) {
                var timeValue;
                timeValue = script.getNumberValue("VALUE1", script);
                script.isStart = true;
                script.frameCount = Math.max(Math.floor(timeValue * Entry.FPS), 1);
                script.x = script.getNumberValue("VALUE2", script);
                script.y = script.getNumberValue("VALUE3", script);

                if (script.frameCount == 1) action();
            }

            if (script.frameCount != 0) {
                action();
                return script;
            } else {
                delete script.isStart;
                delete script.frameCount;
                return script.callReturn();
            }

            function action() {
                var dX = script.x - sprite.getX();
                var dY = script.y - sprite.getY();
                dX /= script.frameCount;
                dY /= script.frameCount;
                sprite.setX(sprite.getX() + dX);
                sprite.setY(sprite.getY() + dY);
                script.frameCount--;
                if (sprite.brush && !sprite.brush.stop) {
                    sprite.brush.lineTo(sprite.getX(), sprite.getY()*-1);
                }
            }
        },
        "syntax": {"js": [], "py": ["Entry.set_xy_for_sec(%2, %3, %1)"]}
    },
    "rotate_by_angle": {
        "color": "#A751E3",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/moving_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "number",
                    "params": [ "90" ]
                },
                null
            ],
            "type": "rotate_by_angle"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "rotate",
        "isNotFor": [],
        "func": function (sprite, script) {
            var value = script.getNumberValue("VALUE", script);
            sprite.setRotation(sprite.getRotation() + value);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [""]}
    },
    "rotate_by_angle_dropdown": {
        "color": "#A751E3",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ "45", "45" ],
                    [ "90", "90" ],
                    [ "135", "135" ],
                    [ "180", "180" ]
                ],
                "value": "45",
                "fontSize": 11
            },
            {
                "type": "Indicator",
                "img": "block_icon/moving_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ "45", null ],
            "type": "rotate_by_angle_dropdown"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "ebs",
        "isNotFor": [],
        "func": function (sprite, script) {
            var value = script.getField("VALUE", script);
            sprite.setRotation(sprite.getRotation() + Number(value));
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [""]}
    },
    "see_angle": {
        "color": "#A751E3",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/moving_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "number",
                    "params": [ "90" ]
                },
                null
            ],
            "type": "see_angle"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "rotate",
        "isNotFor": [],
        "func": function (sprite, script) {
            var value = script.getNumberValue("VALUE", script);
            sprite.setDirection(value);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [""]}
    },
    "see_direction": {
        "color": "#A751E3",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "DropdownDynamic",
                "value": null,
                "menuName": "sprites",
                "fontSize": 11
            },
            {
                "type": "Indicator",
                "img": "block_icon/moving_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null ]
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "func": function (sprite, script) {
            var targetId = script.getField("VALUE", script);
            var targetEntity = Entry.container.getEntity(targetId);
            var deltaX = targetEntity.getX() - sprite.getX();
            var deltaY = targetEntity.getY() - sprite.getY();
            if (deltaX>=0) {
                sprite.setRotation(Math.atan(deltaY / deltaX) / Math.PI * 180 + 90);
            } else {
                sprite.setRotation(Math.atan(deltaY / deltaX) / Math.PI * 180 + 270);
            }
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [""]}
    },
    "locate_xy": {
        "color": "#A751E3",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/moving_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "number",
                    "params": [ "0" ]
                },
                {
                    "type": "number",
                    "params": [ "0" ]
                },
                null
            ],
            "type": "locate_xy"
        },
        "paramsKeyMap": {
            "VALUE1": 0,
            "VALUE2": 1
        },
        "class": "move_absolute",
        "isNotFor": [],
        "func": function (sprite, script) {
            var value1 = script.getNumberValue("VALUE1", script);
            var value2 = script.getNumberValue("VALUE2", script);
            sprite.setX(value1);
            sprite.setY(value2);
            if (sprite.brush && !sprite.brush.stop) {
                sprite.brush.lineTo(sprite.getX(), sprite.getY()*-1);
            }
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Entry.set_xy(%1, %2)"]}
    },
    "locate_x": {
        "color": "#A751E3",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/moving_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "number",
                    "params": [ "10" ]
                },
                null
            ],
            "type": "locate_x"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "move_absolute",
        "isNotFor": [],
        "func": function (sprite, script) {
            var value = script.getNumberValue("VALUE", script);
            sprite.setX(value);
            if (sprite.brush && !sprite.brush.stop) {
                sprite.brush.lineTo(sprite.getX(), sprite.getY()*-1);
            }
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Entry.set_x(%1)"]}
    },
    "locate_y": {
        "color": "#A751E3",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/moving_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "number",
                    "params": [ "10" ]
                },
                null
            ],
            "type": "locate_y"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "move_absolute",
        "isNotFor": [],
        "func": function (sprite, script) {
            var value = script.getNumberValue("VALUE", script);
            //sprite.y = 340 - value;
            sprite.setY(value);
            if (sprite.brush && !sprite.brush.stop) {
                sprite.brush.lineTo(sprite.getX(), sprite.getY()*-1);
            }
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Entry.set_y(%1)"]}
    },
    "locate": {
        "color": "#A751E3",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "DropdownDynamic",
                "value": null,
                "menuName": "spritesWithMouse",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_MOVING
            },
            {
                "type": "Indicator",
                "img": "block_icon/moving_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null ],
            "type": "locate"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "move_absolute",
        "isNotFor": [],
        "func": function (sprite, script) {
            var targetId = script.getField("VALUE", script);
            var x,y;
            if (targetId == 'mouse') {
                x = Entry.stage.mouseCoordinate.x;
                y = Entry.stage.mouseCoordinate.y;
            } else {
                var targetEntity = Entry.container.getEntity(targetId);
                x = targetEntity.getX();
                y = targetEntity.getY();
            }
            sprite.setX(Number(x));
            sprite.setY(Number(y));
            if (sprite.brush && !sprite.brush.stop) {
                sprite.brush.lineTo(x, y*-1);
            }
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Entry.move_to(%1)",
                textParams: [
                    {
                        "type": "DropdownDynamic",
                        "value": null,
                        "menuName": "spritesWithMouse",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_MOVING,
                        converter: Entry.block.converters.returnStringKey
                    },
                ]
            }
        ]}
    },
    "move_xy_time": {
        "color": "#A751E3",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/moving_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "number",
                    "params": [ "2" ]
                },
                {
                    "type": "number",
                    "params": [ "10" ]
                },
                {
                    "type": "number",
                    "params": [ "10" ]
                },
                null
            ],
            "type": "move_xy_time"
        },
        "paramsKeyMap": {
            "VALUE1": 0,
            "VALUE2": 1,
            "VALUE3": 2
        },
        "class": "move_relative",
        "isNotFor": [],
        "func": function (sprite, script) {
            if (!script.isStart) {
                var timeValue;
                timeValue = script.getNumberValue("VALUE1", script);
                var xValue = script.getNumberValue("VALUE2", script);
                var yValue = script.getNumberValue("VALUE3", script);
                script.isStart = true;
                script.frameCount = Math.max(Math.floor(timeValue * Entry.FPS), 1);
                script.dX = xValue/script.frameCount;
                script.dY = yValue/script.frameCount;

                if (script.frameCount == 1) action();
            }

            if (script.frameCount != 0) {
                action();
                return script;
            } else {
                delete script.isStart;
                delete script.frameCount;
                return script.callReturn();
            }

            function action() {
                sprite.setX(sprite.getX() + script.dX);
                sprite.setY(sprite.getY() + script.dY);
                script.frameCount--;
                if (sprite.brush && !sprite.brush.stop) {
                    sprite.brush.lineTo(sprite.getX(), sprite.getY()*-1);
                }
            };
        },
        "syntax": {"js": [], "py": ["Entry.add_xy_for_sec(%2, %3, %1)"]}
    },
    "rotate_by_angle_time": {
        "color": "#A751E3",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            { "type": "Angle" },
            {
                "type": "Indicator",
                "img": "block_icon/moving_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "number",
                    "params": [ "2" ]
                },
                null,
                null
            ],
            "type": "rotate_by_angle_time"
        },
        "paramsKeyMap": {
            "VALUE": 1
        },
        "class": "rotate",
        "isNotFor": [],
        "func": function (sprite, script) {
            if (!script.isStart) {
                var timeValue;
                timeValue = script.getNumberValue("VALUE", script);
                var angleValue = script.getNumberField("VALUE", script);
                script.isStart = true;
                script.frameCount = Math.floor(timeValue * Entry.FPS)
                script.dAngle = angleValue/script.frameCount;
            }
            if (script.frameCount != 0) {
                sprite.setRotation(sprite.getRotation() + script.dAngle);
                script.frameCount--;
                return script;
            } else {
                delete script.isStart;
                delete script.frameCount;
                return script.callReturn();
            }
        },
        "syntax": {"js": [], "py": [""]}
    },
    "bounce_wall": {
        "color": "#A751E3",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/moving_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "bounce_wall"
        },
        "class": "walk",
        "isNotFor": [],
        "func": function (sprite, script) {
            var threshold = 0;

            var method = sprite.parent.getRotateMethod();
            /*
               var bound = sprite.object.getTransformedBounds();
               var size = {};
               size.width = bound.width * Math.sqrt(1.0 + (bound.height/bound.width) * (bound.height/bound.width));
               size.height = bound.height * Math.sqrt(1.0 + (bound.width/bound.height) * (bound.width/bound.height));
               */

            if (method == 'free')
                var angle = (sprite.getRotation() + sprite.getDirection()).mod(360);
            else
                var angle = sprite.getDirection();

            var skip = Entry.Utils.COLLISION.NONE;
            if ((angle < 90 && angle >= 0) || (angle < 360 && angle >= 270)) {
                skip = (sprite.collision == Entry.Utils.COLLISION.UP);
                var up = ndgmr.checkPixelCollision(Entry.stage.wall.up,sprite.object,threshold,false);
                if (!up && skip)
                    sprite.collision = Entry.Utils.COLLISION.NONE;

                if (up && skip)
                    up = false;

                if (up) {
                    if (method == 'free')
                        sprite.setRotation(- sprite.getRotation() - sprite.getDirection() * 2 + 180);
                    else
                        sprite.setDirection(- sprite.getDirection() + 180);

                    sprite.collision = Entry.Utils.COLLISION.UP;
                    //sprite.setY(135 - bound.height/2 - 1);
                } else {
                    skip = (sprite.collision == Entry.Utils.COLLISION.DOWN);
                    var down = ndgmr.checkPixelCollision(Entry.stage.wall.down,sprite.object,threshold,false);
                    if (!down && skip)
                        sprite.collision = Entry.Utils.COLLISION.NONE;

                    if (down && skip)
                        down = false;

                    if (down) {
                        if (method == 'free')
                            sprite.setRotation(- sprite.getRotation() - sprite.getDirection() * 2 + 180);
                        else
                            sprite.setDirection(- sprite.getDirection() + 180);

                        sprite.collision = Entry.Utils.COLLISION.DOWN;
                        //sprite.setY(-135 + bound.height/2 + 1);
                    }

                }
            } else if (angle < 270 && angle >= 90) {
                skip = (sprite.collision == Entry.Utils.COLLISION.DOWN);
                var down = ndgmr.checkPixelCollision(Entry.stage.wall.down,sprite.object,threshold,false);
                if (!down && skip)
                    sprite.collision = Entry.Utils.COLLISION.NONE;

                if (down && skip)
                    down = false;

                if (down) {
                    if (method == 'free')
                        sprite.setRotation(- sprite.getRotation() - sprite.getDirection() * 2 + 180);
                    else
                        sprite.setDirection(- sprite.getDirection() + 180);

                    sprite.collision = Entry.Utils.COLLISION.DOWN;
                    //sprite.setY(-135 + bound.height/2 + 1);
                } else {
                    skip = (sprite.collision == Entry.Utils.COLLISION.UP);
                    var up = ndgmr.checkPixelCollision(Entry.stage.wall.up,sprite.object,threshold,false);
                    if (!up && skip)
                        sprite.collision = Entry.Utils.COLLISION.NONE;

                    if (up && skip)
                        up = false;

                    if (up) {
                        if (method == 'free')
                            sprite.setRotation(- sprite.getRotation() - sprite.getDirection() * 2 + 180);
                        else
                            sprite.setDirection(- sprite.getDirection() + 180);

                        sprite.collision = Entry.Utils.COLLISION.UP;
                        //sprite.setY(135 - bound.height/2 - 1);
                    }
                }
            }
            if (angle < 360 && angle >= 180) {
                skip = (sprite.collision == Entry.Utils.COLLISION.LEFT);
                var left = ndgmr.checkPixelCollision(Entry.stage.wall.left,sprite.object,threshold,false);
                if (!left && skip)
                    sprite.collision = Entry.Utils.COLLISION.NONE;

                if (left && skip)
                    left = false;

                if (left) {
                    if (method == 'free')
                        sprite.setRotation(- sprite.getRotation() - sprite.getDirection() * 2);
                    else
                        sprite.setDirection(- sprite.getDirection() + 360);

                    sprite.collision = Entry.Utils.COLLISION.LEFT;
                    //sprite.setX(-240 + bound.width/2 + 1);
                } else {
                    skip = (sprite.collision == Entry.Utils.COLLISION.RIGHT);
                    var right = ndgmr.checkPixelCollision(Entry.stage.wall.right,sprite.object,threshold,false);
                    if (!right && skip)
                        sprite.collision = Entry.Utils.COLLISION.NONE;

                    if (right && skip)
                        right = false;

                    if (right) {
                        if (method == 'free')
                            sprite.setRotation(- sprite.getRotation() - sprite.getDirection() * 2);
                        else
                            sprite.setDirection(- sprite.getDirection() + 360);

                        sprite.collision = Entry.Utils.COLLISION.RIGHT;
                        //sprite.setX(240 - bound.width/2 - 1);
                    }

                }
            } else if (angle < 180 && angle >= 0) {
                skip = (sprite.collision == Entry.Utils.COLLISION.RIGHT);
                var right = ndgmr.checkPixelCollision(Entry.stage.wall.right,sprite.object,threshold,false);
                if (!right && skip)
                    sprite.collision = Entry.Utils.COLLISION.NONE;

                if (right && skip)
                    right = false;

                if (right) {
                    if (method == 'free')
                        sprite.setRotation(- sprite.getRotation() - sprite.getDirection() * 2);
                    else
                        sprite.setDirection(- sprite.getDirection() + 360);

                    sprite.collision = Entry.Utils.COLLISION.RIGHT;
                    //sprite.setX(240 - bound.width/2 - 1);
                } else {
                    skip = (sprite.collision == Entry.Utils.COLLISION.LEFT);
                    var left = ndgmr.checkPixelCollision(Entry.stage.wall.left,sprite.object,threshold,false);
                    if (!left && skip)
                        sprite.collision = Entry.Utils.COLLISION.NONE;

                    if (left && skip)
                        left = false;

                    if (left) {
                        if (method == 'free')
                            sprite.setRotation(- sprite.getRotation() - sprite.getDirection() * 2);
                        else
                            sprite.setDirection(- sprite.getDirection() + 360);

                        sprite.collision = Entry.Utils.COLLISION.LEFT;
                        //sprite.setX(-240 + bound.width/2 + 1);
                    }
                }
            }
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Entry.bounce_on_edge()"]}
    },
    "flip_arrow_horizontal": {
        "color": "#A751E3",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/moving_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null ]
        },
        "func": function (sprite, script) {
            sprite.setDirection(sprite.getDirection() + 180);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [""]}
    },
    "flip_arrow_vertical": {
        "color": "#A751E3",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/moving_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null ]
        },
        "func": function (sprite, script) {
            sprite.setDirection(sprite.getDirection() + 180);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [""]}
    },
    "see_angle_object": {
        "color": "#A751E3",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "DropdownDynamic",
                "value": null,
                "menuName": "spritesWithMouse",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_MOVING
            },
            {
                "type": "Indicator",
                "img": "block_icon/moving_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null ],
            "type": "see_angle_object"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "rotate_absolute",
        "isNotFor": [],
        "func": function (sprite, script) {
            var targetId = script.getField("VALUE", script);
            var spriteX = sprite.getX();
            var spriteY = sprite.getY();
            var deltaX, deltaY, value;

            if (sprite.parent.id == targetId)
                return script.callReturn();

            if ( targetId == 'mouse' ) {
                var mX = Entry.stage.mouseCoordinate.x;
                var mY = Entry.stage.mouseCoordinate.y;

                deltaX = mX - spriteX;
                deltaY = mY - spriteY;
            } else {
                var targetEntity = Entry.container.getEntity(targetId);
                deltaX = targetEntity.getX() - spriteX;
                deltaY = targetEntity.getY() - spriteY;
            }

            if(deltaX === 0 && deltaY === 0) {
                value = sprite.getDirection() + sprite.getRotation();
            } else if ( deltaX >= 0 ) {
                value = -Math.atan(deltaY / deltaX) / Math.PI * 180 + 90;
            } else {
                value = -Math.atan(deltaY / deltaX) / Math.PI * 180 + 270;
            }
            var nativeDirection = sprite.getDirection() + sprite.getRotation();
            sprite.setRotation(sprite.getRotation() + value - nativeDirection);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Entry.look_at(%1)",
                textParams: [
                    {
                        "type": "DropdownDynamic",
                        "value": null,
                        "menuName": "spritesWithMouse",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_MOVING,
                        converter: Entry.block.converters.returnStringKey
                    },
                ]
            }
        ]}
    },
    "see_angle_direction": {
        "color": "#A751E3",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/moving_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "number",
                    "params": [ "90" ]
                },
                null
            ],
            "type": "see_angle_direction"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "rotate",
        "isNotFor": [],
        "func": function (sprite, script) {
            var value = script.getNumberValue("VALUE", script);
            var nativeDirection = sprite.getDirection() + sprite.getRotation();
            sprite.setRotation(sprite.getRotation() + value - nativeDirection);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [""]}
    },
    "rotate_direction": {
        "color": "#A751E3",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/moving_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "number",
                    "params": [ "90" ]
                },
                null
            ],
            "type": "rotate_direction"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "rotate",
        "isNotFor": [],
        "func": function (sprite, script) {
            var value = script.getNumberValue("VALUE", script);
            sprite.setDirection(value + sprite.getDirection());
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [""]}
    },
    "locate_object_time": {
        "color": "#A751E3",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "DropdownDynamic",
                "value": null,
                "menuName": "spritesWithMouse",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_MOVING
            },
            {
                "type": "Indicator",
                "img": "block_icon/moving_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "number",
                    "params": [ "2" ]
                },
                null,
                null
            ],
            "type": "locate_object_time"
        },
        "paramsKeyMap": {
            "VALUE": 0,
            "TARGET": 1
        },
        "class": "move_absolute",
        "isNotFor": [],
        "func": function (sprite, script) {
            if (!script.isStart) {
                var timeValue, xValue, yValue;
                var targetId = script.getField("TARGET", script);
                timeValue = script.getNumberValue("VALUE", script);
                var frameCount = Math.floor(timeValue * Entry.FPS);
                var mouseCoordi = Entry.stage.mouseCoordinate;

                if (frameCount != 0) {
                    if (targetId == 'mouse') {
                        xValue = mouseCoordi.x - sprite.getX();
                        yValue = mouseCoordi.y - sprite.getY();
                    } else {
                        var targetEntity = Entry.container.getEntity(targetId);
                        xValue = targetEntity.getX() - sprite.getX();
                        yValue = targetEntity.getY() - sprite.getY();
                    }
                    script.isStart = true;
                    script.frameCount = frameCount;
                    script.dX = xValue/script.frameCount;
                    script.dY = yValue/script.frameCount;
                } else {
                    //frame count is zero so execute immediately
                    if (targetId == 'mouse') {
                        xValue = Number(mouseCoordi.x);
                        yValue = Number(mouseCoordi.y);
                    } else {
                        var targetEntity = Entry.container.getEntity(targetId);
                        xValue = targetEntity.getX();
                        yValue = targetEntity.getY();
                    }
                    sprite.setX(xValue);
                    sprite.setY(yValue);
                    if (sprite.brush && !sprite.brush.stop) {
                        sprite.brush.lineTo(sprite.getX(), sprite.getY()*-1);
                    }
                    return script.callReturn();
                }
            }
            if (script.frameCount != 0) {
                sprite.setX(sprite.getX() + script.dX);
                sprite.setY(sprite.getY() + script.dY);
                script.frameCount--;
                if (sprite.brush && !sprite.brush.stop)
                    sprite.brush.lineTo(sprite.getX(), sprite.getY()*-1);
                return script;
            } else {
                delete script.isStart;
                delete script.frameCount;
                return script.callReturn();
            }
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Entry.move_to_for_sec(%2, %1)",
                textParams: [
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    {
                        "type": "DropdownDynamic",
                        "value": null,
                        "menuName": "spritesWithMouse",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_MOVING,
                        converter: Entry.block.converters.returnStringKey
                    },
                ]
            }
        ]}
    },
    "rotate_absolute": {
        "color": "#A751E3",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/moving_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                { "type": "angle" },
                null
            ],
            "type": "rotate_absolute"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "rotate_absolute",
        "isNotFor": [],
        "func": function (entity, script) {
            var value = script.getNumberValue("VALUE", script);
            entity.setRotation(value);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Entry.set_rotation(%1)"]}
    },
    "rotate_relative": {
        "color": "#A751E3",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/moving_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                { "type": "angle" },
                null
            ],
            "type": "rotate_relative"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "rotate",
        "isNotFor": [],
        "func": function (entity, script) {
            var value = script.getNumberValue("VALUE", script);
            entity.setRotation(value + entity.getRotation());
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Entry.add_rotation(%1)"]}
    },
    "direction_absolute": {
        "color": "#A751E3",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/moving_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                { "type": "angle" },
                null
            ],
            "type": "direction_absolute"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "rotate_absolute",
        "isNotFor": [],
        "func": function (entity, script) {
            var value = script.getNumberValue("VALUE", script);
            entity.setDirection(value);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Entry.set_direction(%1)"]}
    },
    "direction_relative": {
        "color": "#A751E3",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/moving_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                { "type": "angle" },
                null
            ],
            "type": "direction_relative"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "rotate",
        "isNotFor": [],
        "func": function (entity, script) {
            var value = script.getNumberValue("VALUE", script);
            entity.setDirection(value + entity.getDirection());
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Entry.add_direction(%1)"]}
    },
    "move_to_angle": {
        "color": "#A751E3",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/moving_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                { "type": "angle" },
                {
                    "type": "number",
                    "params": [ "10" ]
                },
                null
            ],
            "type": "move_to_angle"
        },
        "paramsKeyMap": {
            "ANGLE": 0,
            "VALUE": 1
        },
        "class": "move_rotate",
        "isNotFor": [],
        "func": function (sprite, script) {
            var value = script.getNumberValue("VALUE", script);
            var angle = script.getNumberValue("ANGLE", script);
            sprite.setX(sprite.getX() + value * Math.cos((angle - 90) / 180 * Math.PI));
            sprite.setY(sprite.getY() - value * Math.sin((angle - 90) / 180 * Math.PI));
            if (sprite.brush && !sprite.brush.stop) {
                sprite.brush.lineTo(sprite.getX(), sprite.getY()*-1);
            }
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Entry.move_to_degree(%2, %1)"]}
    },
    "rotate_by_time": {
        "color": "#A751E3",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/moving_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "number",
                    "params": [ "2" ]
                },
                {
                    "type": "angle"
                },
                null
            ],
            "type": "rotate_by_time"
        },
        "paramsKeyMap": {
            "VALUE": 0,
            "ANGLE": 1
        },
        "class": "rotate",
        "isNotFor": [],
        "func": function (sprite, script) {
            if (!script.isStart) {
                var timeValue;
                timeValue = script.getNumberValue("VALUE", script);
                var angleValue = script.getNumberValue("ANGLE", script);
                script.isStart = true;
                script.frameCount = Math.max(Math.floor(timeValue * Entry.FPS), 1);
                script.dAngle = angleValue/script.frameCount;

                if (script.frameCount == 1) action();
            }
            if (script.frameCount != 0) {
                action();
                return script;
            } else {
                delete script.isStart;
                delete script.frameCount;
                return script.callReturn();
            }

            function action() {
                sprite.setRotation(sprite.getRotation() + script.dAngle);
                script.frameCount--;
            }
        },
        "syntax": {"js": [], "py": ["Entry.add_rotation_for_sec(%2, %1)"]}
    },
    "direction_relative_duration": {
        "color": "#A751E3",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/moving_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "text",
                    "params": [ "2" ]
                },
                { "type": "angle" },
                null
            ],
            "type": "direction_relative_duration"
        },
        "paramsKeyMap": {
            "DURATION": 0,
            "AMOUNT": 1
        },
        "class": "rotate",
        "isNotFor": [],
        "func": function (sprite, script) {
            if (!script.isStart) {
                var timeValue;
                timeValue = script.getNumberValue("DURATION", script);
                var directionValue = script.getNumberValue("AMOUNT", script);
                script.isStart = true;
                script.frameCount = Math.max(Math.floor(timeValue * Entry.FPS), 1);
                script.dDirection = directionValue/script.frameCount;

                if (script.frameCount == 1) action();
            }
            if (script.frameCount != 0) {
                action();
                return script;
            } else {
                delete script.isStart;
                delete script.frameCount;
                delete script.dDirection;
                return script.callReturn();
            }

            function action() {
                sprite.setDirection(sprite.getDirection() + script.dDirection);
                script.frameCount--;
            }
        },
        "syntax": {"js": [], "py": ["Entry.add_direction_for_sec(%2, %1)"]}

    },
    "neobot_sensor_value": {
        "color": "#00979D",
        "skeleton": "basic_string_field",
        "fontColor": "#fff",
        "statements": [],
        "template": "%1  값",
        "params": [{
            "type": "Dropdown",
            "options": [
                ["1번 포트", "IN1"],
                ["2번 포트", "IN2"],
                ["3번 포트", "IN3"],
                ["리모컨", "IR"],
                ["배터리", "BAT"]
            ],
            "value": "IN1",
            "fontSize": 11
        }],
        "events": {},
        "def": {
            "params": [null],
            "type": "neobot_sensor_value"
        },
        "paramsKeyMap": {
            "PORT": 0
        },
        "class": "neobot_value",
        "isNotFor": ["neobot"],
        "func": function (sprite, script) {
            var port = script.getStringField('PORT');
            return Entry.hw.portData[port];
        },
        "syntax": {"js": [], "py": ["Neobot.sensor_value(%1)"]}
    },
    "neobot_sensor_convert_scale": {
        "color": "#00979D",
        "skeleton": "basic_string_field",
        "fontColor": "#fff",
        "statements": [],
        "template": "%1 값의 범위를 %2 ~ %3 에서 %4 ~ %5 (으)로 변환",
        "params": [{
            "type": "Dropdown",
            "options": [
                ["1번 포트", "IN1"],
                ["2번 포트", "IN2"],
                ["3번 포트", "IN3"],
                ["리모컨", "IR"],
                ["배터리", "BAT"]
            ],
            "value": "IN1",
            "fontSize": 11
        }, {
            "type": "Block",
            "accept": "string"
        }, {
            "type": "Block",
            "accept": "string"
        }, {
            "type": "Block",
            "accept": "string"
        }, {
            "type": "Block",
            "accept": "string"
        }],
        "events": {},
        "def": {
            "params": [null, {
                "type": "number",
                "params": [ "0" ]
            }, {
                "type": "number",
                "params": [ "255" ]
            }, {
                "type": "number",
                "params": [ "0" ]
            }, {
                "type": "number",
                "params": [ "100" ]
            }],
            "type": "neobot_sensor_convert_scale"
        },
        "paramsKeyMap": {
            "PORT": 0,
            "OMIN": 1,
            "OMAX": 2,
            "MIN": 3,
            "MAX": 4
        },
        "class": "neobot_value",
        "isNotFor": ["neobot"],
        "func": function (sprite, script) {
            var port = script.getStringField('PORT');
            var value = Entry.hw.portData[port];
            var omin = script.getNumberValue("OMIN", script);
            var omax = script.getNumberValue("OMAX", script);
            var min = script.getNumberValue("MIN", script);
            var max = script.getNumberValue("MAX", script);

            if (omin > omax) {
                var temp = omin;
                omin = omax;
                omax = temp;
            }

            if(min > max) {
                var temp = min;
                min = max;
                max = temp;
            }

            value -= omin;
            value = value * ((max - min) / (omax - omin));
            value += min;
            value = Math.min(max, value);
            value = Math.max(min, value);

            return Math.round(value);
        }
    },
    "neobot_left_motor": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "template": "왼쪽 모터를 %1 %2 의 속도로 회전 %3",
        "params": [{
            "type": "Dropdown",
            "options": [
                ["앞으로", "16"],
                ["뒤로", "32"]
            ],
            "value": "16",
            "fontSize": 11,
            'arrowColor': EntryStatic.ARROW_COLOR_HW
        }, {
            "type": "Dropdown",
            "options": [
                ["0", "0"],
                ["1", "1"],
                ["2", "2"],
                ["3", "3"],
                ["4", "4"],
                ["5", "5"],
                ["6", "6"],
                ["7", "7"],
                ["8", "8"],
                ["9", "9"],
                ["10", "10"],
                ["11", "11"],
                ["12", "12"],
                ["13", "13"],
                ["14", "14"],
                ["15", "15"]
            ],
            "value": "0",
            "fontSize": 11,
            'arrowColor': EntryStatic.ARROW_COLOR_HW
        }, {
            "type": "Indicator",
            "img": "block_icon/hardware_03.png",
            "size": 12
        }],
        "events": {},
        "def": {
            "params": [null, "15", null],
            "type": "neobot_left_motor"
        },
        "paramsKeyMap": {
            "DIRECTION": 0,
            "SPEED": 1
        },
        "class": "neobot_motor",
        "isNotFor": ["neobot"],
        "func": function (sprite, script) {
            var speed = script.getNumberField('SPEED');
            var direction = script.getNumberField('DIRECTION');
            Entry.hw.sendQueue['DCL'] = speed + direction;
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Neobot.turn_left(%1, %2)"]}
    },
    "neobot_stop_left_motor": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "template": "왼쪽 모터를 정지 %1",
        "params": [{
            "type": "Indicator",
            "img": "block_icon/hardware_03.png",
            "size": 12
        }],
        "events": {},
        "def": {
            "params": [null],
            "type": "neobot_stop_left_motor"
        },
        "class": "neobot_motor",
        "isNotFor": ["neobot"],
        "func": function (sprite, script) {
            Entry.hw.sendQueue['DCL'] = 0;
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Neobot.stop_left()"]}
    },
    "neobot_right_motor": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "template": "오른쪽 모터를 %1 %2 의 속도로 회전 %3",
        "params": [{
            "type": "Dropdown",
            "options": [
                ["앞으로", "16"],
                ["뒤로", "32"]
            ],
            "value": "16",
            "fontSize": 11,
            'arrowColor': EntryStatic.ARROW_COLOR_HW
        }, {
            "type": "Dropdown",
            "options": [
                ["0", "0"],
                ["1", "1"],
                ["2", "2"],
                ["3", "3"],
                ["4", "4"],
                ["5", "5"],
                ["6", "6"],
                ["7", "7"],
                ["8", "8"],
                ["9", "9"],
                ["10", "10"],
                ["11", "11"],
                ["12", "12"],
                ["13", "13"],
                ["14", "14"],
                ["15", "15"]
            ],
            "value": "0",
            "fontSize": 11,
            'arrowColor': EntryStatic.ARROW_COLOR_HW
        }, {
            "type": "Indicator",
            "img": "block_icon/hardware_03.png",
            "size": 12
        }],
        "events": {},
        "def": {
            "params": [null, "15", null],
            "type": "neobot_right_motor"
        },
        "paramsKeyMap": {
            "DIRECTION": 0,
            "SPEED": 1
        },
        "class": "neobot_motor",
        "isNotFor": ["neobot"],
        "func": function (sprite, script) {
            var speed = script.getNumberField('SPEED');
            var direction = script.getNumberField('DIRECTION');
            Entry.hw.sendQueue['DCR'] = speed + direction;
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Neobot.turn_right(%1, %2)"]}
    },
    "neobot_stop_right_motor": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "template": "오른쪽 모터를 정지 %1",
        "params": [{
            "type": "Indicator",
            "img": "block_icon/hardware_03.png",
            "size": 12
        }],
        "events": {},
        "def": {
            "params": [null],
            "type": "neobot_stop_right_motor"
        },
        "class": "neobot_motor",
        "isNotFor": ["neobot"],
        "func": function (sprite, script) {
            Entry.hw.sendQueue['DCR'] = 0;
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Neobot.stop_right()"]}
    },
    "neobot_all_motor": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "template": "양쪽 모터를 %1 %2의 속도로 %3초 동안 회전 %4",
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ "앞으로", "1" ],
                    [ "뒤로", "2" ],
                    [ "제자리에서 왼쪽 돌기", "3" ],
                    [ "제자리에서 오른쪽 돌기", "4" ],
                    [ "왼쪽으로 돌기", "5" ],
                    [ "오른쪽으로 돌기", "6" ]
                ],
                "value": "1",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_HW
            },
            {
                "type": "Dropdown",
                "options": [
                    [ "0", "0" ],
                    [ "1", "1" ],
                    [ "2", "2" ],
                    [ "3", "3" ],
                    [ "4", "4" ],
                    [ "5", "5" ],
                    [ "6", "6" ],
                    [ "7", "7" ],
                    [ "8", "8" ],
                    [ "9", "9" ],
                    [ "10", "10" ],
                    [ "11", "11" ],
                    [ "12", "12" ],
                    [ "13", "13" ],
                    [ "14", "14" ],
                    [ "15", "15" ]
                ],
                "value": "1",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_HW
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": ["1", "15", {
                "type": "number",
                "params": ["0"]
            }],
            "type": "neobot_all_motor"
        },
        "paramsKeyMap": {
            "DIRECTION": 0,
            "SPEED": 1,
            "DURATION": 2
        },
        "class": "neobot_motor",
        "isNotFor": ["neobot"],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;

            if (!script.isStart) {
                var speed = script.getNumberField('SPEED');
                var direction = script.getNumberField('DIRECTION');
                var duration = script.getNumberValue('DURATION');

                if(duration < 0) {
                    duration = 0;
                }

                switch (direction) {
                    case 1:
                    Entry.hw.sendQueue['DCL'] = 0x10 + speed;
                    Entry.hw.sendQueue['DCR'] = 0x10 + speed;
                    break;
                    case 2:
                    Entry.hw.sendQueue['DCL'] = 0x20 + speed;
                    Entry.hw.sendQueue['DCR'] = 0x20 + speed;
                    break;
                    case 3:
                    Entry.hw.sendQueue['DCL'] = 0x20 + speed;
                    Entry.hw.sendQueue['DCR'] = 0x10 + speed;
                    break;
                    case 4:
                    Entry.hw.sendQueue['DCL'] = 0x10 + speed;
                    Entry.hw.sendQueue['DCR'] = 0x20 + speed;
                    break;
                    case 5:
                    Entry.hw.sendQueue['DCL'] = 0;
                    Entry.hw.sendQueue['DCR'] = 0x10 + speed;
                    break;
                    case 6:
                    Entry.hw.sendQueue['DCL'] = 0x10 + speed;
                    Entry.hw.sendQueue['DCR'] = 0;
                    break;
                }

                if(duration === 0) {
                    return script.callReturn();
                } else {
                    script.isStart = true;
                    script.timeFlag = 1;
                    setTimeout(function() {
                        script.timeFlag = 0;
                    }, duration * 1000);
                    return script;
                }
            } else if (script.timeFlag == 1) {
                return script;
            } else {
                delete script.timeFlag;
                delete script.isStart;
                Entry.hw.sendQueue['DCL'] = 0;
                Entry.hw.sendQueue['DCR'] = 0;
                Entry.engine.isContinue = false;
                return script.callReturn();
            }
        }
    },
    "neobot_stop_all_motor": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "template": "양쪽 모터를 정지 %1",
        "params": [{
            "type": "Indicator",
            "img": "block_icon/hardware_03.png",
            "size": 12
        }],
        "events": {},
        "def": {
            "params": [null],
            "type": "neobot_stop_all_motor",
        },
        "class": "neobot_motor",
        "isNotFor": ["neobot"],
        "func": function (sprite, script) {
            Entry.hw.sendQueue['DCL'] = 0;
            Entry.hw.sendQueue['DCR'] = 0;
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Neobot.run_motor(%1, %2, %3, %4)"]}
    },
    "neobot_set_servo": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "template": "%1 포트의 서보모터를 %2 도 이동 %3",
        "params": [{
            "type": "Dropdown",
            "options": [
                ["OUT1", "1"],
                ["OUT2", "2"],
                ["OUT3", "3"]
            ],
            "value": "1",
            "fontSize": 11,
            'arrowColor': EntryStatic.ARROW_COLOR_HW
        }, {
            "type": "Block",
            "accept": "string"
        }, {
            "type": "Indicator",
            "img": "block_icon/hardware_03.png",
            "size": 12
        }],
        "events": {},
        "def": {
            "params": [null, null, null],
            "type": "neobot_set_servo"
        },
        "paramsKeyMap": {
            "PORT": 0,
            "DEGREE": 1
        },
        "class": "neobot_output",
        "isNotFor": ["neobot"],
        "func": function (sprite, script) {
            var port = script.getNumberField('PORT');
            var degree = script.getNumberValue('DEGREE');
            if(degree < 0) {
                degree = 0;
            } else if(degree > 180){
                degree = 180;
            }
            Entry.hw.sendQueue['OUT' + port] = degree;
            var option = port;
            if(option === 3) {
                option = 4;
            }
            Entry.hw.sendQueue['OPT'] = Entry.hw.sendQueue['OPT'] | option;
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Neobot.servo_1(%1, %2)"]}
    },
    "neobot_set_output": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "template": "%1 번 포트의 값을 %2 만큼 출력 %3",
        "params": [{
            "type": "Dropdown",
            "options": [
                ["OUT1", "1"],
                ["OUT2", "2"],
                ["OUT3", "3"]
            ],
            "value": "1",
            "fontSize": 11,
            'arrowColor': EntryStatic.ARROW_COLOR_HW
        }, {
            "type": "Block",
            "accept": "string"
        }, {
            "type": "Indicator",
            "img": "block_icon/hardware_03.png",
            "size": 12
        }],
        "events": {},
        "def": {
            "params": [null, {
                "type": "number",
                "params": ["255"]
            }, null],
            "type": "neobot_set_output",
        },
        "paramsKeyMap": {
            "PORT": 0,
            "VALUE": 1
        },
        "class": "neobot_output",
        "isNotFor": ["neobot"],
        "func": function (sprite, script) {
            var port = script.getStringField('PORT', script);
            var value = script.getNumberValue('VALUE', script);
            var option = port;
            if(value < 0) {
                value = 0;
            } else if (value > 255) {
                value = 255;
            }
            if(option === 3) {
                option = 4;
            }
            Entry.hw.sendQueue['OUT' + port] = value;
            Entry.hw.sendQueue['OPT'] = Entry.hw.sendQueue['OPT'] & (~option);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Neobot.servo_2(%1, %2)"]}
    },
    "neobot_set_fnd": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "template": "FND에 %1 출력 %2",
        "params": [{
            "type": "Block",
            "accept": "string"
        }, {
            "type": "Indicator",
            "img": "block_icon/hardware_03.png",
            "size": 12
        }],
        "events": {},
        "def": {
            "params": [ {
                "type": "number",
                "params": [ "0" ]
            }, null],
            "type": "neobot_set_fnd"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "neobot_output",
        "isNotFor": ["neobot"],
        "func": function (sprite, script) {
            var value = script.getNumberValue('VALUE', script);
            if(value > 99) {
                value = 99;
            }
            Entry.hw.sendQueue['FND'] = parseInt('0x' + value);
            Entry.hw.sendQueue['OPT'] = Entry.hw.sendQueue['OPT'] | 8;
            return script.callReturn();
        }
    },
    "neobot_set_fnd_off": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "template": "FND 출력 끄기 %1",
        "params": [{
            "type": "Indicator",
            "img": "block_icon/hardware_03.png",
            "size": 12
        }],
        "events": {},
        "def": {
            "params": [null],
            "type": "neobot_set_fnd_off"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "neobot_output",
        "isNotFor": ["neobot"],
        "func": function (sprite, script) {
            Entry.hw.sendQueue['FND'] = parseInt('0x00');
            Entry.hw.sendQueue['OPT'] = Entry.hw.sendQueue['OPT'] & (~8);
            return script.callReturn();
        }
    },
    "neobot_play_note_for": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "template": "멜로디 %1 을(를) %2 옥타브로 %3 길이만큼 소리내기 %4",
        "params": [{
            "type": "Dropdown",
            "options": [
                ["무음", "0"],
                ["도", "1"],
                ["도#", "2"],
                ["레", "3"],
                ["레#", "4"],
                ["미", "5"],
                ["파", "6"],
                ["파#", "7"],
                ["솔", "8"],
                ["솔#", "9"],
                ["라", "10"],
                ["라#", "11"],
                ["시", "12"]
            ],
            "value": "0",
            "fontSize": 11
        }, {
            "type": "Dropdown",
            "options": [
                ["1", "0"],
                ["2", "1"],
                ["3", "2"],
                ["4", "3"],
                ["5", "4"],
                ["6", "5"]
            ],
            "value": "0",
            "fontSize": 11
        }, {
            "type": "Dropdown",
            "options": [
                ["2분음표", "2"],
                ["4분음표", "4"],
                ["8분음표", "8"],
                ["16분음표", "16"]
            ],
            "value": "2",
            "fontSize": 11
        }, {
            "type": "Indicator",
            "img": "block_icon/hardware_03.png",
            "size": 12
        }],
        "events": {},
        "def": {
            "params": ["1", "2", "4", null],
            "type": "neobot_play_note_for"
        },
        "paramsKeyMap": {
            "NOTE": 0,
            "OCTAVE": 1,
            "DURATION": 2
        },
        "class": "neobot_note",
        "isNotFor": ["neobot"],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;

            if (!script.isStart) {
                var note = script.getNumberField("NOTE", script);
                var octave = script.getNumberField("OCTAVE", script);
                var duration = script.getNumberField("DURATION", script);
                var value = (note > 0) ? note + (12 * octave) : 0;

                script.isStart = true;
                script.timeFlag = 1;
                if(value > 65) {
                    value = 65;
                }
                sq.SND = value;
                setTimeout(function() {
                    script.timeFlag = 0;
                }, 1 / duration * 2000);
                return script;
            } else if (script.timeFlag == 1) {
                return script;
            } else {
                delete script.timeFlag;
                delete script.isStart;
                Entry.hw.sendQueue['SND'] = 0;
                Entry.engine.isContinue = false;
                return script.callReturn();
            }

        },
        "syntax": {"js": [], "py": ["Neobot.play_note(%1, %2, %3)"]}
    },
    "robotis_openCM70_cm_custom_value": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Dropdown",
                "options": [
                    [ "BYTE", "BYTE" ],
                    [ "WORD", "WORD" ],
                    [ "DWORD", "DWORD" ]
                ],
                "value": "BYTE",
                "fontSize": 11
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "number",
                    "params": [ "0" ]
                },
                null
            ],
            "type": "robotis_openCM70_cm_custom_value"
        },
        "paramsKeyMap": {
            "VALUE": 0,
            "SIZE": 1
        },
        "class": "robotis_openCM70_custom",
        "isNotFor": [ "robotis_openCM70" ],
        "func": function (sprite, script) {

            var scope = script.executor.scope;
            if(!scope.isStart) {
                scope.isStart = true;
                scope.count = 0;

                // instruction / address / length / value / default length
                var data_instruction = Entry.Robotis_openCM70.INSTRUCTION.READ;
                var data_address = 0;
                var data_length = 0;
                var data_value = 0;

                var data_default_address = 0;
                var data_default_length = 0;

                var size = script.getStringField("SIZE");

                if (size == 'BYTE') {
                    data_length = 1;
                } else if (size == 'WORD') {
                    data_length = 2;
                } else if (size == 'DWORD') {
                    data_length = 4;
                }

                data_address = script.getNumberValue('VALUE');

                data_default_address = data_address;
                data_default_length = data_length;

                Entry.Robotis_carCont.setRobotisData([[data_instruction, data_address, data_length, data_value, data_default_length]]);
                // Entry.hw.socket.send(JSON.stringify(Entry.hw.sendQueue));
                Entry.Robotis_carCont.update();

                scope.data_default_address = data_default_address;
                throw new Entry.Utils.AsyncError();
            }  else if(scope.count < 2) {
                scope.count++;
                throw new Entry.Utils.AsyncError();
            }
            scope.isStart = false;
            var result = Entry.hw.portData[scope.data_default_address];
            scope.data_default_address = undefined;
            return result;
        },
        "syntax": {"js": [], "py": ["Robotis.opencm70_cm_custom_value(%1, %2)"]}
    },
    "robotis_openCM70_sensor_value": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ Lang.Blocks.robotis_cm_sound_detected, "CM_SOUND_DETECTED" ],
                    [ Lang.Blocks.robotis_cm_sound_detecting, "CM_SOUND_DETECTING" ],
                    [ Lang.Blocks.robotis_cm_user_button, "CM_USER_BUTTON" ]
                ],
                "value": "CM_SOUND_DETECTED",
                "fontSize": 11
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "robotis_openCM70_sensor_value"
        },
        "paramsKeyMap": {
            "SENSOR": 0
        },
        "class": "robotis_openCM70_cm",
        "isNotFor": [ "robotis_openCM70" ],
        "func": function (sprite, script) {
            var scope = script.executor.scope;
            if(!scope.isStart) {
                scope.isStart = true;
                scope.count = 0;
                var data_instruction = Entry.Robotis_openCM70.INSTRUCTION.READ;
                var data_address = 0;
                var data_length = 0;
                var data_value = 0;

                var data_default_address = 0;
                var data_default_length = 0;

                var sensor = script.getStringField("SENSOR");

                var increase = 0;

                if (sensor == 'CM_SOUND_DETECTED') {
                    data_default_address = Entry.Robotis_openCM70.CONTROL_TABLE.CM_SOUND_DETECTED[0];
                    data_default_length = Entry.Robotis_openCM70.CONTROL_TABLE.CM_SOUND_DETECTED[1];
                    data_address = Entry.Robotis_openCM70.CONTROL_TABLE.CM_SOUND_DETECTED[0];
                    data_length = Entry.Robotis_openCM70.CONTROL_TABLE.CM_SOUND_DETECTED[1];
                } else if (sensor == 'CM_SOUND_DETECTING') {
                    data_default_address = Entry.Robotis_openCM70.CONTROL_TABLE.CM_SOUND_DETECTING[0];
                    data_default_length = Entry.Robotis_openCM70.CONTROL_TABLE.CM_SOUND_DETECTING[1];
                    data_address = Entry.Robotis_openCM70.CONTROL_TABLE.CM_SOUND_DETECTING[0];
                    data_length = Entry.Robotis_openCM70.CONTROL_TABLE.CM_SOUND_DETECTING[1];
                } else if (sensor == 'CM_USER_BUTTON') {
                    data_default_address = Entry.Robotis_openCM70.CONTROL_TABLE.CM_USER_BUTTON[0];
                    data_default_length = Entry.Robotis_openCM70.CONTROL_TABLE.CM_USER_BUTTON[1];
                    data_address = Entry.Robotis_openCM70.CONTROL_TABLE.CM_USER_BUTTON[0];
                    data_length = Entry.Robotis_openCM70.CONTROL_TABLE.CM_USER_BUTTON[1];
                }

                data_default_address = data_default_address + increase * data_default_length;

                Entry.Robotis_carCont.setRobotisData([[data_instruction, data_address, data_length, data_value, data_default_length]]);
                // Entry.hw.socket.send(JSON.stringify(Entry.hw.sendQueue));
                Entry.Robotis_carCont.update();
                scope.data_default_address = data_default_address;
                throw new Entry.Utils.AsyncError();
            } else if(scope.count < 2) {
                scope.count++;
                throw new Entry.Utils.AsyncError();
            }
            scope.isStart = false;
            var result = Entry.hw.portData[scope.data_default_address];
            scope.data_default_address = undefined;
            return result;
        },
        "syntax": {"js": [], "py": ["Robotis.opencm70_sensor_value(%1)"]}
    },
    "robotis_openCM70_aux_sensor_value": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ "3", "PORT_3" ],
                    [ "4", "PORT_4" ],
                    [ "5", "PORT_5" ],
                    [ "6", "PORT_6" ]
                ],
                "value": "PORT_3",
                "fontSize": 11
            },
            {
                "type": "Dropdown",
                "options": [
                    [ Lang.Blocks.robotis_aux_servo_position, "AUX_SERVO_POSITION" ],
                    [ Lang.Blocks.robotis_aux_ir, "AUX_IR" ],
                    [ Lang.Blocks.robotis_aux_touch, "AUX_TOUCH" ],
                    [ Lang.Blocks.robotis_aux_brightness, "AUX_BRIGHTNESS" ],
                    [ Lang.Blocks.robotis_aux_hydro_themo_humidity, "AUX_HYDRO_THEMO_HUMIDITY" ],
                    [ Lang.Blocks.robotis_aux_hydro_themo_temper, "AUX_HYDRO_THEMO_TEMPER" ],
                    [ Lang.Blocks.robotis_aux_temperature, "AUX_TEMPERATURE" ],
                    [ Lang.Blocks.robotis_aux_ultrasonic, "AUX_ULTRASONIC" ],
                    [ Lang.Blocks.robotis_aux_magnetic, "AUX_MAGNETIC" ],
                    [ Lang.Blocks.robotis_aux_motion_detection, "AUX_MOTION_DETECTION" ],
                    [ Lang.Blocks.robotis_aux_color, "AUX_COLOR" ],
                    [ Lang.Blocks.robotis_aux_custom, "AUX_CUSTOM" ]
                ],
                "value": "AUX_SERVO_POSITION",
                "fontSize": 11
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null ],
            "type": "robotis_openCM70_aux_sensor_value"
        },
        "paramsKeyMap": {
            "PORT": 0,
            "SENSOR": 1
        },
        "class": "robotis_openCM70_cm",
        "isNotFor": [ "robotis_openCM70" ],
        "func": function (sprite, script) {
            var scope = script.executor.scope;
            if(!scope.isStart) {
                scope.isStart = true;
                scope.count = 0;
                // instruction / address / length / value / default length
                var data_instruction = Entry.Robotis_openCM70.INSTRUCTION.READ;
                var data_address = 0;
                var data_length = 0;
                var data_value = 0;

                var data_default_address = 0;
                var data_default_length = 0;

                var port = script.getStringField("PORT");
                var sensor = script.getStringField("SENSOR");

                var increase = 0;
                if (port == 'PORT_3') {
                    increase = 2;
                } else if (port == 'PORT_4') {
                    increase = 3;
                } else if (port == 'PORT_5') {
                    increase = 4;
                } else if (port == 'PORT_6') {
                    increase = 5;
                }

                if (sensor == 'AUX_SERVO_POSITION') {
                    data_default_address = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_SERVO_POSITION[0];
                    data_default_length = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_SERVO_POSITION[1];
                    data_address = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_SERVO_POSITION[0];
                    data_length = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_SERVO_POSITION[1];
                } else if (sensor == 'AUX_IR') {
                    data_default_address = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_IR[0];
                    data_default_length = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_IR[1];
                    data_address = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_IR[0];
                    data_length = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_IR[1];
                } else if (sensor == 'AUX_TOUCH') {
                    data_default_address = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_TOUCH[0];
                    data_default_length = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_TOUCH[1];
                    data_address = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_TOUCH[0];
                    data_length = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_TOUCH[1];
                } else if (sensor == 'AUX_TEMPERATURE') {
                    data_default_address = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_TEMPERATURE[0];
                    data_default_length = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_TEMPERATURE[1];
                    data_address = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_TEMPERATURE[0];
                    data_length = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_TEMPERATURE[1];
                } else if (sensor == 'AUX_BRIGHTNESS') {
                    data_default_address = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_BRIGHTNESS[0];
                    data_default_length = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_BRIGHTNESS[1];
                    data_address = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_BRIGHTNESS[0];
                    data_length = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_BRIGHTNESS[1];
                } else if (sensor == 'AUX_HYDRO_THEMO_HUMIDITY') {
                    data_default_address = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_HYDRO_THEMO_HUMIDITY[0];
                    data_default_length = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_HYDRO_THEMO_HUMIDITY[1];
                    data_address = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_HYDRO_THEMO_HUMIDITY[0];
                    data_length = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_HYDRO_THEMO_HUMIDITY[1];
                } else if (sensor == 'AUX_HYDRO_THEMO_TEMPER') {
                    data_default_address = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_HYDRO_THEMO_TEMPER[0];
                    data_default_length = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_HYDRO_THEMO_TEMPER[1];
                    data_address = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_HYDRO_THEMO_TEMPER[0];
                    data_length = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_HYDRO_THEMO_TEMPER[1];
                } else if (sensor == 'AUX_ULTRASONIC') {
                    data_default_address = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_ULTRASONIC[0];
                    data_default_length = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_ULTRASONIC[1];
                    data_address = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_ULTRASONIC[0];
                    data_length = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_ULTRASONIC[1];
                } else if (sensor == 'AUX_MAGNETIC') {
                    data_default_address = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_MAGNETIC[0];
                    data_default_length = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_MAGNETIC[1];
                    data_address = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_MAGNETIC[0];
                    data_length = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_MAGNETIC[1];
                } else if (sensor == 'AUX_MOTION_DETECTION') {
                    data_default_address = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_MOTION_DETECTION[0];
                    data_default_length = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_MOTION_DETECTION[1];
                    data_address = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_MOTION_DETECTION[0];
                    data_length = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_MOTION_DETECTION[1];
                } else if (sensor == 'AUX_COLOR') {
                    data_default_address = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_COLOR[0];
                    data_default_length = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_COLOR[1];
                    data_address = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_COLOR[0];
                    data_length = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_COLOR[1];
                } else if (sensor == 'AUX_CUSTOM') {
                    data_default_address = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_CUSTOM[0];
                    data_default_length = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_CUSTOM[1];
                    data_address = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_CUSTOM[0];
                    data_length = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_CUSTOM[1];
                }

                data_default_address = data_default_address + increase * data_default_length;
                data_address = data_default_address;
                // if (increase != 0) {
                   // data_length = 6 * data_default_length;
                // }

                Entry.Robotis_carCont.setRobotisData([[data_instruction, data_address, data_length, data_value, data_default_length]]);
                // Entry.hw.socket.send(JSON.stringify(Entry.hw.sendQueue));
                Entry.Robotis_carCont.update();

                scope.data_default_address = data_default_address;
                throw new Entry.Utils.AsyncError();
            } else if(scope.count < 2) {
                scope.count++;
                throw new Entry.Utils.AsyncError();
            }
            scope.isStart = false;
            var result = Entry.hw.portData[scope.data_default_address];
            scope.data_default_address = undefined;
            return result;
        },
        "syntax": {"js": [], "py": ["Robotis.opencm70_aux_sensor_value(%1, %2)"]}
    },
    "robotis_openCM70_cm_buzzer_index": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.General.note_a + '(0)',"0"],
                    [Lang.General.note_a + '#(1)',"1"],
                    [Lang.General.note_b + '(2)',"2"],
                    [Lang.General.note_c + '(3)',"3"],
                    [Lang.General.note_c + '#(4)',"4"],
                    [Lang.General.note_d + '(5)',"5"],
                    [Lang.General.note_d + '#(6)',"6"],
                    [Lang.General.note_e + '(7)',"7"],
                    [Lang.General.note_f + '(8)',"8"],
                    [Lang.General.note_f + '#(9)',"9"],
                    [Lang.General.note_g + '(10)',"10"],
                    [Lang.General.note_g + '#(11)',"11"],
                    [Lang.General.note_a + '(12)',"12"],
                    [Lang.General.note_a + '#(13)',"13"],
                    [Lang.General.note_b + '(14)',"14"],
                    [Lang.General.note_c + '(15)',"15"],
                    [Lang.General.note_c + '#(16)',"16"],
                    [Lang.General.note_d + '(17)',"17"],
                    [Lang.General.note_d + '#(18)',"18"],
                    [Lang.General.note_e + '(19)',"19"],
                    [Lang.General.note_f + '(20)',"20"],
                    [Lang.General.note_f + '#(21)',"21"],
                    [Lang.General.note_g + '(22)',"22"],
                    [Lang.General.note_g + '#(23)',"23"],
                    [Lang.General.note_a + '(24)',"24"],
                    [Lang.General.note_a + '#(25)',"25"],
                    [Lang.General.note_b + '(26)',"26"],
                    [Lang.General.note_c + '(27)',"27"],
                    [Lang.General.note_c + '#(28)',"28"],
                    [Lang.General.note_d + '(29)',"29"],
                    [Lang.General.note_d + '#(30)',"30"],
                    [Lang.General.note_e + '(31)',"31"],
                    [Lang.General.note_f + '(32)',"32"],
                    [Lang.General.note_f + '#(33)',"33"],
                    [Lang.General.note_g + '(34)',"34"],
                    [Lang.General.note_g + '#(35)',"35"],
                    [Lang.General.note_a + '(36)',"36"],
                    [Lang.General.note_a + '#(37)',"37"],
                    [Lang.General.note_b + '(38)',"38"],
                    [Lang.General.note_c + '(39)',"39"],
                    [Lang.General.note_c + '#(40)',"40"],
                    [Lang.General.note_d + '(41)',"41"],
                    [Lang.General.note_d + '#(42)',"42"],
                    [Lang.General.note_e + '(43)',"43"],
                    [Lang.General.note_f + '(44)',"44"],
                    [Lang.General.note_f + '#(45)',"45"],
                    [Lang.General.note_g + '(46)',"46"],
                    [Lang.General.note_g + '#(47)',"47"],
                    [Lang.General.note_a + '(48)',"48"],
                    [Lang.General.note_a + '#(49)',"49"],
                    [Lang.General.note_b + '(50)',"50"],
                    [Lang.General.note_c + '(51)',"51"]
                ],
                "value": "0",
                "fontSize": 11
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                {
                    "type": "number",
                    "params": [ "1" ]
                },
                null
            ],
            "type": "robotis_openCM70_cm_buzzer_index"
        },
        "paramsKeyMap": {
            "CM_BUZZER_INDEX": 0,
            "CM_BUZZER_TIME": 1
        },
        "class": "robotis_openCM70_cm",
        "isNotFor": [ "robotis_openCM70" ],
        "func": function (sprite, script) {
            // instruction / address / length / value / default length
            var cmBuzzerIndex = script.getField("CM_BUZZER_INDEX", script);
            var cmBuzzerTime = script.getNumberValue("CM_BUZZER_TIME", script);

            var data_instruction = Entry.Robotis_openCM70.INSTRUCTION.WRITE;
            var data_address_1 = 0;
            var data_length_1 = 0;
            var data_value_1 = 0;
            var data_address_2 = 0;
            var data_length_2 = 0;
            var data_value_2 = 0;

            data_address_1 = Entry.Robotis_openCM70.CONTROL_TABLE.CM_BUZZER_TIME[0];
            data_length_1 = Entry.Robotis_openCM70.CONTROL_TABLE.CM_BUZZER_TIME[1];
            // data_value_1 = cmBuzzerTime * 10;
            // TODO 텍스트 입력으로 바꾸고 최대는 5초 : 0.5 초 하려면 5를 입력  - console.log(parseInt(0.59 * 10)); max 는 5초
            data_value_1 = parseInt(cmBuzzerTime * 10);
            if (data_value_1 > 50) {
                data_value_1 = 50;
            }

            data_address_2 = Entry.Robotis_openCM70.CONTROL_TABLE.CM_BUZZER_INDEX[0];
            data_length_2 = Entry.Robotis_openCM70.CONTROL_TABLE.CM_BUZZER_INDEX[1];
            data_value_2 = cmBuzzerIndex;

            var data_sendqueue = [[data_instruction, data_address_1, data_length_1, data_value_1], [data_instruction, data_address_2, data_length_2, data_value_2]];
            return Entry.Robotis_carCont.postCallReturn(script, data_sendqueue, cmBuzzerTime * 1000);
        },
        "syntax": {"js": [], "py": ["Robotis.opencm70_cm_buzzer_index(%1, %2)"]}
    },
    "robotis_openCM70_cm_buzzer_melody": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ "0", "0" ],
                    [ "1", "1" ],
                    [ "2", "2" ],
                    [ "3", "3" ],
                    [ "4", "4" ],
                    [ "5", "5" ],
                    [ "6", "6" ],
                    [ "7", "7" ],
                    [ "8", "8" ],
                    [ "9", "9" ],
                    [ "10", "10" ],
                    [ "11", "11" ],
                    [ "12", "12" ],
                    [ "13", "13" ],
                    [ "14", "14" ],
                    [ "15", "15" ],
                    [ "16", "16" ],
                    [ "17", "17" ],
                    [ "18", "18" ],
                    [ "19", "19" ],
                    [ "20", "20" ],
                    [ "21", "21" ],
                    [ "22", "22" ],
                    [ "23", "23" ],
                    [ "24", "24" ]
                ],
                "value": "0",
                "fontSize": 11
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null ],
            "type": "robotis_openCM70_cm_buzzer_melody"
        },
        "paramsKeyMap": {
            "CM_BUZZER_MELODY": 0
        },
        "class": "robotis_openCM70_cm",
        "isNotFor": [ "robotis_openCM70" ],
        "func": function (sprite, script) {
            // instruction / address / length / value / default length
            var cmBuzzerMelody = script.getField("CM_BUZZER_MELODY", script);

            var data_instruction = Entry.Robotis_openCM70.INSTRUCTION.WRITE;
            var data_address_1 = 0;
            var data_length_1 = 0;
            var data_value_1 = 0;
            var data_address_2 = 0;
            var data_length_2 = 0;
            var data_value_2 = 0;

            data_address_1 = Entry.Robotis_openCM70.CONTROL_TABLE.CM_BUZZER_TIME[0];
            data_length_1 = Entry.Robotis_openCM70.CONTROL_TABLE.CM_BUZZER_TIME[1];
            data_value_1 = 255;

            data_address_2 = Entry.Robotis_openCM70.CONTROL_TABLE.CM_BUZZER_INDEX[0];
            data_length_2 = Entry.Robotis_openCM70.CONTROL_TABLE.CM_BUZZER_INDEX[1];
            data_value_2 = cmBuzzerMelody;

            var data_sendqueue = [[data_instruction, data_address_1, data_length_1, data_value_1], [data_instruction, data_address_2, data_length_2, data_value_2]];
            return Entry.Robotis_carCont.postCallReturn(script, data_sendqueue, 1000);
        },
        "syntax": {"js": [], "py": ["Robotis.opencm70_cm_buzzer_melody(%1)"]}
    },
    "robotis_openCM70_cm_sound_detected_clear": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "robotis_openCM70_cm_sound_detected_clear"
        },
        "class": "robotis_openCM70_cm",
        "isNotFor": [ "robotis_openCM70" ],
        "func": function (sprite, script) {
            // instruction / address / length / value / default length

            var data_instruction = Entry.Robotis_openCM70.INSTRUCTION.WRITE;
            var data_address = 0;
            var data_length = 0;
            var data_value = 0;

            data_address = Entry.Robotis_openCM70.CONTROL_TABLE.CM_SOUND_DETECTED[0];
            data_length = Entry.Robotis_openCM70.CONTROL_TABLE.CM_SOUND_DETECTED[1];
            data_value = 0;

            var data_sendqueue = [[data_instruction, data_address, data_length, data_value]];
            return Entry.Robotis_carCont.postCallReturn(script, data_sendqueue, Entry.Robotis_openCM70.delay);
        },
        "syntax": {"js": [], "py": ["Robotis.opencm70_cm_sound_clear()"]}
    },
    "robotis_openCM70_cm_led": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.robotis_common_red_color,"CM_LED_R"],
                    [Lang.Blocks.robotis_common_green_color,"CM_LED_G"],
                    [Lang.Blocks.robotis_common_blue_color,"CM_LED_B"],
                ],
                "value": "CM_LED_R",
                "fontSize": 11
            },
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.robotis_common_on,"1"],
                    [Lang.Blocks.robotis_common_off,"0"]
                ],
                "value": "1",
                "fontSize": 11
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null, null ],
            "type": "robotis_openCM70_cm_led"
        },
        "paramsKeyMap": {
            "CM_LED": 0,
            "VALUE": 1
        },
        "class": "robotis_openCM70_cm",
        "isNotFor": [ "robotis_openCM70" ],
        "func": function (sprite, script) {
            // instruction / address / length / value / default length
            var cmLed = script.getField("CM_LED", script);
            var value = script.getField("VALUE", script);

            var data_instruction = Entry.Robotis_openCM70.INSTRUCTION.WRITE;
            var data_address = 0;
            var data_length = 0;
            var data_value = 0;

            if (cmLed == 'CM_LED_R') {
                data_address = Entry.Robotis_openCM70.CONTROL_TABLE.CM_LED_R[0];
                data_length = Entry.Robotis_openCM70.CONTROL_TABLE.CM_LED_R[1];
            } else if (cmLed == 'CM_LED_G') {
                data_address = Entry.Robotis_openCM70.CONTROL_TABLE.CM_LED_G[0];
                data_length = Entry.Robotis_openCM70.CONTROL_TABLE.CM_LED_G[1];
            } else if (cmLed == 'CM_LED_B') {
                data_address = Entry.Robotis_openCM70.CONTROL_TABLE.CM_LED_B[0];
                data_length = Entry.Robotis_openCM70.CONTROL_TABLE.CM_LED_B[1];
            }

            data_value = value;

            var data_sendqueue = [[data_instruction, data_address, data_length, data_value]];
            return Entry.Robotis_carCont.postCallReturn(script, data_sendqueue, Entry.Robotis_openCM70.delay);
        },
        "syntax": {"js": [], "py": ["Robotis.opencm70_cm_led(%1, %2)"]}
    },
    "robotis_openCM70_cm_motion": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "number",
                    "params": [ "1" ]
                },
                null
            ],
            "type": "robotis_openCM70_cm_motion"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "robotis_openCM70_cm",
        "isNotFor": [ "robotis_openCM70" ],
        "func": function (sprite, script) {
            // instruction / address / length / value / default length
            var data_instruction = Entry.Robotis_openCM70.INSTRUCTION.WRITE;
            var data_address = 0;
            var data_length = 0;
            var data_value = 0;

            data_address = Entry.Robotis_openCM70.CONTROL_TABLE.CM_MOTION[0];
            data_length = Entry.Robotis_openCM70.CONTROL_TABLE.CM_MOTION[1];
            data_value = script.getNumberValue("VALUE", script);

            var data_sendqueue = [[data_instruction, data_address, data_length, data_value]];
            return Entry.Robotis_carCont.postCallReturn(script, data_sendqueue, Entry.Robotis_openCM70.delay);
        },
        "syntax": {"js": [], "py": ["Robotis.opencm70_cm_motion(%1)"]}
    },
    "robotis_openCM70_aux_motor_speed": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.robotis_common_port_1,"1"],
                    [Lang.Blocks.robotis_common_port_2,"2"]
                ],
                "value": "1",
                "fontSize": 11
            },
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.robotis_common_clockwhise,"CW"],
                    [Lang.Blocks.robotis_common_counter_clockwhise,"CCW"]
                ],
                "value": "CW",
                "fontSize": 11
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                null,
                {
                    "type": "number",
                    "params": [ "500" ]
                },
                null
            ],
            "type": "robotis_openCM70_aux_motor_speed"
        },
        "paramsKeyMap": {
            "PORT": 0,
            "DIRECTION_ANGLE": 1,
            "VALUE": 2
        },
        "class": "robotis_openCM70_cm",
        "isNotFor": [ "robotis_openCM70" ],
        "func": function (sprite, script) {
            // instruction / address / length / value / default length
            var port = script.getField("PORT", script);
            var directionAngle = script.getField("DIRECTION_ANGLE", script);
            var value = script.getNumberValue('VALUE');

            var data_instruction = Entry.Robotis_openCM70.INSTRUCTION.WRITE;
            var data_address = 0;
            var data_length = 0;
            var data_value = 0;

            data_address = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_MOTOR_SPEED[0];
            data_length = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_MOTOR_SPEED[1];

            data_address = data_address + (port - 1) * data_length;

            if (directionAngle == 'CW') {
                value = value + 1024;
                if (value > 2047) {
                    value = 2047;
                }
            } else {
                if (value > 1023) {
                    value = 1023;
                }
            }

            data_value = value;

            var data_sendqueue = [[data_instruction, data_address, data_length, data_value]];
            return Entry.Robotis_carCont.postCallReturn(script, data_sendqueue, Entry.Robotis_openCM70.delay);
        },
        "syntax": {"js": [], "py": ["Robotis.opencm70_aux_motor_speed(%1, %2, %3)"]}
    },
    "robotis_openCM70_aux_servo_mode": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.robotis_common_port_3,"3"],
                    [Lang.Blocks.robotis_common_port_4,"4"],
                    [Lang.Blocks.robotis_common_port_5,"5"],
                    [Lang.Blocks.robotis_common_port_6,"6"]
                ],
                "value": "3",
                "fontSize": 11
            },
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.robotis_common_wheel_mode,"0"],
                    [Lang.Blocks.robotis_common_joint_mode,"1"]
                ],
                "value": "0",
                "fontSize": 11
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null, null ],
            "type": "robotis_openCM70_aux_servo_mode"
        },
        "paramsKeyMap": {
            "PORT": 0,
            "MODE": 1
        },
        "class": "robotis_openCM70_cm",
        "isNotFor": [ "robotis_openCM70" ],
        "func": function (sprite, script) {
            // instruction / address / length / value / default length
            var port = script.getField("PORT", script);
            var mode = script.getField("MODE", script);

            var data_instruction = Entry.Robotis_openCM70.INSTRUCTION.WRITE;
            var data_address = 0;
            var data_length = 0;
            var data_value = 0;

            data_address = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_SERVO_MODE[0];
            data_length = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_SERVO_MODE[1];

            data_address = data_address + (port - 1) * data_length;
            data_value = mode;

            var data_sendqueue = [[data_instruction, data_address, data_length, data_value]];
            return Entry.Robotis_carCont.postCallReturn(script, data_sendqueue, Entry.Robotis_openCM70.delay);
        },
        "syntax": {"js": [], "py": ["Robotis.opencm70_aux_servo_mode(%1, %2)"]}
    },
    "robotis_openCM70_aux_servo_speed": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.robotis_common_port_3,"3"],
                    [Lang.Blocks.robotis_common_port_4,"4"],
                    [Lang.Blocks.robotis_common_port_5,"5"],
                    [Lang.Blocks.robotis_common_port_6,"6"]
                ],
                "value": "3",
                "fontSize": 11
            },
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.robotis_common_clockwhise,"CW"],
                    [Lang.Blocks.robotis_common_counter_clockwhise,"CCW"]
                ],
                "value": "CW",
                "fontSize": 11
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                null,
                {
                    "type": "number",
                    "params": [ "500" ]
                },
                null
            ],
            "type": "robotis_openCM70_aux_servo_speed"
        },
        "paramsKeyMap": {
            "PORT": 0,
            "DIRECTION_ANGLE": 1,
            "VALUE": 2
        },
        "class": "robotis_openCM70_cm",
        "isNotFor": [ "robotis_openCM70" ],
        "func": function (sprite, script) {
            // instruction / address / length / value / default length
            var port = script.getField("PORT", script);
            var directionAngle = script.getField("DIRECTION_ANGLE", script);
            var value = script.getNumberValue('VALUE');

            var data_instruction = Entry.Robotis_openCM70.INSTRUCTION.WRITE;
            var data_address = 0;
            var data_length = 0;
            var data_value = 0;

            data_address = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_SERVO_SPEED[0];
            data_length = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_SERVO_SPEED[1];

            data_address = data_address + (port - 1) * data_length;

            if (directionAngle == 'CW') {
                value = value + 1024;
                if (value > 2047) {
                    value = 2047;
                }
            } else {
                if (value > 1023) {
                    value = 1023;
                }
            }

            data_value = value;

            var data_sendqueue = [[data_instruction, data_address, data_length, data_value]];
            return Entry.Robotis_carCont.postCallReturn(script, data_sendqueue, Entry.Robotis_openCM70.delay);
        },
        "syntax": {"js": [], "py": ["Robotis.opencm70_aux_servo_speed(%1, %2, %3)"]}
    },
    "robotis_openCM70_aux_servo_position": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.robotis_common_port_3,"3"],
                    [Lang.Blocks.robotis_common_port_4,"4"],
                    [Lang.Blocks.robotis_common_port_5,"5"],
                    [Lang.Blocks.robotis_common_port_6,"6"]
                ],
                "value": "3",
                "fontSize": 11
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                {
                    "type": "number",
                    "params": [ "512" ]
                },
                null
            ],
            "type": "robotis_openCM70_aux_servo_position"
        },
        "paramsKeyMap": {
            "PORT": 0,
            "VALUE": 1
        },
        "class": "robotis_openCM70_cm",
        "isNotFor": [ "robotis_openCM70" ],
        "func": function (sprite, script) {
            // instruction / address / length / value / default length
            var port = script.getField("PORT", script);
            var value = script.getNumberValue('VALUE');

            var data_instruction = Entry.Robotis_openCM70.INSTRUCTION.WRITE;
            var data_address = 0;
            var data_length = 0;
            var data_value = 0;

            data_address = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_SERVO_POSITION[0];
            data_length = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_SERVO_POSITION[1];

            data_address = data_address + (port - 1) * data_length;

            if (value > 1023) {
                value = 1023;
            } else if (value < 0) {
                value = 0;
            }

            data_value = value;

            var data_sendqueue = [[data_instruction, data_address, data_length, data_value]];
            return Entry.Robotis_carCont.postCallReturn(script, data_sendqueue, Entry.Robotis_openCM70.delay);
        },
        "syntax": {"js": [], "py": ["Robotis.opencm70_aux_servo_position(%1, %2)"]}
    },
    "robotis_openCM70_aux_led_module": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.robotis_common_port_3,"3"],
                    [Lang.Blocks.robotis_common_port_4,"4"],
                    [Lang.Blocks.robotis_common_port_5,"5"],
                    [Lang.Blocks.robotis_common_port_6,"6"]
                ],
                "value": "3",
                "fontSize": 11
            },
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.robotis_cm_led_both + Lang.Blocks.robotis_common_off,"0"],
                    [Lang.Blocks.robotis_cm_led_right + Lang.Blocks.robotis_common_on,"1"],
                    [Lang.Blocks.robotis_cm_led_left + Lang.Blocks.robotis_common_on,"2"],
                    [Lang.Blocks.robotis_cm_led_both + Lang.Blocks.robotis_common_on,"3"]
                ],
                "value": "0",
                "fontSize": 11
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null, null ],
            "type": "robotis_openCM70_aux_led_module"
        },
        "paramsKeyMap": {
            "PORT": 0,
            "LED_MODULE": 1
        },
        "class": "robotis_openCM70_cm",
        "isNotFor": [ "robotis_openCM70" ],
        "func": function (sprite, script) {
            // instruction / address / length / value / default length
            var port = script.getField("PORT", script);
            var ledModule = script.getField("LED_MODULE", script);

            var data_instruction = Entry.Robotis_openCM70.INSTRUCTION.WRITE;
            var data_address = 0;
            var data_length = 0;
            var data_value = 0;

            data_address = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_LED_MODULE[0];
            data_length = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_LED_MODULE[1];

            data_address = data_address + (port - 1) * data_length;
            data_value = ledModule;

            var data_sendqueue = [[data_instruction, data_address, data_length, data_value]];
            return Entry.Robotis_carCont.postCallReturn(script, data_sendqueue, Entry.Robotis_openCM70.delay);
        },
        "syntax": {"js": [], "py": ["Robotis.opencm70_aux_led_module(%1, %2)"]}
    },
    "robotis_openCM70_aux_custom": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.robotis_common_port_3,"3"],
                    [Lang.Blocks.robotis_common_port_4,"4"],
                    [Lang.Blocks.robotis_common_port_5,"5"],
                    [Lang.Blocks.robotis_common_port_6,"6"]
                ],
                "value": "3",
                "fontSize": 11
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                {
                    "type": "number",
                    "params": [ "0" ]
                },
                null
            ],
            "type": "robotis_openCM70_aux_custom"
        },
        "paramsKeyMap": {
            "PORT": 0,
            "VALUE": 1
        },
        "class": "robotis_openCM70_cm",
        "isNotFor": [ "robotis_openCM70" ],
        "func": function (sprite, script) {
            // instruction / address / length / value / default length
            var port = script.getField("PORT", script);
            var value = script.getNumberValue('VALUE');

            var data_instruction = Entry.Robotis_openCM70.INSTRUCTION.WRITE;
            var data_address = 0;
            var data_length = 0;
            var data_value = 0;

            data_address = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_CUSTOM[0];
            data_length = Entry.Robotis_openCM70.CONTROL_TABLE.AUX_CUSTOM[1];

            data_address = data_address + (port - 1) * data_length;
            data_value = value;

            var data_sendqueue = [[data_instruction, data_address, data_length, data_value]];
            return Entry.Robotis_carCont.postCallReturn(script, data_sendqueue, Entry.Robotis_openCM70.delay);
        },
        "syntax": {"js": [], "py": ["Robotis.opencm70_aux_custom(%1, %2)"]}
    },
    "robotis_openCM70_cm_custom": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "number",
                    "params": [ "0" ]
                },
                {
                    "type": "number",
                    "params": [ "0" ]
                },
                null
            ],
            "type": "robotis_openCM70_cm_custom"
        },
        "paramsKeyMap": {
            "ADDRESS": 0,
            "VALUE": 1
        },
        "class": "robotis_openCM70_custom",
        "isNotFor": [ "robotis_openCM70" ],
        "func": function (sprite, script) {
              // instruction / address / length / value / default length
            var data_instruction = Entry.Robotis_openCM70.INSTRUCTION.WRITE;
            var data_address = 0;
            var data_length = 0;
            var data_value = 0;

              data_address = script.getNumberValue('ADDRESS');
            data_value = script.getNumberValue('VALUE');
            if (data_value > 65535) {
                data_length = 4;
            } else if (data_value > 255) {
                data_length = 2;
            } else {
                data_length = 1;
            }

            var data_sendqueue = [[data_instruction, data_address, data_length, data_value]];
            return Entry.Robotis_carCont.postCallReturn(script, data_sendqueue, Entry.Robotis_openCM70.delay);
        },
        "syntax": {"js": [], "py": ["Robotis.opencm70_cm_custom(%1, %2)"]}
    },
    "robotis_carCont_sensor_value": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.robotis_cm_spring_left,"CM_SPRING_LEFT"],
                    [Lang.Blocks.robotis_cm_spring_right,"CM_SPRING_RIGHT"],
                    [Lang.Blocks.robotis_cm_switch,"CM_SWITCH"],
                    [Lang.Blocks.robotis_cm_sound_detected,"CM_SOUND_DETECTED"],
                    [Lang.Blocks.robotis_cm_sound_detecting,"CM_SOUND_DETECTING"],
                    [Lang.Blocks.robotis_cm_ir_left,"CM_IR_LEFT"],
                    [Lang.Blocks.robotis_cm_ir_right,"CM_IR_RIGHT"],
                    [Lang.Blocks.robotis_cm_calibration_left,"CM_CALIBRATION_LEFT"],
                    [Lang.Blocks.robotis_cm_calibration_right,"CM_CALIBRATION_RIGHT"],
                ],
                "value": "CM_SPRING_LEFT",
                "fontSize": 11
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "robotis_carCont_sensor_value"
        },
        "paramsKeyMap": {
            "SENSOR": 0
        },
        "class": "robotis_carCont_cm",
        "isNotFor": [ "robotis_carCont" ],
        "func": function (sprite, script) {
            // instruction / address / length / value / default length
            var data_instruction = Entry.Robotis_carCont.INSTRUCTION.READ;
            var data_address = 0;
            var data_length = 0;
            var data_value = 0;

            var data_default_address = 0;
            var data_default_length = 0;

            var sensor = script.getStringField("SENSOR");

            if (sensor == 'CM_SPRING_LEFT') {
                data_default_address = Entry.Robotis_carCont.CONTROL_TABLE.CM_SPRING_LEFT[0];
                data_default_length = Entry.Robotis_carCont.CONTROL_TABLE.CM_SPRING_LEFT[1];
                data_address = Entry.Robotis_carCont.CONTROL_TABLE.CM_SPRING_LEFT[2];
                data_length = Entry.Robotis_carCont.CONTROL_TABLE.CM_SPRING_LEFT[3];
            } else if (sensor == 'CM_SPRING_RIGHT') {
                data_default_address = Entry.Robotis_carCont.CONTROL_TABLE.CM_SPRING_RIGHT[0];
                data_default_length = Entry.Robotis_carCont.CONTROL_TABLE.CM_SPRING_RIGHT[1];
                data_address = Entry.Robotis_carCont.CONTROL_TABLE.CM_SPRING_RIGHT[2];
                data_length = Entry.Robotis_carCont.CONTROL_TABLE.CM_SPRING_RIGHT[3];
            } else if (sensor == 'CM_SWITCH') {
                data_default_address = Entry.Robotis_carCont.CONTROL_TABLE.CM_SWITCH[0];
                data_default_length = Entry.Robotis_carCont.CONTROL_TABLE.CM_SWITCH[1];
                data_address = Entry.Robotis_carCont.CONTROL_TABLE.CM_SWITCH[0];
                data_length = Entry.Robotis_carCont.CONTROL_TABLE.CM_SWITCH[1];
            } else if (sensor == 'CM_SOUND_DETECTED') {
                data_default_address = Entry.Robotis_carCont.CONTROL_TABLE.CM_SOUND_DETECTED[0];
                data_default_length = Entry.Robotis_carCont.CONTROL_TABLE.CM_SOUND_DETECTED[1];
                data_address = Entry.Robotis_carCont.CONTROL_TABLE.CM_SOUND_DETECTED[0];
                data_length = Entry.Robotis_carCont.CONTROL_TABLE.CM_SOUND_DETECTED[1];
            } else if (sensor == 'CM_SOUND_DETECTING') {
                data_default_address = Entry.Robotis_carCont.CONTROL_TABLE.CM_SOUND_DETECTING[0];
                data_default_length = Entry.Robotis_carCont.CONTROL_TABLE.CM_SOUND_DETECTING[1];
                data_address = Entry.Robotis_carCont.CONTROL_TABLE.CM_SOUND_DETECTING[0];
                data_length = Entry.Robotis_carCont.CONTROL_TABLE.CM_SOUND_DETECTING[1];
            } else if (sensor == 'CM_IR_LEFT') {
                data_default_address = Entry.Robotis_carCont.CONTROL_TABLE.CM_IR_LEFT[0];
                data_default_length = Entry.Robotis_carCont.CONTROL_TABLE.CM_IR_LEFT[1];
                data_address = Entry.Robotis_carCont.CONTROL_TABLE.CM_IR_LEFT[2];
                data_length = Entry.Robotis_carCont.CONTROL_TABLE.CM_IR_LEFT[3];
            } else if (sensor == 'CM_IR_RIGHT') {
                data_default_address = Entry.Robotis_carCont.CONTROL_TABLE.CM_IR_RIGHT[0];
                data_default_length = Entry.Robotis_carCont.CONTROL_TABLE.CM_IR_RIGHT[1];
                data_address = Entry.Robotis_carCont.CONTROL_TABLE.CM_IR_RIGHT[2];
                data_length = Entry.Robotis_carCont.CONTROL_TABLE.CM_IR_RIGHT[3];
            } else if (sensor == 'CM_CALIBRATION_LEFT') {
                data_default_address = Entry.Robotis_carCont.CONTROL_TABLE.CM_CALIBRATION_LEFT[0];
                data_default_length = Entry.Robotis_carCont.CONTROL_TABLE.CM_CALIBRATION_LEFT[1];
                data_address = Entry.Robotis_carCont.CONTROL_TABLE.CM_CALIBRATION_LEFT[0];
                data_length = Entry.Robotis_carCont.CONTROL_TABLE.CM_CALIBRATION_LEFT[1];
            } else if (sensor == 'CM_CALIBRATION_RIGHT') {
                data_default_address = Entry.Robotis_carCont.CONTROL_TABLE.CM_CALIBRATION_RIGHT[0];
                data_default_length = Entry.Robotis_carCont.CONTROL_TABLE.CM_CALIBRATION_RIGHT[1];
                data_address = Entry.Robotis_carCont.CONTROL_TABLE.CM_CALIBRATION_RIGHT[0];
                data_length = Entry.Robotis_carCont.CONTROL_TABLE.CM_CALIBRATION_RIGHT[1];
            } else if (sensor == 'CM_BUTTON_STATUS') {
                data_default_address = Entry.Robotis_carCont.CONTROL_TABLE.CM_BUTTON_STATUS[0];
                data_default_length = Entry.Robotis_carCont.CONTROL_TABLE.CM_BUTTON_STATUS[1];
                data_address = Entry.Robotis_carCont.CONTROL_TABLE.CM_BUTTON_STATUS[0];
                data_length = Entry.Robotis_carCont.CONTROL_TABLE.CM_BUTTON_STATUS[1];
            }

            Entry.Robotis_carCont.setRobotisData([[data_instruction, data_address, data_length, data_value, data_default_length]]);
            // Entry.hw.socket.send(JSON.stringify(Entry.hw.sendQueue));
            Entry.Robotis_carCont.update();

            return Entry.hw.portData[data_default_address];
        },
        "syntax": {"js": [], "py": ["Robotis.carcont_sensor_value(%1)"]}
    },
    "robotis_carCont_cm_led": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.robotis_common_on,"1"],
                    [Lang.Blocks.robotis_common_off,"0"]
                ],
                "value": "1",
                "fontSize": 11
            },
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.robotis_common_on,"1"],
                    [Lang.Blocks.robotis_common_off,"0"]
                ],
                "value": "1",
                "fontSize": 11
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null, null ],
            "type": "robotis_carCont_cm_led"
        },
        "paramsKeyMap": {
            "VALUE_LEFT": 0,
            "VALUE_RIGHT": 1
        },
        "class": "robotis_carCont_cm",
        "isNotFor": [ "robotis_carCont" ],
        "func": function (sprite, script) {
            // instruction / address / length / value / default length
            var value_left = script.getField("VALUE_LEFT", script);
            var value_right = script.getField("VALUE_RIGHT", script);

            var data_instruction = Entry.Robotis_carCont.INSTRUCTION.WRITE;
            var data_address = 0;
            var data_length = 0;
            var data_value = 0;

            data_address = Entry.Robotis_carCont.CONTROL_TABLE.CM_LED[0];
            data_length = Entry.Robotis_carCont.CONTROL_TABLE.CM_LED[1];

            if (value_left == 1 && value_right == 1) {
                data_value = 9;
            } else if (value_left == 1 && value_right == 0) {
                data_value = 8;
            } if (value_left == 0 && value_right == 1) {
                data_value = 1;
            }

            var data_sendqueue = [[data_instruction, data_address, data_length, data_value]];
            return Entry.Robotis_carCont.postCallReturn(script, data_sendqueue, Entry.Robotis_carCont.delay);
        },
        "syntax": {"js": [], "py": ["Robotis.carcont_cm_led(%1, %2)"]}
    },
    "robotis_carCont_cm_sound_detected_clear": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "robotis_carCont_cm_sound_detected_clear"
        },
        "class": "robotis_carCont_cm",
        "isNotFor": [ "robotis_carCont" ],
        "func": function (sprite, script) {
            // instruction / address / length / value / default length

            var data_instruction = Entry.Robotis_carCont.INSTRUCTION.WRITE;
            var data_address = 0;
            var data_length = 0;
            var data_value = 0;

            data_address = Entry.Robotis_carCont.CONTROL_TABLE.CM_SOUND_DETECTED[0];
            data_length = Entry.Robotis_carCont.CONTROL_TABLE.CM_SOUND_DETECTED[1];
            data_value = 0;

            var data_sendqueue = [[data_instruction, data_address, data_length, data_value]];
            return Entry.Robotis_carCont.postCallReturn(script, data_sendqueue, Entry.Robotis_carCont.delay);
        },
        "syntax": {"js": [], "py": ["Robotis.carcont_cm_sound_clear()"]}
    },
    "robotis_carCont_aux_motor_speed": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.General.left,"LEFT"],
                    [Lang.General.right,"RIGHT"]
                ],
                "value": "LEFT",
                "fontSize": 11
            },
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.robotis_common_clockwhise,"CW"],
                    [Lang.Blocks.robotis_common_counter_clockwhise,"CCW"]
                ],
                "value": "CW",
                "fontSize": 11
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                null,
                {
                    "type": "number",
                    "params": [ "500" ]
                },
                null
            ],
            "type": "robotis_carCont_aux_motor_speed"
        },
        "paramsKeyMap": {
            "DIRECTION": 0,
            "DIRECTION_ANGLE": 1,
            "VALUE": 2
        },
        "class": "robotis_carCont_cm",
        "isNotFor": [ "robotis_carCont" ],
        "func": function (sprite, script) {
            // instruction / address / length / value / default length
            var direction = script.getField("DIRECTION", script);
            var directionAngle = script.getField("DIRECTION_ANGLE", script);
            var value = script.getNumberValue('VALUE');

            var data_instruction = Entry.Robotis_carCont.INSTRUCTION.WRITE;
            var data_address = 0;
            var data_length = 0;
            var data_value = 0;

            if (direction == 'LEFT') {
                data_address = Entry.Robotis_carCont.CONTROL_TABLE.AUX_MOTOR_SPEED_LEFT[0];
                data_length = Entry.Robotis_carCont.CONTROL_TABLE.AUX_MOTOR_SPEED_LEFT[1];
            } else {
                data_address = Entry.Robotis_carCont.CONTROL_TABLE.AUX_MOTOR_SPEED_RIGHT[0];
                data_length = Entry.Robotis_carCont.CONTROL_TABLE.AUX_MOTOR_SPEED_RIGHT[1];
            }

            if (directionAngle == 'CW') {
                value = value + 1024;
                if (value > 2047) {
                    value = 2047;
                }
            } else {
                if (value > 1023) {
                    value = 1023;
                }
            }

            data_value = value;

            var data_sendqueue = [[data_instruction, data_address, data_length, data_value]];
            return Entry.Robotis_carCont.postCallReturn(script, data_sendqueue, Entry.Robotis_carCont.delay);
        },
        "syntax": {"js": [], "py": ["Robotis.carcont_aux_motor_speed(%1, %2, %3)"]}
    },
    "robotis_carCont_aux_motor_speed2": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "template": "왼쪽 감속모터 속도를 %1, 출력값을 %2 (으)로 오른쪽 감속모터 속도를 %3, 출력값을 %4 (으)로 정하기 %5",
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.robotis_common_clockwhise,"CW"],
                    [Lang.Blocks.robotis_common_counter_clockwhise,"CCW"]
                ],
                "value": "CW",
                "fontSize": 11
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.robotis_common_clockwhise,"CW"],
                    [Lang.Blocks.robotis_common_counter_clockwhise,"CCW"]
                ],
                "value": "CW",
                "fontSize": 11
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                {
                    "type": "number",
                    "params": [ "500" ]
                },
                null,
                {
                    "type": "number",
                    "params": [ "500" ]
                },
                null
            ],
            "type": "robotis_carCont_aux_motor_speed2"
        },
        "paramsKeyMap": {
            "LEFT_ANGLE": 0,
            "LEFT_VALUE": 1,
            "RIGHT_ANGLE": 2,
            "RIGHT_VALUE": 3,
        },
        "class": "robotis_carCont_cm",
        "isNotFor": [ "robotis_carCont" ],
        "func": function (sprite, script) {
             var data_instruction = Entry.Robotis_carCont.INSTRUCTION.WRITE,
                address = Entry.Robotis_carCont.CONTROL_TABLE.AUX_MOTOR_SPEED_LEFT[0];

            var leftAngle = script.getField("LEFT_ANGLE", script);
            var leftValue = script.getNumberValue('LEFT_VALUE');
            var rightAngle = script.getField("RIGHT_ANGLE", script);
            var rightValue = script.getNumberValue('RIGHT_VALUE');

            leftValue = Math.min(leftValue, 1023);
            leftValue = Math.max(leftValue, 0);
            rightValue = Math.min(rightValue, 1023);
            rightValue = Math.max(rightValue, 0);

            if(leftAngle === 'CW') {
                leftValue += 1024;
            }
            if(rightAngle === 'CW') {
                rightValue += 1024;
            }

            var value = leftValue + (rightValue << 16);
            var data_sendqueue = [[data_instruction, address, 4, value]];
            return Entry.Robotis_carCont.postCallReturn(script, data_sendqueue, Entry.Robotis_carCont.delay);
        }
    },
    "robotis_carCont_cm_calibration": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.General.left,"LEFT"],
                    [Lang.General.right,"RIGHT"]
                ],
                "value": "LEFT",
                "fontSize": 11
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                {
                    "type": "number",
                    "params": [ "0" ]
                },
                null
            ],
            "type": "robotis_carCont_cm_calibration"
        },
        "paramsKeyMap": {
            "DIRECTION": 0,
            "VALUE": 1
        },
        "class": "robotis_carCont_cm",
        "isNotFor": [ "robotis_carCont" ],
        "func": function (sprite, script) {
            // instruction / address / length / value / default length
            var direction = script.getField("DIRECTION", script);
            var value = script.getNumberValue('VALUE');

            var data_instruction = Entry.Robotis_carCont.INSTRUCTION.WRITE;
            var data_address = 0;
            var data_length = 0;
            var data_value = 0;

            if (direction == 'LEFT') {
                data_address = Entry.Robotis_carCont.CONTROL_TABLE.CM_CALIBRATION_LEFT[0];
                data_length = Entry.Robotis_carCont.CONTROL_TABLE.CM_CALIBRATION_LEFT[1];
            } else {
                data_address = Entry.Robotis_carCont.CONTROL_TABLE.CM_CALIBRATION_RIGHT[0];
                data_length = Entry.Robotis_carCont.CONTROL_TABLE.CM_CALIBRATION_RIGHT[1];
            }

            data_value = value;

            var data_sendqueue = [[data_instruction, data_address, data_length, data_value]];
            return Entry.Robotis_carCont.postCallReturn(script, data_sendqueue, Entry.Robotis_carCont.delay);

            // Entry.hw.sendQueue['ROBOTIS_DATA'] = [[data_instruction, data_address, data_length, data_value]];
            // update();
            // return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Robotis.carcont_cm_calibration(%1, %2)"]}
    },
    "when_scene_start": {
        "color": "#3BBD70",
        "skeleton": "basic_event",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/start_icon_scene_1_2.png",
                "size": 17,
                "position": {
                    "x": 0,
                    "y": -2
                }
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "when_scene_start"
        },
        "class": "scene",
        "isNotFor": [ "scene" ],
        "func": function (sprite, script) {
            return script.callReturn();
        },
        "event": "when_scene_start",
        "syntax": {"js": [], "py": ["def when_start_scene():"]}
    },
    "start_scene": {
        "color": "#3BBD70",
        "skeleton": "basic_without_next",
        "statements": [],
        "params": [
            {
                "type": "DropdownDynamic",
                "value": null,
                "menuName": "scenes",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_START
            },
            {
                "type": "Indicator",
                "img": "block_icon/start_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null ],
            "type": "start_scene"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "scene",
        "isNotFor": [ "scene" ],
        "func": function (sprite, script) {
            var value = script.getField("VALUE", script);
            var scene = Entry.scene.getSceneById(value);
            if (scene) {
                Entry.scene.selectScene(scene);
                Entry.engine.fireEvent('when_scene_start');
            }
            return null;
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Entry.start_scene_of(%1)",
                textParams: [
                    {
                        "type": "DropdownDynamic",
                        "value": null,
                        "menuName": "scenes",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_START,
                        converter: Entry.block.converters.returnStringKey
                    },
                ]
            }
        ]}
    },
    "start_neighbor_scene": {
        "color": "#3BBD70",
        "skeleton": "basic_without_next",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ Lang.Blocks.SCENE_start_scene_next, "next" ],
                    [ Lang.Blocks.SCENE_start_scene_pre, "pre" ]
                ],
                "value": "next",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_START
            },
            {
                "type": "Indicator",
                "img": "block_icon/start_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null ],
            "type": "start_neighbor_scene"
        },
        "paramsKeyMap": {
            "OPERATOR": 0
        },
        "class": "scene",
        "isNotFor": [ "scene" ],
        "func": function (sprite, script) {
            var currentScene = Entry.scene.selectedScene;
            var scenes = Entry.scene.getScenes();
            var index = scenes.indexOf(currentScene);
            var o = script.getField("OPERATOR", script);
            if (o == 'next') {
                if (index + 1 < scenes.length) {
                    var nextScene = Entry.scene.getSceneById(scenes[index + 1].id);
                    if (nextScene) {
                        Entry.scene.selectScene(nextScene);
                        Entry.engine.fireEvent('when_scene_start');
                    }
                }
            } else {
                if (index > 0) {
                    var nextScene = Entry.scene.getSceneById(scenes[index - 1].id);
                    if (nextScene) {
                        Entry.scene.selectScene(nextScene);
                        Entry.engine.fireEvent('when_scene_start');
                    }
                }
            }
            return null;
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Entry.start_scene_to(%1)",
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [ Lang.Blocks.SCENE_start_scene_next, "next" ],
                            [ Lang.Blocks.SCENE_start_scene_pre, "pre" ]
                        ],
                        "value": "next",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_START,
                        converter: Entry.block.converters.returnStringValue,
                        codeMap: "Entry.CodeMap.Entry.start_scene_to[0]"
                    },
                ]
            }
        ]}
    },
    "sound_something": {
        "color": "#A4D01D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "DropdownDynamic",
                "value": null,
                "menuName": "sounds",
                "fontSize": 11
            },
            {
                "type": "Indicator",
                "img": "block_icon/sound_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null ],
            "type": "sound_something"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "sound",
        "isNotFor": [],
        "func": function (sprite, script) {
            var soundId = script.getField("VALUE", script);
            var sounds = sprite.parent.sounds;
            var isExist = Entry.isExist(soundId, 'id', sounds);
            if (isExist)
                createjs.Sound.play(soundId);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [""]}
    },
    "sound_something_second": {
        "color": "#A4D01D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "DropdownDynamic",
                "value": null,
                "menuName": "sounds",
                "fontSize": 11
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/sound_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                {
                    "type": "number",
                    "params": [ "1" ]
                },
                null
            ],
            "type": "sound_something_second"
        },
        "paramsKeyMap": {
            "VALUE": 0,
            "SECOND": 1
        },
        "class": "sound",
        "isNotFor": [],
        "func": function (sprite, script) {
            var soundId = script.getField("VALUE", script);
            var timeValue = script.getNumberValue("SECOND", script);
            var sounds = sprite.parent.sounds;
            var isExist = Entry.isExist(soundId, 'id', sounds);
            if (isExist) {
                //var instance = createjs.Sound.play(soundId, {startTime: 0, duration: timeValue * 1000});
                var instance = createjs.Sound.play(soundId);
                setTimeout(function() {
                    instance.stop();
                }, timeValue * 1000);
            }
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [""]}
    },
    "sound_something_wait": {
        "color": "#A4D01D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "DropdownDynamic",
                "value": null,
                "menuName": "sounds",
                "fontSize": 11
            },
            {
                "type": "Indicator",
                "img": "block_icon/sound_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null ],
            "type": "sound_something_wait"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "sound",
        "isNotFor": [],
        "func": function (sprite, script) {
            if (!script.isPlay) {
                script.isPlay = true;
                script.playState = 1;
                var soundId = script.getField("VALUE", script);
                var sound = sprite.parent.getSound(soundId);
                var sounds = sprite.parent.sounds;
                var isExist = Entry.isExist(soundId, 'id', sounds);
                if (isExist) {
                    var instance = createjs.Sound.play(soundId);
                    setTimeout(function() {
                        script.playState = 0;
                    }, sound.duration * 1000)
                }
                return script;
            } else if (script.playState == 1) {
                return script;
            } else {
                delete script.playState;
                delete script.isPlay;
                return script.callReturn();
            }
        },
        "syntax": {"js": [], "py": [""]}
    },
    "sound_something_second_wait": {
        "color": "#A4D01D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "DropdownDynamic",
                "value": null,
                "menuName": "sounds",
                "fontSize": 11
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/sound_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                {
                    "type": "number",
                    "params": [ "1" ]
                },
                null
            ],
            "type": "sound_something_second_wait"
        },
        "paramsKeyMap": {
            "VALUE": 0,
            "SECOND": 1
        },
        "class": "sound",
        "isNotFor": [],
        "func": function (sprite, script) {
            if (!script.isPlay) {
                script.isPlay = true;
                script.playState = 1;
                var soundId = script.getField("VALUE", script);
                var sounds = sprite.parent.sounds;
                var isExist = Entry.isExist(soundId, 'id', sounds);
                if (isExist) {
                    var instance = createjs.Sound.play(soundId);
                    var timeValue = script.getNumberValue("SECOND", script);
                    setTimeout(function() {
                        instance.stop();
                        script.playState = 0;
                    }, timeValue * 1000)
                    instance.addEventListener('complete', function(e) {
                    });
                }
                return script;
            } else if (script.playState == 1) {
                return script;
            } else {
                delete script.isPlay;
                delete script.playState;
                return script.callReturn();
            }
        },
        "syntax": {"js": [], "py": [""]}
    },
    "sound_volume_change": {
        "color": "#A4D01D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/sound_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "number",
                    "params": [ "10" ]
                },
                null
            ],
            "type": "sound_volume_change"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "sound_volume",
        "isNotFor": [],
        "func": function (sprite, script) {
            var value = script.getNumberValue("VALUE", script) / 100;
            value = value + createjs.Sound.getVolume();
            if (value>1)
                value = 1;
            if (value<0)
                value = 0;
            createjs.Sound.setVolume(value);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Entry.add_sound_volume(%1)"]}
    },
    "sound_volume_set": {
        "color": "#A4D01D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/sound_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "number",
                    "params": [ "10" ]
                },
                null
            ],
            "type": "sound_volume_set"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "sound_volume",
        "isNotFor": [],
        "func": function (sprite, script) {
            var value = script.getNumberValue("VALUE", script) / 100;
            if (value>1)
                value = 1;
            if (value<0)
                value = 0;
            createjs.Sound.setVolume(value);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Entry.set_sound_volume(%1)"]}
    },
    "sound_silent_all": {
        "color": "#A4D01D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/sound_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "sound_silent_all"
        },
        "class": "sound_stop",
        "isNotFor": [],
        "func": function (sprite, script) {
            createjs.Sound.stop();
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Entry.stop_sound()"]}
    },
    "get_sounds": {
        "color": "#A4D01D",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "DropdownDynamic",
                "value": null,
                "menuName": "sounds",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_SOUNDS
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "get_sounds"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "func": function (sprite, script) {
            return script.getStringField("VALUE");
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "%1", 
                textParams: [
                    {
                        "type": "DropdownDynamic",
                        "value": null,
                        "menuName": "sounds",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_SOUNDS,
                        converter: Entry.block.converters.returnStringKey
                    }
                ],
                keyOption: "get_sounds"
            }
        ]}
    },
    "sound_something_with_block": {
        "color": "#A4D01D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/sound_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "get_sounds"
                },
                null
            ],
            "type": "sound_something_with_block"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "sound_play",
        "isNotFor": [],
        "func": function (sprite, script) {
            var soundId = script.getStringValue("VALUE", script);
            var sound = sprite.parent.getSound(soundId);

            if (sound) createjs.Sound.play(sound.id);
            //else
                //Entry.engine.stopProjectWithToast(
                    //this.block,
                    //'소리를 찾지 못했습니다.'
                //);

            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Entry.play_sound(%1)"]}
    },
    "sound_something_second_with_block": {
        "color": "#A4D01D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/sound_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "get_sounds",
                    "id": "95dw"
                },
                {
                    "type": "number",
                    "params": [ "1" ]
                },
                null
            ],
            "type": "sound_something_second_with_block"
        },
        "paramsKeyMap": {
            "VALUE": 0,
            "SECOND": 1
        },
        "class": "sound_play",
        "isNotFor": [],
        "func": function (sprite, script) {
            var soundId = script.getStringValue("VALUE", script);
            var timeValue = script.getNumberValue("SECOND", script);
            var sound = sprite.parent.getSound(soundId);

            if (sound) {
                var instance = createjs.Sound.play(sound.id, {startTime: 0, duration: timeValue * 1000});
                /*
                   var instance = createjs.Sound.play(sound.id);
                   setTimeout(function() {
                   instance.stop();
                   }, timeValue * 1000);
                   */
            }
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Entry.play_sound_for_sec(%1, %2)"]}
    },
    "sound_something_wait_with_block": {
        "color": "#A4D01D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/sound_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "get_sounds"
                },
                null
            ],
            "type": "sound_something_wait_with_block"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "sound_wait",
        "isNotFor": [],
        "func": function (sprite, script) {
            if (!script.isPlay) {
                script.isPlay = true;
                script.playState = 1;
                var soundId = script.getStringValue("VALUE", script);
                var sound = sprite.parent.getSound(soundId);
                if (sound) {
                    var instance = createjs.Sound.play(sound.id);
                    setTimeout(function() {
                        script.playState = 0;
                    }, sound.duration * 1000)
                }
                return script;
            } else if (script.playState == 1) {
                return script;
            } else {
                delete script.playState;
                delete script.isPlay;
                return script.callReturn();
            }
        },
        "syntax": {"js": [], "py": ["Entry.play_sound_and_wait(%1)"]}
    },
    "sound_something_second_wait_with_block": {
        "color": "#A4D01D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/sound_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "get_sounds"
                },
                {
                    "type": "number",
                    "params": [ "1" ]
                },
                null
            ],
            "type": "sound_something_second_wait_with_block"
        },
        "paramsKeyMap": {
            "VALUE": 0,
            "SECOND": 1
        },
        "class": "sound_wait",
        "isNotFor": [],
        "func": function (sprite, script) {
            if (!script.isPlay) {
                script.isPlay = true;
                script.playState = 1;
                var soundId = script.getStringValue("VALUE", script);
                var sound = sprite.parent.getSound(soundId);
                if (sound) {
                    var instance = createjs.Sound.play(sound.id);
                    var timeValue = script.getNumberValue("SECOND", script);
                    setTimeout(function() {
                        instance.stop();
                        script.playState = 0;
                    }, timeValue * 1000)
                    instance.addEventListener('complete', function(e) {
                    });
                }
                return script;
            } else if (script.playState == 1) {
                return script;
            } else {
                delete script.isPlay;
                delete script.playState;
                return script.callReturn();
            }
        },
        "syntax": {"js": [], "py": ["Entry.play_sound_for_sec_and_wait(%1, %2)"]}
    },
    "sound_from_to": {
        "color": "#A4D01D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/sound_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "get_sounds"
                },
                {
                    "type": "text",
                    "params": [ "1" ]
                },
                {
                    "type": "text",
                    "params": [ "10" ]
                },
                null
            ],
            "type": "sound_from_to"
        },
        "paramsKeyMap": {
            "VALUE": 0,
            "START": 1,
            "END": 2
        },
        "class": "sound_play",
        "isNotFor": [],
        "func": function (sprite, script) {
            var soundId = script.getStringValue("VALUE", script);
            var sound = sprite.parent.getSound(soundId);

            if (sound) {
                var start = script.getNumberValue("START", script)*1000;
                var end = script.getNumberValue("END", script)*1000;
                createjs.Sound.play(sound.id, {
                    startTime: Math.min(start, end),
                    duration: Math.max(start, end) - Math.min(start, end)
                });
            }
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Entry.play_sound_from_to(%1, %2, %3)"]}
    },
    "sound_from_to_and_wait": {
        "color": "#A4D01D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/sound_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "get_sounds"
                },
                {
                    "type": "text",
                    "params": [ "1" ]
                },
                {
                    "type": "text",
                    "params": [ "10" ]
                },
                null
            ],
            "type": "sound_from_to_and_wait"
        },
        "paramsKeyMap": {
            "VALUE": 0,
            "START": 1,
            "END": 2
        },
        "class": "sound_wait",
        "isNotFor": [],
        "func": function (sprite, script) {
            if (!script.isPlay) {
                script.isPlay = true;
                script.playState = 1;
                var soundId = script.getStringValue("VALUE", script);
                var sound = sprite.parent.getSound(soundId);
                if (sound) {
                    var start = script.getNumberValue("START", script)*1000;
                    var end = script.getNumberValue("END", script)*1000;
                    var startValue = Math.min(start, end);
                    var endValue = Math.max(start, end);
                    var duration = endValue - startValue;

                    createjs.Sound.play(sound.id, {
                        startTime: startValue,
                        duration: duration
                    });

                    setTimeout(function() {
                        script.playState = 0;
                    }, duration)
                }
                return script;
            } else if (script.playState == 1) {
                return script;
            } else {
                delete script.isPlay;
                delete script.playState;
                return script.callReturn();
            }
        },
        "syntax": {"js": [], "py": ["Entry.play_sound_from_to_and_wait(%1, %2, %3)"]}
    },
    "when_run_button_click": {
        "color": "#3BBD70",
        "skeleton": "basic_event",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/start_icon_play.png",
                "size": 17,
                "position": {
                    "x": 0,
                    "y": -2
                }
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "when_run_button_click"
        },
        "class": "event",
        "isNotFor": [],
        "func": function (sprite, script) {
            return script.callReturn();
        },
        "event": "start",
        "syntax": {"js": [], "py": [
            {
                syntax: "def when_start():" 
            }
        ]}
    },
    "press_some_key": {
        "color": "#3BBD70",
        "skeleton": "basic_event",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/start_icon_keyboard.png",
                "size": 17,
                "position": {
                    "x": 0,
                    "y": -2
                }
            },
            {
                "type": "Dropdown",
                "options": [
                    [ "q", "81" ],
                    [ "w", "87" ],
                    [ "e", "69" ],
                    [ "r", "82" ],
                    [ "a", "65" ],
                    [ "s", "83" ],
                    [ "d", "68" ],
                    [ "위쪽 화살표", "38" ],
                    [ "아래쪽 화살표", "40" ],
                    [ "왼쪽 화살표", "37" ],
                    [ "오른쪽 화살표", "39" ],
                    [ "엔터", "13" ],
                    [ "스페이스", "32" ]
                ],
                "value": "81",
                "fontSize": 11
            },
            {
                "type": "Indicator",
                "img": "block_icon/start_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null, null ]
        },
        "paramsKeyMap": {
            "VALUE": 1
        },
        "func": function (sprite, script) {
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [""]}
    },
    "when_some_key_pressed": {
        "color": "#3BBD70",
        "skeleton": "basic_event",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/start_icon_keyboard.png",
                "size": 17,
                "position": {
                    "x": 0,
                    "y": -2
                }
            },
            {
                "type": "Keyboard",
                "value": '81'
            }
        ],
        "events": {},
        "def": {
            "params": [ null, "81" ],
            "type": "when_some_key_pressed"
        },
        "paramsKeyMap": {
            "VALUE": 1
        },
        "class": "event",
        "isNotFor": [],
        "func": function (sprite, script) {
            return script.callReturn();
        },
        "event": "keyPress",

        //"syntax": {"js": [], "py": ["def entry_event_key():\n\tif key == %2:"]}
        "syntax": {"js": [], "py": [
            {
                syntax: "def when_press_key(%2):",
                textParams: [
                    undefined,
                    {
                        "type": "Keyboard",
                        "value": '81',
                        converter: Entry.block.converters.keyboardCode
                    }
                ]
            }
        ]}
    },
    "mouse_clicked": {
        "color": "#3BBD70",
        "skeleton": "basic_event",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/start_icon_mouse.png",
                "size": 17,
                "position": {
                    "x": 0,
                    "y": -2
                }
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "mouse_clicked"
        },
        "class": "event",
        "isNotFor": [],
        "func": function (sprite, script) {
            return script.callReturn();
        },
        "event": "mouse_clicked",
        "syntax": {"js": [], "py": ["def when_click_mouse_on():"]}
    },
    "mouse_click_cancled": {
        "color": "#3BBD70",
        "skeleton": "basic_event",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/start_icon_mouse.png",
                "size": 17,
                "position": {
                    "x": 0,
                    "y": -2
                }
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "mouse_click_cancled"
        },
        "class": "event",
        "isNotFor": [],
        "func": function (sprite, script) {
            return script.callReturn();
        },
        "event": "mouse_click_cancled",
        "syntax": {"js": [], "py": ["def when_click_mouse_off():"]}
    },
    "when_object_click": {
        "color": "#3BBD70",
        "skeleton": "basic_event",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/start_icon_mouse.png",
                "size": 17,
                "position": {
                    "x": 0,
                    "y": -2
                }
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "when_object_click"
        },
        "class": "event",
        "isNotFor": [],
        "func": function (sprite, script) {
            return script.callReturn();
        },
        "event": "when_object_click",
        "syntax": {"js": [], "py": ["def when_click_object_on():"]}
    },
    "when_object_click_canceled": {
        "color": "#3BBD70",
        "skeleton": "basic_event",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/start_icon_mouse.png",
                "size": 17,
                "position": {
                    "x": 0,
                    "y": -2
                }
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "when_object_click_canceled"
        },
        "class": "event",
        "isNotFor": [],
        "func": function (sprite, script) {
            return script.callReturn();
        },
        "event": "when_object_click_canceled",
        "syntax": {"js": [], "py": ["def when_click_object_off():"]}
    },
    "when_some_key_click": {
        "color": "#3BBD70",
        "skeleton": "basic_event",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/start_icon_keyboard.png",
                "size": 17,
                "position": {
                    "x": 0,
                    "y": -2
                }
            }
        ],
        "events": {},
        "def": {
            "params": [ null ]
        },
        "func": function (sprite, script) {
            return script.callReturn();
        },
        "event": "keyPress",
        "syntax": {"js": [], "py": ["Entry.on_key_press_down(%1)"]}
    },
    "when_message_cast": {
        "color": "#3BBD70",
        "skeleton": "basic_event",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/start_icon_signal.png",
                "size": 17,
                "position": {
                    "x": 0,
                    "y": -2
                }
            },
            {
                "type": "DropdownDynamic",
                "value": null,
                "menuName": "messages",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_START
            }
        ],
        "events": {
            "dataAdd": [
                function(block) {
                    var vc = Entry.variableContainer;
                    if (vc) vc.addRef('_messageRefs', block);
                }
            ],
            "viewDestroy": [
                function(block) {
                    var vc = Entry.variableContainer;
                    if (vc) vc.removeRef('_messageRefs', block);
                }
            ]
        },
        "def": {
            "params": [ null, null ],
            "type": "when_message_cast"
        },
        "paramsKeyMap": {
            "VALUE": 1
        },
        "class": "message",
        "isNotFor": [ "message" ],
        "func": function (sprite, script) {
            return script.callReturn();
        },
        "event": "when_message_cast",

        //"syntax": {"js": [], "py": ["def entry_event_signal():\n\tif signal == %2:"]}
        "syntax": {"js": [], "py": [
            {
                syntax: "def when_get_signal(%2):",
                textParams: [
                    undefined,
                    {
                        "type": "DropdownDynamic",
                        "value": null,
                        "menuName": "messages",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_START,
                        converter: Entry.block.converters.returnStringKey
                    }
                ]
            }
        ]}
    },
    "message_cast": {
        "color": "#3BBD70",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "DropdownDynamic",
                "value": null,
                "menuName": "messages",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_START
            },
            {
                "type": "Indicator",
                "img": "block_icon/start_03.png",
                "size": 12
            }
        ],
        "events": {
            "dataAdd": [
                function(block) {
                    var vc = Entry.variableContainer;
                    if (vc) vc.addRef('_messageRefs', block);
                }
            ],
            "viewDestroy": [
                function(block) {
                    var vc = Entry.variableContainer;
                    if (vc) vc.removeRef('_messageRefs', block);
                }
            ]
        },
        "def": {
            "params": [ null, null ],
            "type": "message_cast"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "message",
        "isNotFor": [ "message" ],
        "func": function (sprite, script) {
            var value = script.getField("VALUE", script);

            var arr = Entry.variableContainer.messages_;
            var isExist = Entry.isExist(value, 'id', arr);

            if (value == 'null' || !isExist)
                throw new Error('value can not be null or undefined');

            Entry.engine.raiseMessage(value);
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Entry.send_signal(%1)",
                textParams: [
                    {
                        "type": "DropdownDynamic",
                        "value": null,
                        "menuName": "messages",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_START,
                        converter: Entry.block.converters.returnStringKey
                    },
                    undefined
                ]
            }
        ]}
    },
    "message_cast_wait": {
        "color": "#3BBD70",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "DropdownDynamic",
                "value": null,
                "menuName": "messages",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_START
            },
            {
                "type": "Indicator",
                "img": "block_icon/start_03.png",
                "size": 12
            }
        ],
        "events": {
            "dataAdd": [
                function(block) {
                    var vc = Entry.variableContainer;
                    if (vc) vc.addRef('_messageRefs', block);
                }
            ],
            "dataDestroy": [
                function(block) {
                    var vc = Entry.variableContainer;
                    if (vc) vc.removeRef('_messageRefs', block);
                }
            ]
        },
        "def": {
            "params": [ null, null ],
            "type": "message_cast_wait"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "message",
        "isNotFor": [ "message" ],
        "func": function (sprite, script) {
            if (script.runningScript) {
                var runningScript = script.runningScript;
                var length = runningScript.length;
                for (var i = 0; i < length; i++) {
                    var executor = runningScript.shift();
                    if (executor && !executor.isEnd())
                        runningScript.push(executor);
                }
                if (runningScript.length) {
                    return script;
                } else {
                    return script.callReturn();
                }
            } else {
                var value = script.getField("VALUE", script);
                var arr = Entry.variableContainer.messages_;
                var isExist = Entry.isExist(value, 'id', arr);
                if (value == 'null' || !isExist)
                    throw new Error('value can not be null or undefined');
                var data = Entry.engine.raiseMessage(value);
                var runningScript = [];
                while (data.length) {
                    var executor = data.shift();
                    if (executor)
                        runningScript = runningScript.concat(executor);
                }

                script.runningScript = runningScript;
                return script;
            }
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Entry.send_signal_wait(%1)",
                textParams: [
                    {
                        "type": "DropdownDynamic",
                        "value": null,
                        "menuName": "messages",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_START,
                        converter: Entry.block.converters.returnStringKey
                    }
                ]
            }
        ]}
    },
    "text": {
        "color": "#FFD974",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "TextInput",
                "value": 10
            }
        ],
        "events": {},
        "def": {
            "params": [],
            type: "text"
        },
        "paramsKeyMap": {
            "NAME": 0
        },
        "func": function (sprite, script) {
            return script.getField('NAME', script);
        },
        "isPrimitive": true,
        "syntax": {"js": ["Scope", "%1"], "py": [
            {
                syntax: "%1",
                keyOption: "text",
                textParams: [
                    {
                        "type": "TextInput",
                        converter: Entry.block.converters.returnStringOrNumberByValue
                    },
                ]
            }
        ]}
    },
    "text_write": {
        "color": "#FFCA36",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/text.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "text",
                    "params": [ Lang.Blocks.entry ]
                },
                null
            ],
            "type": "text_write"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "text",
        "isNotFor": [ "sprite" ],
        "func": function (sprite, script) {
            var text = script.getStringValue("VALUE", script);
            text = Entry.convertToRoundedDecimals(text, 3);
            sprite.setText(text);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Entry.write_text(%1)"]}
    },
    "text_append": {
        "color": "#FFCA36",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/text.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "text",
                    "params": [ Lang.Blocks.entry ]
                },
                null
            ],
            "type": "text_append"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "text",
        "isNotFor": [ "sprite" ],
        "func": function (sprite, script) {
            var text = script.getStringValue("VALUE", script);
            sprite.setText(Entry.convertToRoundedDecimals(sprite.getText(),3) +
                           Entry.convertToRoundedDecimals(text, 3));
                           return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Entry.append_text(%1)"]}
    },
    "text_prepend": {
        "color": "#FFCA36",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/text.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "text",
                    "params": [ Lang.Blocks.entry ]
                },
                null
            ],
            "type": "text_prepend"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "text",
        "isNotFor": [ "sprite" ],
        "func": function (sprite, script) {
            var text = script.getStringValue("VALUE", script);
            sprite.setText(Entry.convertToRoundedDecimals(text, 3) +
                           Entry.convertToRoundedDecimals(sprite.getText(), 3));
                           return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Entry.prepend_text(%1)"]}
    },
    "text_flush": {
        "color": "#FFCA36",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "img": "block_icon/text.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [null],
            "type": "text_flush"
        },
        "class": "text",
        "isNotFor": [ "sprite" ],
        "func": function (sprite, script) {
            sprite.setText('');
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Entry.clear_text()"]}
    },
    "variableAddButton": {
        "skeleton": "basic_button",
        "color": "#eee",
        "params": [
            {
                "type": "Text",
                "text": Lang.Workspace.variable_create,
                "color": "#333",
                "align": "center"
            }
        ],
        "events": {
            "mousedown": [
                function() {
                    Entry.variableContainer.openVariableAddPanel('variable');
                }
            ]
        },
        "syntax": {"js": [], "py": [""]}
    },
    "listAddButton": {
        "skeleton": "basic_button",
        "color": "#eee",
        "params": [
            {
                "type": "Text",
                "text": Lang.Workspace.create_list_block,
                "color": "#333",
                "align": "center"
            }
        ],
        "events": {
            "mousedown": [
                function() {
                    Entry.variableContainer.openVariableAddPanel('list');
                }
            ]
        }
    },
    "change_variable": {
        "color": "#E457DC",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "DropdownDynamic",
                "value": null,
                "menuName": "variables",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_VARIABLE
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/variable_03.png",
                "size": 12
            }
        ],
        "events": {
            "dataAdd": [
                function(block) {
                    var vc = Entry.variableContainer;
                    if (vc) vc.addRef('_variableRefs', block);
                }
            ],
            "dataDestroy": [
                function(block) {
                    var vc = Entry.variableContainer;
                    if (vc) vc.removeRef('_variableRefs', block);
                }
            ]
        },
        "def": {
            "params": [
                null,
                {
                    "type": "text",
                    "params": [ "10" ]
                },
                null
            ],
            "type": "change_variable"
        },
        "paramsKeyMap": {
            "VARIABLE": 0,
            "VALUE": 1
        },
        "class": "variable",
        "isNotFor": [ "variable", "variableNotExist" ],
        "func": function (sprite, script) {
            var variableId = script.getField("VARIABLE", script);
            var value = script.getNumberValue("VALUE", script);
            var fixed = 0;

            value = Entry.parseNumber(value);
            if ((value == false && typeof value == 'boolean'))
                throw new Error('Type is not correct');
            var variable = Entry.variableContainer.getVariable(variableId, sprite);
            fixed = Entry.getMaxFloatPoint([value, variable.getValue()]);
            variable.setValue((value + variable.getValue()).toFixed(fixed));
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "%1 = %1 + %2",
                textParams: [
                    {
                        "type": "DropdownDynamic",
                        "value": null,
                        "menuName": "variables",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_VARIABLE,
                        converter: Entry.block.converters.returnRawStringKey
                    },
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                ]
            }
        ]}
    },
    "set_variable": {
        "color": "#E457DC",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "DropdownDynamic",
                "value": null,
                "menuName": "variables",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_VARIABLE
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/variable_03.png",
                "size": 12
            }
        ],
        "events": {
            "dataAdd": [
                function(block) {
                    var vc = Entry.variableContainer;
                    if (vc) vc.addRef('_variableRefs', block);
                }
            ],
            "dataDestroy": [
                function(block) {
                    var vc = Entry.variableContainer;
                    if (vc) vc.removeRef('_variableRefs', block);
                }
            ]
        },
        "def": {
            "params": [
                null,
                {
                    "type": "text",
                    "params": [ "10" ]
                },
                null
            ],
            "type": "set_variable"
        },
        "paramsKeyMap": {
            "VARIABLE": 0,
            "VALUE": 1
        },
        "class": "variable",
        "isNotFor": [ "variable", "variableNotExist" ],
        "func": function (sprite, script) {
            var variableId = script.getField("VARIABLE", script);
            var value = script.getValue("VALUE", script);
            var variable = Entry.variableContainer.getVariable(variableId, sprite);
            variable.setValue(value);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "%1 = %2",
                textParams: [
                    {
                        "type": "DropdownDynamic",
                        "value": null,
                        "menuName": "variables",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_VARIABLE,
                        converter: Entry.block.converters.returnRawStringKey
                    },
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                ]
            }
        ]}
    },
    "show_variable": {
        "color": "#E457DC",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "DropdownDynamic",
                "value": null,
                "menuName": "variables",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_VARIABLE
            },
            {
                "type": "Indicator",
                "img": "block_icon/variable_03.png",
                "size": 12
            }
        ],
        "events": {
            "dataAdd": [
                function(block) {
                    var vc = Entry.variableContainer;
                    if (vc) vc.addRef('_variableRefs', block);
                }
            ],
            "dataDestroy": [
                function(block) {
                    var vc = Entry.variableContainer;
                    if (vc) vc.removeRef('_variableRefs', block);
                }
            ]
        },
        "def": {
            "params": [ null, null ],
            "type": "show_variable"
        },
        "paramsKeyMap": {
            "VARIABLE": 0
        },
        "class": "variable_visibility",
        "isNotFor": [ "variable", "variableNotExist" ],
        "func": function (sprite, script) {
            var variableId = script.getField("VARIABLE", script);
            var variable = Entry.variableContainer.getVariable(variableId, sprite);
            variable.setVisible(true);
            variable.updateView();
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Entry.show_variable(%1)",
                textParams: [
                    {
                        "type": "DropdownDynamic",
                        "value": null,
                        "menuName": "variables",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_VARIABLE,
                        converter: Entry.block.converters.returnStringKey
                    },
                ]
            }
        ]}
    },
    "hide_variable": {
        "color": "#E457DC",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "DropdownDynamic",
                "value": null,
                "menuName": "variables",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_VARIABLE
            },
            {
                "type": "Indicator",
                "img": "block_icon/variable_03.png",
                "size": 12
            }
        ],
        "events": {
            "dataAdd": [
                function(block) {
                    var vc = Entry.variableContainer;
                    if (vc) vc.addRef('_variableRefs', block);
                }
            ],
            "dataDestroy": [
                function(block) {
                    var vc = Entry.variableContainer;
                    if (vc) vc.removeRef('_variableRefs', block);
                }
            ]
        },
        "def": {
            "params": [ null, null ],
            "type": "hide_variable"
        },
        "paramsKeyMap": {
            "VARIABLE": 0
        },
        "class": "variable_visibility",
        "isNotFor": [ "variable", "variableNotExist" ],
        "func": function (sprite, script) {
            var variableId = script.getField("VARIABLE", script);
            var variable = Entry.variableContainer.getVariable(variableId, sprite);
            variable.setVisible(false);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Entry.hide_variable(%1)",
                textParams: [
                    {
                        "type": "DropdownDynamic",
                        "value": null,
                        "menuName": "variables",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_VARIABLE,
                        converter: Entry.block.converters.returnStringKey
                    },
                ]
            }
        ]}
    },
    "get_variable": {
        "color": "#E457DC",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "DropdownDynamic",
                "value": null,
                "menuName": "variables",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_VARIABLE
            },
            {
                "type": "Text",
                "text": Lang.Blocks.VARIABLE_get_variable_1,
                "color": "white"
            }
        ],
        "events": {
            "dataAdd": [
                function(block) {
                    var vc = Entry.variableContainer;
                    if (vc) vc.addRef('_variableRefs', block);
                }
            ],
            "dataDestroy": [
                function(block) {
                    var vc = Entry.variableContainer;
                    if (vc) vc.removeRef('_variableRefs', block);
                }
            ]
        },
        "def": {
            "params": [ null ],
            "type": "get_variable"
        },
        "paramsKeyMap": {
            "VARIABLE": 0
        },
        "class": "variable",
        "isNotFor": [ "variable", "variableNotExist" ],
        "func": function (sprite, script) {
            var variableId = script.getField("VARIABLE", script);
            var variable = Entry.variableContainer.getVariable(variableId, sprite);
            return variable.getValue();
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "%1",
                keyOption: "get_variable",
                textParams: [
                    {
                        "type": "DropdownDynamic",
                        "value": null,
                        "menuName": "variables",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_VARIABLE,
                        converter: Entry.block.converters.returnRawStringKey
                    },
                ]
            }
        ]}
    },
    "ask_and_wait": {
        "color": "#E457DC",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/variable_03.png",
                "size": 12
            }
        ],
        "events": {
            "viewAdd": [
                function() {
                    if (Entry.container) Entry.container.showProjectAnswer();
                }
            ],
            "viewDestroy": [
                function(block) {
                    if (Entry.container) Entry.container.hideProjectAnswer(block);
                }
            ]
        },
        "def": {
            "params": [
                {
                    "type": "text",
                    "params": [ Lang.Blocks.block_hi ]
                },
                null
            ],
            "type": "ask_and_wait"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "ask",
        "isNotFor": [],
        "func": function (sprite, script) {
            var inputModel = Entry.container.inputValue,
                inputView = Entry.stage.inputField,

                /*message = script.getValue("VALUE", script);

                if (!message)
                    throw new Error('message can not be empty');

                if (inputModel.sprite == sprite &&
                    inputView && !inputView._isHidden) {
                        return script;
                    } else if (inputModel.sprite != sprite && script.isInit) {
                        if(sprite.dialog)
                            sprite.dialog.remove();
                        delete script.isInit;
                        return script.callReturn();
                    } else if (inputModel.complete &&
                               inputModel.sprite == sprite &&
                               inputView._isHidden && script.isInit) {
                                   if(sprite.dialog)
                                       sprite.dialog.remove();
                                   delete inputModel.complete;
                                   delete script.isInit;
                                   return script.callReturn();
                               } else {
                                   message = Entry.convertToRoundedDecimals(message, 3);
                                   new Entry.Dialog(sprite, message, 'speak');
                                   Entry.stage.showInputField();
                                   inputModel.script = script;
                                   inputModel.sprite = sprite;
                                   script.isInit = true;
                                   return script;
                               }*/

                message = script.getValue("VALUE", script);

            if (!message)
                throw new Error('message can not be empty');

            if (inputModel.sprite == sprite &&
                inputView && !inputView._isHidden) {
                    return script;
            } else if (inputModel.sprite != sprite && script.isInit) {
                if(sprite.dialog)
                    sprite.dialog.remove();
                delete script.isInit;
                return script.callReturn();
            } else if (inputModel.complete &&
                inputModel.sprite == sprite &&
                inputView._isHidden && script.isInit) {
                if(sprite.dialog)
                    sprite.dialog.remove();
                delete inputModel.complete;
                delete script.isInit;
                return script.callReturn();
            } else {
                message = Entry.convertToRoundedDecimals(message, 3);
                Entry.stage.showInputField();
                new Entry.Dialog(sprite, message, 'ask');
                inputModel.script = script;
                inputModel.sprite = sprite;
                inputModel.complete = false;
                script.isInit = true;
                return script;
            }
        },
        "syntax": {"js": [], "py": ["Entry.input(%1)"]}
    },
    "get_canvas_input_value": {
        "color": "#E457DC",
        "vimModeFontColor": "white",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Text",
                "text": Lang.Blocks.VARIABLE_get_canvas_input_value,
                "color": "#fff"
            }
        ],
        "events": {
            "viewAdd": [
                function() {
                    if (Entry.container) Entry.container.showProjectAnswer();
                }
            ],
            "viewDestroy": [
                function(block) {
                    if (Entry.container) Entry.container.hideProjectAnswer(block);
                }
            ]
        },
        "def": {
            "params": [ null ],
            "type": "get_canvas_input_value"
        },
        "class": "ask",
        "isNotFor": [],
        "func": function (sprite, script) {
            return Entry.container.getInputValue();
        },
        "syntax": {"js": [], "py": ["Entry.answer()"]}
    },
    "add_value_to_list": {
        "color": "#E457DC",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "DropdownDynamic",
                "value": null,
                "menuName": "lists",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_VARIABLE
            },
            {
                "type": "Indicator",
                "img": "block_icon/variable_03.png",
                "size": 12
            }
        ],
        "events": {
            "dataAdd": [
                function(block) {
                    var vc = Entry.variableContainer;
                    if (vc) vc.addRef('_variableRefs', block);
                }
            ],
            "dataDestroy": [
                function(block) {
                    var vc = Entry.variableContainer;
                    if (vc) vc.removeRef('_variableRefs', block);
                }
            ]
        },
        "def": {
            "params": [
                {
                    "type": "text",
                    "params": [ "10" ]
                },
                null,
                null
            ],
            "type": "add_value_to_list"
        },
        "paramsKeyMap": {
            "VALUE": 0,
            "LIST": 1
        },
        "class": "list",
        "isNotFor": [ "list", "listNotExist" ],
        "func": function (sprite, script) {
            var listId = script.getField("LIST", script);
            var value = script.getValue("VALUE", script);
            var list = Entry.variableContainer.getList(listId, sprite);

            if (!list.array_)
                list.array_ = [];
            list.array_.push({'data' : value});
            list.updateView();
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "%2.append(%1)",
                textParams: [
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    {
                        "type": "DropdownDynamic",
                        "value": null,
                        "menuName": "lists",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_VARIABLE,
                        converter: Entry.block.converters.returnRawStringKey
                    },
                ]
            }
        ]}
    },
    "remove_value_from_list": {
        "color": "#E457DC",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "DropdownDynamic",
                "value": null,
                "menuName": "lists",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_VARIABLE
            },
            {
                "type": "Indicator",
                "img": "block_icon/variable_03.png",
                "size": 12
            }
        ],
        "events": {
            "dataAdd": [
                function(block) {
                    var vc = Entry.variableContainer;
                    if (vc) vc.addRef('_variableRefs', block);
                }
            ],
            "dataDestroy": [
                function(block) {
                    var vc = Entry.variableContainer;
                    if (vc) vc.removeRef('_variableRefs', block);
                }
            ]
        },
        "def": {
            "params": [
                {
                    "type": "number",
                    "params": [ "1" ]
                },
                null,
                null
            ],
            "type": "remove_value_from_list"
        },
        "paramsKeyMap": {
            "VALUE": 0,
            "LIST": 1
        },
        "class": "list",
        "isNotFor": [ "list", "listNotExist" ],
        "func": function (sprite, script) {
            var listId = script.getField("LIST", script);
            var value = script.getValue("VALUE", script);
            var list = Entry.variableContainer.getList(listId, sprite);

            if (!list.array_ || isNaN(value) || value > list.array_.length)
                throw new Error('can not remove value from array');

            list.array_.splice(value-1,1);

            list.updateView();
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "%2.pop(%1)",
                textParams: [
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    {
                        "type": "DropdownDynamic",
                        "value": null,
                        "menuName": "lists",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_VARIABLE,
                        converter: Entry.block.converters.returnRawStringKey
                    },
                ]
            }
        ]}
    },
    "insert_value_to_list": {
        "color": "#E457DC",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "DropdownDynamic",
                "value": null,
                "menuName": "lists",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_VARIABLE
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/variable_03.png",
                "size": 12
            }
        ],
        "events": {
            "dataAdd": [
                function(block) {
                    var vc = Entry.variableContainer;
                    if (vc) vc.addRef('_variableRefs', block);
                }
            ],
            "dataDestroy": [
                function(block) {
                    var vc = Entry.variableContainer;
                    if (vc) vc.removeRef('_variableRefs', block);
                }
            ]
        },
        "def": {
            "params": [
                {
                    "type": "text",
                    "params": [ "10" ]
                },
                null,
                {
                    "type": "text",
                    "params": [ "1" ]
                },
                null
            ],
            "type": "insert_value_to_list"
        },
        "paramsKeyMap": {
            "DATA": 0,
            "LIST": 1,
            "INDEX": 2
        },
        "class": "list",
        "isNotFor": [ "list", "listNotExist" ],
        "func": function (sprite, script) {
            var listId = script.getField("LIST", script);
            var data = script.getValue("DATA", script);
            var index = script.getValue("INDEX", script);
            var list = Entry.variableContainer.getList(listId, sprite);

            if (!list.array_ || isNaN(index) || index == 0 || index > list.array_.length +1)
                throw new Error('can not insert value to array');

            list.array_.splice(index-1, 0, {'data': data});
            list.updateView();
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "%2.insert(%3, %1)",
                textParams: [
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    {
                        "type": "DropdownDynamic",
                        "value": null,
                        "menuName": "lists",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_VARIABLE,
                        converter: Entry.block.converters.returnRawStringKey
                    },
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                ]
            }
        ]}
    },
    "change_value_list_index": {
        "color": "#E457DC",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "DropdownDynamic",
                "value": null,
                "menuName": "lists",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_VARIABLE
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/variable_03.png",
                "size": 12
            }
        ],
        "events": {
            "dataAdd": [
                function(block) {
                    var vc = Entry.variableContainer;
                    if (vc) vc.addRef('_variableRefs', block);
                }
            ],
            "dataDestroy": [
                function(block) {
                    var vc = Entry.variableContainer;
                    if (vc) vc.removeRef('_variableRefs', block);
                }
            ]
        },
        "def": {
            "params": [
                null,
                {
                    "type": "text",
                    "params": [ "1" ]
                },
                {
                    "type": "text",
                    "params": [ "10" ]
                },
                null
            ],
            "type": "change_value_list_index"
        },
        "paramsKeyMap": {
            "LIST": 0,
            "INDEX": 1,
            "DATA": 2
        },
        "class": "list",
        "isNotFor": [ "list", "listNotExist" ],
        "func": function (sprite, script) {
            var listId = script.getField("LIST", script);
            var data = script.getValue("DATA", script);
            var index = script.getValue("INDEX", script);
            var list = Entry.variableContainer.getList(listId, sprite);

            if (!list.array_ || isNaN(index) || index > list.array_.length)
                throw new Error('can not insert value to array');

            list.array_[index-1].data = data;
            list.updateView();
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "%1\[%2\] = %3",
                textParams: [
                    {
                        "type": "DropdownDynamic",
                        "value": null,
                        "menuName": "lists",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_VARIABLE,
                        converter: Entry.block.converters.returnRawStringKey
                    },
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                ]
            }
        ]}
    },
    "value_of_index_from_list": {
        "color": "#E457DC",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Text",
                "text": Lang.Blocks.VARIABLE_value_of_index_from_list_1,
                "color": "white"
            },
            {
                "type": "DropdownDynamic",
                "value": null,
                "menuName": "lists",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_VARIABLE
            },
            {
                "type": "Text",
                "text": Lang.Blocks.VARIABLE_value_of_index_from_list_2,
                "color": "white"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Text",
                "text": Lang.Blocks.VARIABLE_value_of_index_from_list_3,
                "color": "white"
            }
        ],
        "events": {
            "dataAdd": [
                function(block) {
                    var vc = Entry.variableContainer;
                    if (vc) vc.addRef('_variableRefs', block);
                }
            ],
            "dataDestroy": [
                function(block) {
                    var vc = Entry.variableContainer;
                    if (vc) vc.removeRef('_variableRefs', block);
                }
            ]
        },
        "def": {
            "params": [
                null,
                null,
                null,
                {
                    "type": "number",
                    "params": [ "1" ]
                }
            ],
            "type": "value_of_index_from_list"
        },
        "paramsKeyMap": {
            "LIST": 1,
            "INDEX": 3
        },
        "class": "list_element",
        "isNotFor": [ "list", "listNotExist" ],
        "func": function (sprite, script) {
            var listId = script.getField("LIST", script);
            var index = script.getValue("INDEX", script);
            var list = Entry.variableContainer.getList(listId, sprite);
            index = Entry.getListRealIndex(index, list);

            if (!list.array_ || isNaN(index) || index > list.array_.length)
                throw new Error('can not insert value to array');

            return list.array_[index-1].data
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "%2\[%4\]",
                textParams: [
                    undefined,
                    {
                        "type": "DropdownDynamic",
                        "value": null,
                        "menuName": "lists",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_VARIABLE,
                        converter: Entry.block.converters.returnRawStringKey
                    },
                    undefined,
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                ]
            }
        ]}
    },
    "length_of_list": {
        "color": "#E457DC",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Text",
                "text": Lang.Blocks.VARIABLE_length_of_list_1,
                "color": "white"
            },
            {
                "type": "DropdownDynamic",
                "value": null,
                "menuName": "lists",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_VARIABLE
            },
            {
                "type": "Text",
                "text": Lang.Blocks.VARIABLE_length_of_list_2,
                "color": "white"
            }
        ],
        "events": {
            "dataAdd": [
                function(block) {
                    var vc = Entry.variableContainer;
                    if (vc) vc.addRef('_variableRefs', block);
                }
            ],
            "dataDestroy": [
                function(block) {
                    var vc = Entry.variableContainer;
                    if (vc) vc.removeRef('_variableRefs', block);
                }
            ]
        },
        "def": {
            "params": [ null, null, null ],
            "type": "length_of_list"
        },
        "paramsKeyMap": {
            "LIST": 1
        },
        "class": "list",
        "isNotFor": [ "list", "listNotExist" ],
        "func": function (sprite, script) {
            var listId = script.getField("LIST", script);
            var list = Entry.variableContainer.getList(listId, sprite);

            return list.array_.length;
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "len(%2)",
                textParams: [
                    undefined,
                    {
                        "type": "DropdownDynamic",
                        "value": null,
                        "menuName": "lists",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_VARIABLE,
                        converter: Entry.block.converters.returnRawStringKey
                    },
                ]
            }
        ]}
    },
    "show_list": {
        "color": "#E457DC",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "DropdownDynamic",
                "value": null,
                "menuName": "lists",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_VARIABLE
            },
            {
                "type": "Indicator",
                "img": "block_icon/variable_03.png",
                "size": 12
            }
        ],
        "events": {
            "dataAdd": [
                function(block) {
                    var vc = Entry.variableContainer;
                    if (vc) vc.addRef('_variableRefs', block);
                }
            ],
            "dataDestroy": [
                function(block) {
                    var vc = Entry.variableContainer;
                    if (vc) vc.removeRef('_variableRefs', block);
                }
            ]
        },
        "def": {
            "params": [ null, null ],
            "type": "show_list"
        },
        "paramsKeyMap": {
            "LIST": 0
        },
        "class": "list_visibility",
        "isNotFor": [ "list", "listNotExist" ],
        "func": function (sprite, script) {
            var listId = script.getField("LIST", script);
            var list = Entry.variableContainer.getList(listId);

            list.setVisible(true);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Entry.show_list(%1)",
                textParams: [
                    {
                        "type": "DropdownDynamic",
                        "value": null,
                        "menuName": "lists",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_VARIABLE,
                        converter: Entry.block.converters.returnRawStringKey
                    },
                ]
            }
        ]}
    },
    "hide_list": {
        "color": "#E457DC",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "DropdownDynamic",
                "value": null,
                "menuName": "lists",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_VARIABLE
            },
            {
                "type": "Indicator",
                "img": "block_icon/variable_03.png",
                "size": 12
            }
        ],
        "events": {
            "dataAdd": [
                function(block) {
                    var vc = Entry.variableContainer;
                    if (vc) vc.addRef('_variableRefs', block);
                }
            ],
            "dataDestroy": [
                function(block) {
                    var vc = Entry.variableContainer;
                    if (vc) vc.removeRef('_variableRefs', block);
                }
            ]
        },
        "def": {
            "params": [ null, null ],
            "type": "hide_list"
        },
        "paramsKeyMap": {
            "LIST": 0
        },
        "class": "list_visibility",
        "isNotFor": [ "list", "listNotExist" ],
        "func": function (sprite, script) {
            var listId = script.getField("LIST", script);
            var list = Entry.variableContainer.getList(listId);

            list.setVisible(false);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Entry.hide_list(%1)",
                textParams: [
                    {
                        "type": "DropdownDynamic",
                        "value": null,
                        "menuName": "lists",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_VARIABLE,
                        converter: Entry.block.converters.returnRawStringKey
                    },
                ]
            }
        ]}
    },
    "options_for_list": {
        "color": "#E457DC",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ "첫번째", "FIRST" ],
                    [ "마지막", "LAST" ],
                    [ "무작위", "RANDOM" ]
                ],
                "value": "FIRST",
                "fontSize": 11
            }
        ],
        "events": {},
        "def": {
            "params": [ null ]
        },
        "paramsKeyMap": {
            "OPERATOR": 0
        },
        "func": function (sprite, script) {
            return script.getField("OPERATOR", script);
        },
        "syntax": {"js": [], "py": [""]}
    },
    "set_visible_answer": {
        "color": "#E457DC",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.CALC_timer_visible_show,"SHOW"],
                    [Lang.Blocks.CALC_timer_visible_hide,"HIDE"]
                ],
                "value": "SHOW",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_VARIABLE
            },
            {
                "type": "Indicator",
                "img": "block_icon/variable_03.png",
                "size": 12
            }
        ],
        "events": {
            "viewAdd": [
                function(block) {
                    if (Entry.container) Entry.container.showProjectAnswer();
                }
            ],
            "viewDestroy": [
                function(block) {
                    if (Entry.container) Entry.container.hideProjectAnswer(block);
                }
            ]
        },
        "def": {
            "params": [ "HIDE", null ],
            "type": "set_visible_answer"
        },
        "paramsKeyMap": {
            "BOOL": 0
        },
        "class": "ask",
        "isNotFor": [],
        "func": function (sprite, script) {
            var bool = script.getField("BOOL", script);
            if (bool == 'HIDE')
                Entry.container.inputValue.setVisible(false);
            else
                Entry.container.inputValue.setVisible(true);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "Entry.answer_view(%1)",
                textParams: [
                    {
                        "type": "Dropdown",
                        "options": [
                            [Lang.Blocks.CALC_timer_visible_show,"SHOW"],
                            [Lang.Blocks.CALC_timer_visible_hide,"HIDE"]
                        ],
                        "value": "SHOW",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_VARIABLE,
                        converter: Entry.block.converters.returnStringValue
                    },
                ]
            }
        ]}
    },
    "is_included_in_list": {
        "color": "#E457DC",
        "skeleton": "basic_boolean_field",
        "statements": [],
        "params": [
            {
                "type": "Text",
                "text": Lang.Blocks.VARIABLE_is_included_in_list_1,
                "color": "white"
            },
            {
                "type": "DropdownDynamic",
                "value": null,
                "menuName": "lists",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_VARIABLE
            },
            {
                "type": "Text",
                "text": Lang.Blocks.VARIABLE_is_included_in_list_2,
                "color": "white"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Text",
                "text": Lang.Blocks.VARIABLE_is_included_in_list_3,
                "color": "white"
            }
        ],
        "events": {
            "dataAdd": [
                function(block) {
                    var vc = Entry.variableContainer;
                    if (vc) vc.addRef('_variableRefs', block);
                }
            ],
            "dataDestroy": [
                function(block) {
                    var vc = Entry.variableContainer;
                    if (vc) vc.removeRef('_variableRefs', block);
                }
            ]
        },
        "def": {
            "params": [
                null, null, null,
                {
                    "type": "text",
                    "params": [ "10" ]
                }, null
            ],
            "type": "is_included_in_list"
        },
        "paramsKeyMap": {
            "LIST": 1,
            "DATA": 3
        },
        "class": "list",
        "isNotFor": [ "list", "listNotExist" ],
        "func": function (sprite, script) {
            var listId = script.getField("LIST", script);
            var data = script.getStringValue("DATA", script);
            var list = Entry.variableContainer.getList(listId, sprite);
            if (!list)
                return false;
            var arr = list.array_;

            for (var i=0, len=arr.length; i<len; i++) {
                if (arr[i].data.toString() == data.toString())
                    return true;
            }
            return false;
        },
        "syntax": {"js": [], "py": [
            {
                syntax: "%4 in %2",
                textParams: [
                    undefined,
                    {
                        "type": "DropdownDynamic",
                        "value": null,
                        "menuName": "lists",
                        "fontSize": 11,
                        'arrowColor': EntryStatic.ARROW_COLOR_VARIABLE,
                        converter: Entry.block.converters.returnRawStringKey
                    },
                    undefined,
                    {
                        "type": "Block",
                        "accept": "string"
                    },
                ]
            }
        ]}
    },
    "xbot_digitalInput": {
        "color": "#00979D",
        "skeleton": "basic_boolean_field",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.XBOT_D2_digitalInput, "D2"],
                    [Lang.Blocks.XBOT_D3_digitalInput, "D3"],
                    [Lang.Blocks.XBOT_D11_digitalInput, "D11"]
                ],
                "value": "D2",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_HW
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "xbot_digitalInput"
        },
        "paramsKeyMap": {
            "DEVICE": 0
        },
        "class": "xbot_sensor",
        "isNotFor": [ "xbot_epor_edge" ],
        "func": function (sprite, script) {
            var pd = Entry.hw.portData;
            var dev = script.getField('DEVICE');
            return pd[dev];
        },
        "syntax": {"js": [], "py": ["Xbot.digital_input(%1)"]}
    },
    "xbot_analogValue": {
        "color": "#00979D",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.XBOT_CDS, "light"],
                    [Lang.Blocks.XBOT_MIC, "mic"],
                    [Lang.Blocks.XBOT_analog0, "adc0"],
                    [Lang.Blocks.XBOT_analog1, "adc1"],
                    [Lang.Blocks.XBOT_analog2, "adc2"],
                    [Lang.Blocks.XBOT_analog3, "adc3"],
                ],
                "value": "light",
                "fontSize": 11
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "xbot_analogValue"
        },
        "paramsKeyMap": {
            "DEVICE": 0
        },
        "class": "xbot_sensor",
        "isNotFor": [ "xbot_epor_edge" ],
        "func": function (sprite, script) {
            var pd = Entry.hw.portData;
            var dev = script.getField('DEVICE');
            return pd[dev];
        },
        "syntax": {"js": [], "py": ["Xbot.analog_value(%1)"]}
    },
    "xbot_digitalOutput": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ "LED", "D13" ],
                    [ "D4", "D4" ],
                    [ "D7", "D7" ],
                    [ "D12 ", "D12" ]
                ],
                "value": "D13",
                "fontSize": 11
            },
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.XBOT_High, "HIGH"],
                    [Lang.Blocks.XBOT_Low, "LOW"],
                ],
                "value": "HIGH",
                "fontSize": 11
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null, null ],
            "type": "xbot_digitalOutput"
        },
        "paramsKeyMap": {
            "DEVICE": 0,
            "VALUE": 1
        },
        "class": "xbot_sensor",
        "isNotFor": [ "xbot_epor_edge" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            var dev = script.getStringField("DEVICE", script);
            var value = script.getStringField('VALUE', script);

            if (dev == 'D13' && value == 'HIGH') {
                sq.D13 = 1;
            } else {
                sq.D13 = 0;
            }

            if (dev == 'D4' && value == 'HIGH') {
                sq.D4 = 1;
            } else {
                sq.D4 = 0;
            }

            if (dev == 'D7' && value == 'HIGH') {
                sq.D7 = 1;
            } else {
                sq.D7 = 0;
            }

            if (dev == 'D12' && value == 'HIGH') {
                sq.D12 = 1;
            } else {
                sq.D12 = 0;
            }
            //sq.D13 = 1;
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Xbot.digital_output(%1, %2)"]}
    },
    "xbot_analogOutput": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ "D5", "analogD5" ],
                    [ "D6", "analogD6" ]
                ],
                "value": "analogD5",
                "fontSize": 11
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                {
                    "type": "text",
                    "params": [ "255" ]
                },
                null
            ],
            "type": "xbot_analogOutput"
        },
        "paramsKeyMap": {
            "DEVICE": 0,
            "VALUE": 1
        },
        "class": "xbot_sensor",
        "isNotFor": [ "xbot_epor_edge" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            var dev = script.getStringField("DEVICE", script);
            var value = script.getNumberValue("VALUE", script);

            if (dev == 'analogD5') {
                sq.analogD5 = value;
            } else if(dev == 'analogD6') {
                sq.analogD6 = value;
            }
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Xbot.analog_output(%1, %2)"]}
    },
    "xbot_servo": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.XBOT_Head,"head"],
                    [Lang.Blocks.XBOT_ArmR, "right"],
                    [Lang.Blocks.XBOT_ArmL, "left"]
                ],
                "value": "head",
                "fontSize": 11
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                {
                    "type": "text",
                    "params": [ "90" ]
                },
                null
            ],
            "type": "xbot_servo"
        },
        "paramsKeyMap": {
            "DEVICE": 0,
            "VALUE": 1
        },
        "class": "xbot_motor",
        "isNotFor": [ "xbot_epor_edge" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            var mtype = script.getStringField("DEVICE", script);
            var angle = script.getNumberValue("VALUE", script);

            if(mtype == 'head') {
                sq.head = angle;
            } else if(mtype == 'right') {
                sq.armR = angle;
            } else if(mtype == 'left') {
                sq.armL = angle;
            }

            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Xbot.servo(%1, %2)"]}
    },
    "xbot_oneWheel": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.XBOT_rightWheel,"rightWheel"],
                    [Lang.Blocks.XBOT_leftWheel, "leftWheel"],
                    [Lang.Blocks.XBOT_bothWheel, "bothWheel"]
                ],
                "value": "rightWheel",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_HW
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                {
                    "type": "text",
                    "params": [ "0" ]
                },
                null
            ],
            "type": "xbot_oneWheel"
        },
        "paramsKeyMap": {
            "DEVICE": 0,
            "VALUE": 1
        },
        "class": "xbot_motor",
        "isNotFor": [ "xbot_epor_edge" ],
        "func": function (sprite, script) {
            //console.log('xbot_move_forward_for_secs');
            var sq = Entry.hw.sendQueue;
            var dir = script.getStringField("DEVICE", script);
            var speed =script.getNumberValue('VALUE', script);

            if (dir == 'rightWheel')
                sq.rightWheel = speed;
            else if (dir == 'leftWheel')
                sq.leftWheel = speed;
            else
                sq.rightWheel = sq.leftWheel = speed;

            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Xbot.one_wheel(%1, %2)"]}
    },
    "xbot_twoWheel": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "text",
                    "params": [ "0" ]
                },
                {
                    "type": "text",
                    "params": [ "0" ]
                },
                null
            ],
            "type": "xbot_twoWheel"
        },
        "paramsKeyMap": {
            "rightWheel": 0,
            "leftWheel": 1
        },
        "class": "xbot_motor",
        "isNotFor": [ "xbot_epor_edge" ],
        "func": function (sprite, script) {
            //console.log('xbot_move_forward_for_secs');
            var sq = Entry.hw.sendQueue;

            sq.rightWheel = script.getNumberValue('rightWheel');
            sq.leftWheel = script.getNumberValue('leftWheel');

            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Xbot.two_wheel(%1, %2)"]}
    },
    "xbot_rgb": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "text",
                    "params": [ "255" ]
                },
                {
                    "type": "text",
                    "params": [ "255" ]
                },
                {
                    "type": "text",
                    "params": [ "255" ]
                },
                null
            ],
            "type": "xbot_rgb"
        },
        "paramsKeyMap": {
            "ledR": 0,
            "ledG": 1,
            "ledB": 2
        },
        "class": "xbot_rgb",
        "isNotFor": [ "xbot_epor_edge" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;

            sq.ledR = script.getNumberValue('ledR');
            sq.ledG = script.getNumberValue('ledG');
            sq.ledB = script.getNumberValue('ledB');

            //console.log('ledR' + sq.ledR + ' ledG ' + sq.ledG +' ledB ' + sq.ledB);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Xbot.rgb(%1, %2, %3)"]}
    },
    "xbot_rgb_picker": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Color"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "xbot_rgb_picker"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "xbot_rgb",
        "isNotFor": [ "xbot_epor_edge" ],
        "func": function (sprite, script) {
            var port = script.getStringField("VALUE");
            var sq = Entry.hw.sendQueue;

            sq.ledR = parseInt(parseInt(port.substr(1,2), 16) * 0.3);
            sq.ledG =  parseInt(parseInt(port.substr(3,2), 16) * 0.3);
            sq.ledB = parseInt(parseInt(port.substr(5,2), 16) * 0.3);

            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Xbot.rgb_picker(%1)"]}
    },
    "xbot_buzzer": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.XBOT_c ,"C"],
                    [Lang.Blocks.XBOT_d ,"D"],
                    [Lang.Blocks.XBOT_e ,"E"],
                    [Lang.Blocks.XBOT_f ,"F"],
                    [Lang.Blocks.XBOT_g ,"G"],
                    [Lang.Blocks.XBOT_a ,"A"],
                    [Lang.Blocks.XBOT_b ,"B"]
                ],
                "value": "C",
                "fontSize": 11
            },
            {
                "type": "Dropdown",
                "options": [
                    [ "2", "2" ],
                    [ "3", "3" ],
                    [ "4", "4" ],
                    [ "5", "5" ],
                    [ "6", "6" ],
                    [ "7", "7" ]
                ],
                "value": "2",
                "fontSize": 11
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                "4",
                {
                    "type": "text",
                    "params": [ "0.5" ]
                },
                null
            ],
            "type": "xbot_buzzer"
        },
        "paramsKeyMap": {
            "NOTE": 0,
            "OCTAVE": 1,
            "VALUE": 2
        },
        "class": "xbot_sensor",
        "isNotFor": [ "xbot_epor_edge" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            var note = script.getStringField("NOTE", script);
            var octave = script.getStringField("OCTAVE", script);
            var duration = script.getNumberValue("VALUE", script);


            var noteOctave = note + octave; // 'C'+ 2 = "C2"
            //console.log('xbot_buzzer noteOctave' + note + ' ' + octave + ' ' + duration);

            if(noteOctave == "C2") sq.note = 65;
            else if(noteOctave == "D2") sq.note = 73;
            else if(noteOctave == "E2") sq.note = 82;
            else if(noteOctave == "F2") sq.note = 87;
            else if(noteOctave == "G2") sq.note = 98;
            else if(noteOctave == "A2") sq.note = 110;
            else if(noteOctave == "B2") sq.note = 123;
            else if(noteOctave == "C3") sq.note = 131;
            else if(noteOctave == "D3") sq.note = 147;
            else if(noteOctave == "E3") sq.note = 165;
            else if(noteOctave == "F3") sq.note = 175;
            else if(noteOctave == "G3") sq.note = 196;
            else if(noteOctave == "A3") sq.note = 220;
            else if(noteOctave == "B3") sq.note = 247;
            else if(noteOctave == "C4") sq.note = 262;
            else if(noteOctave == "D4") sq.note = 294;
            else if(noteOctave == "E4") sq.note = 330;
            else if(noteOctave == "F4") sq.note = 349;
            else if(noteOctave == "G4") sq.note = 392;
            else if(noteOctave == "A4") sq.note = 440;
            else if(noteOctave == "B4") sq.note = 494;
            else if(noteOctave == "C5") sq.note = 523;
            else if(noteOctave == "D5") sq.note = 587;
            else if(noteOctave == "E5") sq.note = 659;
            else if(noteOctave == "F5") sq.note = 698;
            else if(noteOctave == "G5") sq.note = 784;
            else if(noteOctave == "A5") sq.note = 880;
            else if(noteOctave == "B5") sq.note = 988;
            else if(noteOctave == "C6") sq.note = 1047;
            else if(noteOctave == "D6") sq.note = 1175;
            else if(noteOctave == "E6") sq.note = 1319;
            else if(noteOctave == "F6") sq.note = 1397;
            else if(noteOctave == "G6") sq.note = 1568;
            else if(noteOctave == "A6") sq.note = 1760;
            else if(noteOctave == "B6") sq.note = 1976;
            else if(noteOctave == "C7") sq.note = 2093;
            else if(noteOctave == "D7") sq.note = 2349;
            else if(noteOctave == "E7") sq.note = 2637;
            else if(noteOctave == "F7") sq.note = 2794;
            else if(noteOctave == "G7") sq.note = 3136;
            else if(noteOctave == "A7") sq.note = 3520;
            else if(noteOctave == "B7") sq.note = 3951;
            else sq.note = 262;

            //sq.duration = 200;

            duration *= 40; //  convert to mSec
            sq.duration =  duration;

            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Xbot.buzzer(%1, %2, %3)"]}
    },
    "xbot_lcd": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ "0", "0" ],
                    [ "1", "1" ]
                ],
                "value": "0",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_HW
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                {
                    "type": "text",
                    "params": [ "Hello" ]
                },
                null
            ],
            "type": "xbot_lcd"
        },
        "paramsKeyMap": {
            "LINE": 0,
            "VALUE": 1
        },
        "class": "xbot_sensor",
        "isNotFor": [ "xbot_epor_edge" ],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            var line = script.getNumberField("LINE", script);
            var str =  script.getStringValue("VALUE", script);

            if (line == 0) {
                sq.lcdNum = 0;
                sq.lcdTxt = str;
            } else if (line == 1)
            {
                sq.lcdNum = 1;
                sq.lcdTxt = str;
            }
            //console.log('ledR' + sq.ledR + ' ledG ' + sq.ledG +' ledB ' + sq.ledB);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Xbot.lcd(%1, %2)"]}
    },
    "run": {
        "skeleton": "basic",
        "color": "#3BBD70",
        "contents": [
            "this is",
            "basic block"
        ]
    },
    "mutant": {
        "skeleton": "basic",
        "event": "start",
        "color": "#3BBD70",
        "params": [],
        "changeEvent": {
            "_listeners": []
        }
    },
    "jr_start": {
        "skeleton": "pebble_event",
        "event": "start",
        "color": "#3BBD70",
        "params": [
            {
                "type": "Indicator",
                "img": "../../../img/assets/ntry/bitmap/jr/block_play_image.png",
                "highlightColor": "#3BBD70",
                "position": {
                    "x": 0,
                    "y": 0
                },
                "size": 22
            }
        ],
        func: function() {
            var entities =
                Ntry.entityManager.getEntitiesByComponent(Ntry.STATIC.UNIT);

            for (var key in entities) this._unit = entities[key];

            Ntry.unitComp =
                Ntry.entityManager.getComponent(this._unit.id, Ntry.STATIC.UNIT);
        }
    },
    "jr_repeat": {
        "skeleton": "pebble_loop",
        "color": "#127CDB",
        "params": [
            {
                "type": "Text",
                "text": ""
            },
            {
                "type": "Dropdown",
                "options": [
                    [ 1, 1 ],
                    [ 2, 2 ],
                    [ 3, 3 ],
                    [ 4, 4 ],
                    [ 5, 5 ],
                    [ 6, 6 ],
                    [ 7, 7 ],
                    [ 8, 8 ],
                    [ 9, 9 ],
                    [ 10, 10 ]
                ],
                "value": 3,
                "fontSize": 14,
                "roundValue": 3
            },
            {
                "type": "Text",
                "text": "반복"
            }
        ],
        statements: [
            { accept: "pebble_basic" }
        ],
        func: function() {
            if (this.repeatCount === undefined) {
                this.repeatCount = this.block.params[1];
                return Entry.STATIC.BREAK;
            } else if (this.repeatCount > 0) {
                this.repeatCount--;
                var statement = this.block.statements[0];
                if (statement.getBlocks().length === 0)
                    return;
                this.executor.stepInto(statement);
                return Entry.STATIC.BREAK;
            } else {
                delete this.repeatCount;
            }
        }
    },
    "jr_item": {
        "skeleton": "pebble_basic",
        "color": "#F46C6C",
        "params": [
            {
                "type": "Indicator",
                "img": "../../../img/assets/ntry/bitmap/jr/block_item_image.png",
                "highlightColor": "#FFF",
                "position": {
                    "x": 83,
                    "y": 0
                },
                "size": 22
            }
        ],
        func: function() {
            if (!this.isContinue) {
                this.isContinue = true;
                this.isAction = true;
                var self = this;
                var callBack = function() {
                    Ntry.dispatchEvent("getItem");
                    self.isAction = false;
                };
                Ntry.dispatchEvent("unitAction", Ntry.STATIC.GET_ITEM , callBack);
                return Entry.STATIC.BREAK;
            } else if (this.isAction) {
                return Entry.STATIC.BREAK;
            } else {
                delete this.isAction;
                delete this.isContinue;
            }
        }
    },
    "cparty_jr_item": {
        "skeleton": "pebble_basic",
        "color": "#8ABC1D",
        "params": [
            {
                "type": "Text",
                "text": "연필 줍기"
            },
            {
                "type": "Indicator",
                "img": "../../../img/assets/ntry/bitmap/cpartyjr/pen.png",
                "highlightColor": "#FFF",
                "position": {
                    "x": 83,
                    "y": 0
                },
                "size": 22
            }
        ],
        func: function() {
            if (!this.isContinue) {
                this.isContinue = true;
                this.isAction = true;
                var self = this;
                var callBack = function() {
                    Ntry.dispatchEvent("getItem");
                    self.isAction = false;
                };
                Ntry.dispatchEvent("unitAction", Ntry.STATIC.GET_ITEM , callBack);
                return Entry.STATIC.BREAK;
            } else if (this.isAction) {
                return Entry.STATIC.BREAK;
            } else {
                delete this.isAction;
                delete this.isContinue;

            }
        }
    },
    "jr_north": {
        "skeleton": "pebble_basic",
        "color": "#A751E3",
        "params": [
            {
                "type": "Text",
                "text": "  위쪽"
            },
            {
                "type": "Indicator",
                "img": "../../../img/assets/ntry/bitmap/jr/block_up_image.png",
                "position": {
                    "x": 83,
                    "y": 0
                },
                "size": 22
            }
        ],
        func: function() {
            if (!this.isContinue) {
                this.isContinue = true;
                this.isAction = true;
                var STATIC = Ntry.STATIC;
                var self = this;
                var callBack = function() {
                    window.setTimeout(
                        function() { Ntry.dispatchEvent("unitAction", Ntry.STATIC.WALK, function() {
                            self.isAction = false;
                            }
                        );}, 3);
                };
                var actionType;
                switch (Ntry.unitComp.direction) {
                    case Ntry.STATIC.EAST:
                        actionType = STATIC.TURN_LEFT;
                        break;
                    case Ntry.STATIC.SOUTH:
                        actionType = STATIC.HALF_ROTATION;
                        break;
                    case Ntry.STATIC.WEST:
                        actionType = STATIC.TURN_RIGHT;
                        break;
                    default:
                        callBack();
                        break;
                }
                if (actionType)
                    Ntry.dispatchEvent("unitAction", actionType, callBack);
                return Entry.STATIC.BREAK;
            } else if (this.isAction) {
                return Entry.STATIC.BREAK;
            } else {
                delete this.isAction;
                delete this.isContinue;
            }
        }
    },
    "jr_east": {
        "skeleton": "pebble_basic",
        "color": "#A751E3",
        "params": [
            {
                "type": "Text",
                "text": "오른쪽"
            },
            {
                "type": "Indicator",
                "img": "../../../img/assets/ntry/bitmap/jr/block_right_image.png",
                "position": {
                    "x": 83,
                    "y": 0
                },
                "size": 22
            }
        ],
        func: function() {
            var STATIC = Ntry.STATIC;

             if (!this.isContinue) {
                this.isContinue = true;
                this.isAction = true;
                var self = this;
                var callBack = function() {
                    window.setTimeout(
                        function() {
                            Ntry.dispatchEvent(
                                "unitAction",
                                STATIC.WALK,
                                function() { self.isAction = false; } );},
                        3);
                };

                // turn direction
                var actionType;
                switch (Ntry.unitComp.direction) {
                    case STATIC.SOUTH:
                        actionType = STATIC.TURN_LEFT;
                        break;
                    case STATIC.WEST:
                        actionType = STATIC.HALF_ROTATION;
                        break;
                    case STATIC.NORTH:
                        actionType = STATIC.TURN_RIGHT;
                        break;
                    default:
                        callBack();
                        break;
                }
                if (actionType)
                    Ntry.dispatchEvent("unitAction", actionType, callBack);
                return Entry.STATIC.BREAK;
            } else if (this.isAction) {
                return Entry.STATIC.BREAK;
            } else {
                delete this.isAction;
                delete this.isContinue;
            }
        }
    },
    "jr_south": {
        "skeleton": "pebble_basic",
        "color": "#A751E3",
        "params": [
            {
                "type": "Text",
                "text": "  아래쪽"
            },
            {
                "type": "Indicator",
                "img": "../../../img/assets/ntry/bitmap/jr/block_down_image.png",
                "position": {
                    "x": 83,
                    "y": 0
                },
                "size": 22
            }
        ],
        func: function() {
             if (!this.isContinue) {

                this.isContinue = true;
                this.isAction = true;
                var STATIC = Ntry.STATIC;
                var self = this;
                var callBack = function() {
                    window.setTimeout(
                        function() {
                            Ntry.dispatchEvent(
                                "unitAction",
                                Ntry.STATIC.WALK,
                                function() { self.isAction = false; } );},
                    3);
                };

                // turn direction
                var actionType;
                switch (Ntry.unitComp.direction) {
                    case STATIC.EAST:
                        actionType = STATIC.TURN_RIGHT;
                        break;
                    case STATIC.NORTH:
                        actionType = STATIC.HALF_ROTATION;
                        break;
                    case STATIC.WEST:
                        actionType = STATIC.TURN_LEFT;
                        break;
                    default:
                        callBack();
                        break;
                }
                if (actionType)
                    Ntry.dispatchEvent("unitAction", actionType, callBack);
                return Entry.STATIC.BREAK;
            } else if (this.isAction) {
                return Entry.STATIC.BREAK;
            } else {
                delete this.isAction;
                delete this.isContinue;
            }
        }
    },
    "jr_west": {
        "skeleton": "pebble_basic",
        "color": "#A751E3",
        "params": [
            {
                "type": "Text",
                "text": "  왼쪽"
            },
            {
                "type": "Indicator",
                "img": "../../../img/assets/ntry/bitmap/jr/block_left_image.png",
                "position": {
                    "x": 83,
                    "y": 0
                },
                "size": 22
            }
        ],
        func: function() {
            if (!this.isContinue) {
                this.isContinue = true;
                this.isAction = true;
                var STATIC = Ntry.STATIC;
                var self = this;
                var callBack = function() {
                    window.setTimeout(
                        function() { Ntry.dispatchEvent(
                            "unitAction",
                            STATIC.WALK,
                            function() { self.isAction = false; } );},
                    3);
                };

                // turn direction
                var actionType;
                switch (Ntry.unitComp.direction) {
                    case STATIC.SOUTH:
                        actionType = STATIC.TURN_RIGHT;
                        break;
                    case STATIC.EAST:
                        actionType = STATIC.HALF_ROTATION;
                        break;
                    case STATIC.NORTH:
                        actionType = STATIC.TURN_LEFT;
                        break;
                    default:
                        callBack();
                        break;
                }
                if (actionType)
                    Ntry.dispatchEvent("unitAction", actionType, callBack);
                return Entry.STATIC.BREAK;
            } else if (this.isAction) {
                return Entry.STATIC.BREAK;
            } else {
                delete this.isAction;
                delete this.isContinue;
            }
        }
    },
    "jr_start_basic": {
        "skeleton": "basic_event",
        "event": "start",
        "color": "#3BBD70",
        "params": [
            {
                "type": "Indicator",
                "boxMultiplier": 2,
                "img": "../../../img/assets/block_icon/start_icon_play.png",
                "highlightColor": "#3BBD70",
                "size": 17,
                "position": {
                    "x": 0,
                    "y": -2
                }
            },
            {
                text: "시작하기를 클릭했을때",
                type: "Text"
            }
        ],
        func: function() {
            var entities = Ntry.entityManager.getEntitiesByComponent(
            Ntry.STATIC.UNIT);

            for (var key in entities)
                this._unit = entities[key];

            Ntry.unitComp = Ntry.entityManager.getComponent(
            this._unit.id, Ntry.STATIC.UNIT);
        }
    },
    "jr_go_straight": {
        "skeleton": "basic",
        "color": "#A751E3",
        "params": [
            {
                text: "앞으로 가기",
                type: "Text"
            },
            {
                "type": "Image",
                "img": "../../../img/assets/ntry/bitmap/jr/cparty_go_straight.png",
                "size": 24
            }
        ],
        func: function() {
            if (!this.isContinue) {

                this.isContinue = true;
                this.isAction = true;
                var self = this;
                var callBack = function() {
                    self.isAction = false;
                };
                // turn direction
                Ntry.dispatchEvent("unitAction", Ntry.STATIC.WALK, callBack);

                return Entry.STATIC.BREAK;
            } else if (this.isAction) {
                return Entry.STATIC.BREAK;
            } else {
                delete this.isAction;
                delete this.isContinue;
            }
        },
        "syntax": [
            "Scope",
            "move"
        ]
    },
    "jr_turn_left": {
        "skeleton": "basic",
        "color": "#A751E3",
        "params": [
            {
                text: "왼쪽으로 돌기",
                type: "Text"
            },
            {
                "type": "Image",
                "img": "../../../img/assets/ntry/bitmap/jr/cparty_rotate_l.png",
                "size": 24
            }
        ],
        func: function() {
            if (!this.isContinue) {

                this.isContinue = true;
                this.isAction = true;
                var self = this;
                var callBack = function() {
                    self.isAction = false;
                };

                // turn direction
                Ntry.dispatchEvent("unitAction", Ntry.STATIC.TURN_LEFT, callBack);

                return Entry.STATIC.BREAK;
            } else if (this.isAction) {
                return Entry.STATIC.BREAK;
            } else {
                delete this.isAction;
                delete this.isContinue;
            }
        },
        "syntax": [
            "Scope",
            "left"
        ]
    },
    "jr_turn_right": {
        "skeleton": "basic",
        "color": "#A751E3",
        "params": [
            {
                text: "오른쪽으로 돌기",
                type: "Text"
            },
            {
                "type": "Image",
                "img": "../../../img/assets/ntry/bitmap/jr/cparty_rotate_r.png",
                "size": 24
            }
        ],
        func: function() {
            if (!this.isContinue) {

                this.isContinue = true;
                this.isAction = true;
                var self = this;
                var callBack = function() {
                    self.isAction = false;
                };

                // turn direction
                Ntry.dispatchEvent("unitAction", Ntry.STATIC.TURN_RIGHT, callBack);

                return Entry.STATIC.BREAK;
            } else if (this.isAction) {
                return Entry.STATIC.BREAK
            } else {
                delete this.isAction;
                delete this.isContinue;
            }
        },
        "syntax": [
            "Scope",
            "right"
        ]
    },
    "jr_go_slow": {
        "skeleton": "basic",
        "color": "#f46c6c",
        "params": [
            {
                text: "천천히 가기",
                type: "Text"
            },
            {
                "type": "Image",
                "img": "../../../img/assets/ntry/bitmap/jr/cparty_go_slow.png",
                "size": 24
            }
        ],
        func: function() {
            if (!this.isContinue) {

                this.isContinue = true;
                this.isAction = true;
                var self = this;
                var callBack = function() {
                    self.isAction = false;
                };

                // turn direction
                Ntry.dispatchEvent("unitAction", Ntry.STATIC.GO_SLOW, callBack);

                return Entry.STATIC.BREAK;
            } else if (this.isAction) {
                return Entry.STATIC.BREAK;
            } else {
                delete this.isAction;
                delete this.isContinue;
            }
        },
        "syntax": [
            "Scope",
            "move_slowly"
        ]
    },
    "jr_repeat_until_dest": {
        "skeleton": "basic_loop",
        "color": "#498DEB",
        "syntax": [
            "BasicWhile",
            "true"
        ],
        "params": [
            {
                "type": "Image",
                "img": "../../../img/assets/ntry/bitmap/jr/jr_goal_image.png",
                "size": 18
            },
            {
                text: "만날 때 까지 반복하기",
                type: "Text"
            },
            {
                "type": "Image",
                "img": "/img/assets/week/blocks/for.png",
                "size": 24
            }
        ],
        "statements": [
            {
                "accept": "basic"
            }
        ],
        func: function() {
            var statement = this.block.statements[0];
            if (statement.getBlocks().length === 0)
                return;

            this.executor.stepInto(statement);
            return Entry.STATIC.BREAK;
        }
    },
    "jr_if_construction": {
        "skeleton": "basic_loop",
        "color": "#498DEB",
        "syntax": [
            "BasicIf",
            "front == 'wall'"
        ],
        "params": [
            {
                text: "만약",
                type: "Text"
            },
            {
                "type": "Image",
                "img": "../../../img/assets/ntry/bitmap/jr/jr_construction_image.png",
                "size": 18
            },
            {
                text: "앞에 있다면",
                type: "Text"
            },
            {
                "type": "Image",
                "img": "/img/assets/week/blocks/for.png",
                "size": 24
            }
        ],
        "statements": [
            {
                "accept": "basic"
            }
        ],
        func: function() {
            if (this.isContinue)
                return;
            var entities = Ntry.entityManager.getEntitiesByComponent(
            Ntry.STATIC.UNIT);

            var entity;
            for (var key in entities)
                entity = entities[key];

            var unitComp = Ntry.entityManager.getComponent(
                entity.id, Ntry.STATIC.UNIT);
            var gridComp = Ntry.entityManager.getComponent(
                entity.id, Ntry.STATIC.GRID);

            var grid = {x: gridComp.x, y: gridComp.y};
            Ntry.addVectorByDirection(grid, unitComp.direction, 1);

            var fitEntities = Ntry.entityManager.find(
                {
                    type: Ntry.STATIC.GRID,
                    x: grid.x,
                    y: grid.y
                },
                {
                    type: Ntry.STATIC.TILE,
                    tileType: Ntry.STATIC.OBSTACLE_REPAIR
                }
            );

            this.isContinue = true;

            var statement = this.block.statements[0];
            if (fitEntities.length === 0) return;
            else if (statement.getBlocks().length === 0) return;
            else {
                this.executor.stepInto(statement);
                return Entry.STATIC.BREAK;
            }
        }
    },
    "jr_if_speed": {
        "skeleton": "basic_loop",
        "color": "#498DEB",
        "syntax": [
            "BasicIf",
            "front == 'hump'"
        ],
        "params": [
            {
                "type": "Image",
                "img": "../../../img/assets/ntry/bitmap/jr/jr_speed_image.png",
                "size": 18
            },
            {
                "type": "Image",
                "img": "/img/assets/week/blocks/for.png",
                "size": 24
            }
        ],
        "statements": [
            {
                "accept": "basic"
            }
        ],
        func: function()  {
            if (this.isContinue)
                return;
            var entities = Ntry.entityManager.getEntitiesByComponent(
            Ntry.STATIC.UNIT);

            var entity;
            for (var key in entities)
                entity = entities[key];

            var unitComp = Ntry.entityManager.getComponent(
                entity.id, Ntry.STATIC.UNIT);
            var gridComp = Ntry.entityManager.getComponent(
                entity.id, Ntry.STATIC.GRID);

            var grid = {x: gridComp.x, y: gridComp.y};
            Ntry.addVectorByDirection(grid, unitComp.direction, 1);

            var fitEntities = Ntry.entityManager.find(
                {
                    type: Ntry.STATIC.GRID,
                    x: grid.x,
                    y: grid.y
                },
                {
                    type: Ntry.STATIC.TILE,
                    tileType: Ntry.STATIC.OBSTACLE_SLOW
                }
            );

            this.isContinue = true;

            var statement = this.block.statements[0];
            if (fitEntities.length === 0) return;
            else if(statement.getBlocks().length === 0) return;
            else {
                this.executor.stepInto(statement);
                return Entry.STATIC.BREAK;
            }
        }
    },
    "maze_step_start": {
        "skeleton": "basic_event",
        "mode": "maze",
        "event": "start",
        "color": "#3BBD70",
        "syntax": [
            "Program"
        ],
        "params": [
            {
                "type": "Indicator",
                "boxMultiplier": 2,
                "img": "../../../img/assets/block_icon/start_icon_play.png",
                "highlightColor": "#3BBD70",
                "size": 17,
                "position": {
                    "x": 0,
                    "y": -2
                }
            }
        ],
        "func": function () {
            var entities = Ntry.entityManager.getEntitiesByComponent(
            Ntry.STATIC.UNIT);

            for (var key in entities)
                this._unit = entities[key];

            Ntry.unitComp = Ntry.entityManager.getComponent(
            this._unit.id, Ntry.STATIC.UNIT);
        }
    },
    "maze_step_jump": {
        "skeleton": "basic",
        "mode": "maze",
        "color": "#FF6E4B",
        "params": [
            {
                "type": "Image",
                "img": "/img/assets/week/blocks/jump.png",
                "size": 24
            }
        ],
        "syntax": [ "Scope", "jump" ],
        func: function() {
            if (!this.isContinue) {
                this.isContinue = true;
                this.isAction = true;
                var self = this;
                var callBack = function() {
                    self.isAction = false;
                };

                Ntry.dispatchEvent("unitAction", Ntry.STATIC.JUMP, callBack);

                return Entry.STATIC.BREAK;
            } else if (this.isAction) {
                return Entry.STATIC.BREAK;
            } else {
                delete this.isAction;
                delete this.isContinue;
            }
        }
    },
    "maze_step_jump2": {
        "parent": "maze_step_jump",
        "template": Lang.template.maze_step_jump,
        func: function() {
            if (!this.isContinue) {
                this.isContinue = true;
                this.isAction = true;
                var self = this;
                var callBack = function() {
                    self.isAction = false;
                };

                var entities = Ntry.entityManager.getEntitiesByComponent(Ntry.STATIC.UNIT);
                var unitId;
                $.each(entities, function (id, entity) {
                    unitId = id;
                    components = entity.components;
                });

                var unitComp = Ntry.entityManager.getComponent(unitId, Ntry.STATIC.UNIT);
                var unitGrid = $.extend({}, Ntry.entityManager.getComponent(unitId, Ntry.STATIC.GRID));
                var checkGrid = {
                    x: unitGrid.x,
                    y: unitGrid.y,
                }
                var isCollisionPossible = Ntry.checkCollisionTile(unitGrid, unitComp.direction, [Ntry.STATIC.OBSTACLE_IRON], 2);
                if(isCollisionPossible) {
                    Ntry.dispatchEvent("unitAction", Ntry.STATIC.FAIL_JUMP, callBack);
                    Ntry.dispatchEvent("complete", false, Ntry.STATIC.CONTACT_IRON);
                    return;
                }

                Ntry.dispatchEvent("unitAction", Ntry.STATIC.JUMP, callBack);
                return Entry.STATIC.BREAK;
            } else if (this.isAction) {
                return Entry.STATIC.BREAK;
            } else {
                delete this.isAction;
                delete this.isContinue;
            }
        }
    },
    "maze_step_for": {
        "skeleton": "basic_loop",
        "mode": "maze",
        "color": "#498DEB",
        "syntax": [
            "BasicIteration"
        ],
        "params": [
            {
                "type": "Dropdown",
                "key": "REPEAT",
                "options": [
                    [ 1, 1 ],
                    [ 2, 2 ],
                    [ 3, 3 ],
                    [ 4, 4 ],
                    [ 5, 5 ],
                    [ 6, 6 ],
                    [ 7, 7 ],
                    [ 8, 8 ],
                    [ 9, 9 ],
                    [ 10, 10 ]
                ],
                "value": 1
            },
            {
                "type": "Image",
                "img": "/img/assets/week/blocks/for.png",
                "size": 24
            }
        ],
        "statements": [
            {
                "accept": "basic"
            }
        ],
        func: function() {
            if (this.repeatCount === undefined) {
                this.repeatCount = this.block.params[0];
                return Entry.STATIC.BREAK;
            } else if (this.repeatCount > 0) {
                this.repeatCount--;
                var statement = this.block.statements[0];
                if (statement.getBlocks().length === 0)
                    return;
                this.executor.stepInto(statement);
                return Entry.STATIC.BREAK;
            } else {
                delete this.repeatCount;
            }
        }
    },
    "test": {
        "skeleton": "basic_boolean_field",
        "mode": "maze",
        "color": "#127CDB",
        "params": [
            {
                "type": "Angle",
                "value": "90"
            },
            {
                "type": "Dropdown",
                "options": [
                    [ 1, 1 ],
                    [ 2, 2 ],
                    [ 3, 3 ],
                    [ 4, 4 ],
                    [ 5, 5 ],
                    [ 6, 6 ],
                    [ 7, 7 ],
                    [ 8, 8 ],
                    [ 9, 9 ],
                    [ 10, 10 ]
                ],
                "value": 1
            }
        ]
    },
    "maze_repeat_until_1": {
        "skeleton": "basic_loop",
        "mode": "maze",
        "color": "#498DEB",
        "syntax": [
            "BasicWhile",
            "true"
        ],
        "params": [
            {
                "type": "Image",
                "img": "/img/assets/ntry/block_inner/repeat_goal_1.png",
                "size": 18
            },
            {
                "type": "Image",
                "img": "/img/assets/week/blocks/for.png",
                "size": 24
            }
        ],
        "statements": [
            {
                "accept": "basic"
            }
        ],
        func: function() {
            var statement = this.block.statements[0];
            if (statement.getBlocks().length === 0)
                return;

            this.executor.stepInto(statement);
            return Entry.STATIC.BREAK;
        }
    },
    "maze_repeat_until_2": {
        "skeleton": "basic_loop",
        "mode": "maze",
        "color": "#498DEB",
        "syntax": [
            "BasicWhile",
            "true"
        ],
        "params": [
            {
                "type": "Image",
                "img": "/img/assets/ntry/block_inner/repeat_goal_1.png",
                "size": 18
            },
            {
                "type": "Image",
                "img": "/img/assets/week/blocks/for.png",
                "size": 24
            }
        ],
        "statements": [
            {
                "accept": "basic"
            }
        ],
        func: function() {
            var statement = this.block.statements[0];
            if (statement.getBlocks().length === 0)
                return;

            this.executor.stepInto(statement);
            return Entry.STATIC.BREAK;
        }
    },
    "maze_step_if_1": {
        "skeleton": "basic_loop",
        "mode": "maze",
        "color": "#498DEB",
        "syntax": [
            "BasicIf",
            "front == 'wall'"
        ],
        "params": [
            {
                "type": "Image",
                "img": "/img/assets/ntry/block_inner/if_target_1.png",
                "size": 18
            },
            {
                "type": "Image",
                "img": "/img/assets/week/blocks/if.png",
                "size": 24
            }
        ],
        "statements": [
            {
                "accept": "basic"
            }
        ],
        func: function() {
            if (this.isContinue)
                return;
            var entities =
                Ntry.entityManager.getEntitiesByComponent(Ntry.STATIC.UNIT);

            var entity;
            for (var key in entities)
                entity = entities[key];

            var unitComp = Ntry.entityManager.getComponent(
                entity.id, Ntry.STATIC.UNIT);
            var gridComp = Ntry.entityManager.getComponent(
                entity.id, Ntry.STATIC.GRID);

            var grid = {x: gridComp.x, y: gridComp.y};
            Ntry.addVectorByDirection(grid, unitComp.direction, 1);

            var existEntities = Ntry.entityManager.find(
            {
                type: Ntry.STATIC.GRID,
                x: grid.x,
                y: grid.y
            });

            var statement = this.block.statements[0];

            if (existEntities.length === 0) {
                this.executor.stepInto(statement);
                return Entry.STATIC.BREAK;
            }

            var fitEntities = Ntry.entityManager.find(
                {
                    type: Ntry.STATIC.GRID,
                    x: grid.x,
                    y: grid.y
                },
                {
                    type: Ntry.STATIC.TILE,
                    tileType: Ntry.STATIC.WALL
                }
            );

            this.isContinue = true;

            if (fitEntities.length === 0) {
                return;
            } else if (statement.getBlocks().length === 0)
                return;
            else {
                this.executor.stepInto(statement);
                return Entry.STATIC.BREAK;
            }
        }
    },
    "maze_step_if_2": {
        "skeleton": "basic_loop",
        "mode": "maze",
        "color": "#498DEB",
        "syntax": [
            "BasicIf",
            "front == 'bee'"
        ],
        "params": [
            {
                "type": "Image",
                "img": "../../../img/assets/ntry/bitmap/maze2/obstacle_01.png",
                "size": 18
            },
            {
                "type": "Image",
                "img": "/img/assets/week/blocks/if.png",
                "size": 24
            }
        ],
        "statements": [
            {
                "accept": "basic"
            }
        ],
        func: function() {
            if (this.isContinue) return;

            var entities =
                Ntry.entityManager.getEntitiesByComponent(Ntry.STATIC.UNIT);

            var entity;
            for (var key in entities)
                entity = entities[key];

            var unitComp = Ntry.entityManager.getComponent(
                entity.id, Ntry.STATIC.UNIT);
            var gridComp = Ntry.entityManager.getComponent(
                entity.id, Ntry.STATIC.GRID);

            var grid = {x: gridComp.x, y: gridComp.y};
            Ntry.addVectorByDirection(grid, unitComp.direction, 1);

            var fitEntities = Ntry.entityManager.find(
                {
                    type: Ntry.STATIC.GRID,
                    x: grid.x,
                    y: grid.y
                },
                {
                    type: Ntry.STATIC.TILE,
                    tileType: Ntry.STATIC.OBSTACLE_BEE
                }
            );

            this.isContinue = true;

            var statement = this.block.statements[0];
            if (fitEntities.length === 0) {
                return;
            } else if (statement.getBlocks().length === 0)
                return;
            else {
                this.executor.stepInto(statement);
                return Entry.STATIC.BREAK;
            }
        }
    },
    "maze_call_function": {
        "skeleton": "basic",
        "mode": "maze",
        "color": "#B57242",
        "syntax": [
            "Scope",
            "promise"
        ],
        "params": [
            {
                "type": "Image",
                "img": "/img/assets/week/blocks/function.png",
                "size": 24
            }
        ],
        func: function() {
            if (!this.funcExecutor) {
                var codes =
                    Ntry.entityManager.getEntitiesByComponent(Ntry.STATIC.CODE);

                for (var key in codes) {
                    var code = codes[key].components[Ntry.STATIC.CODE].code;
                    this.funcExecutor = new Entry.Executor(
                        code.getEventMap("define")[0]
                    );
                }
            }

            this.funcExecutor.execute();
            if (this.funcExecutor.scope.block === null)
                return;
            else
                return Entry.STATIC.BREAK;
        }
    },
    "maze_define_function": {
        "skeleton": "basic_define",
        "mode": "maze",
        "color": "#B57242",
        "event": "define",
        "syntax": [
            "BasicFunction"
        ],
        "params": [
            {
                "type": "Image",
                "img": "/img/assets/week/blocks/function.png",
                "size": 24
            }
        ],
        "statements": [
            {
                "accept": "basic"
            }
        ],
        func: function(executor) {
            if (this.executed)
                return;
            var statement = this.block.statements[0];
            if (statement.getBlocks().length === 0)
                return;
            this.executor.stepInto(statement);
            this.executed = true;
            return Entry.STATIC.BREAK;
        }
    },
    "maze_step_if_3": {
        "skeleton": "basic_loop",
        "mode": "maze",
        "color": "#498DEB",
        "syntax": [
            "BasicIf",
            "front == banana"
        ],
        "params": [
            {
                "type": "Image",
                "img": "/img/assets/ntry/block_inner/if_target_3.png",
                "size": 18
            },
            {
                "type": "Image",
                "img": "/img/assets/week/blocks/if.png",
                "size": 24
            }
        ],
        "statements": [
            {
                "accept": "basic"
            }
        ],
        func: function() {
            if (this.isContinue) return;

            var entities =
                Ntry.entityManager.getEntitiesByComponent(Ntry.STATIC.UNIT);

            var entity;
            for (var key in entities)
                entity = entities[key];

            var unitComp = Ntry.entityManager.getComponent(
                entity.id, Ntry.STATIC.UNIT);
            var gridComp = Ntry.entityManager.getComponent(
                entity.id, Ntry.STATIC.GRID);

            var grid = {x: gridComp.x, y: gridComp.y};
            Ntry.addVectorByDirection(grid, unitComp.direction, 1);

            var fitEntities = Ntry.entityManager.find(
                {
                    type: Ntry.STATIC.GRID,
                    x: grid.x,
                    y: grid.y
                },
                {
                    type: Ntry.STATIC.TILE,
                    tileType: Ntry.STATIC.OBSTACLE_BANANA
                }
            );

            this.isContinue = true;

            var statement = this.block.statements[0];
            if (fitEntities.length === 0) {
                return;
            } else if (statement.getBlocks().length === 0)
                return;
            else {
                this.executor.stepInto(statement);
                return Entry.STATIC.BREAK;
            }
        }
    },
    "maze_step_if_4": {
        "skeleton": "basic_loop",
        "mode": "maze",
        "color": "#498DEB",
        "syntax": [
            "BasicIf",
            "front == wall"
        ],
        "params": [
            {
                "type": "Image",
                "img": "/img/assets/ntry/block_inner/if_target_2.png",
                "size": 18
            },
            {
                "type": "Image",
                "img": "/img/assets/week/blocks/if.png",
                "size": 24
            }
        ],
        "statements": [
            {
                "accept": "basic"
            }
        ],
        func: function() {
            if (this.isContinue) return;

            var entities =
                Ntry.entityManager.getEntitiesByComponent(Ntry.STATIC.UNIT);

            var entity;
            for (var key in entities)
                entity = entities[key];

            var unitComp = Ntry.entityManager.getComponent(
                entity.id, Ntry.STATIC.UNIT);
            var gridComp = Ntry.entityManager.getComponent(
                entity.id, Ntry.STATIC.GRID);

            var grid = {x: gridComp.x, y: gridComp.y};
            Ntry.addVectorByDirection(grid, unitComp.direction, 1);

            var fitEntities = Ntry.entityManager.find(
                {
                    type: Ntry.STATIC.GRID,
                    x: grid.x,
                    y: grid.y
                },
                {
                    type: Ntry.STATIC.TILE,
                    tileType: Ntry.STATIC.WALL
                }
            );

            this.isContinue = true;

            var statement = this.block.statements[0];
            if (fitEntities.length === 0) {
                return;
            } else if (statement.getBlocks().length === 0)
                return;
            else {
                this.executor.stepInto(statement);
                return Entry.STATIC.BREAK;
            }
        }
    },
    "maze_step_move_step": {
        "skeleton": "basic",
        "mode": "maze",
        "color": "#A751E3",
        "syntax": [
            "Scope",
            "move"
        ],
        "params": [
            {
                "type": "Image",
                "img": "/img/assets/week/blocks/moveStep.png",
                "size": 24
            }
        ],
        func: function() {
            if (!this.isContinue) {
                this.isContinue = true;
                this.isAction = true;
                var self = this;
                var callBack = function() {
                    self.isAction = false;
                };
                // turn direction
                Ntry.dispatchEvent("unitAction", Ntry.STATIC.WALK, callBack);

                return Entry.STATIC.BREAK;
            } else if (this.isAction) {
                return Entry.STATIC.BREAK;
            } else {
                delete this.isAction;
                delete this.isContinue;
            }
        }
    },
    "maze_step_rotate_left": {
        "skeleton": "basic",
        "mode": "maze",
        "color": "#A751E3",
        "syntax": [
            "Scope",
            "left"
        ],
        "params": [
            {
                "type": "Image",
                "img": "/img/assets/week/blocks/turnL.png",
                "size": 24
            }
        ],
        func: function() {
            if (!this.isContinue) {

                this.isContinue = true;
                this.isAction = true;
                var self = this;
                var callBack = function() {
                    self.isAction = false;
                };

                // turn direction
                Ntry.dispatchEvent("unitAction", Ntry.STATIC.TURN_LEFT, callBack);

                return Entry.STATIC.BREAK;
            } else if (this.isAction) {
                return Entry.STATIC.BREAK;
            } else {
                delete this.isAction;
                delete this.isContinue;
            }
        }
    },
    "maze_step_rotate_right": {
        "skeleton": "basic",
        "mode": "maze",
        "color": "#A751E3",
        "syntax": [
            "Scope",
            "right"
        ],
        "params": [
            {
                "type": "Image",
                "img": "/img/assets/week/blocks/turnR.png",
                "size": 24
            }
        ],
        func: function() {
            if (!this.isContinue) {

                this.isContinue = true;
                this.isAction = true;
                var self = this;
                var callBack = function() {
                    self.isAction = false;
                };

                // turn direction
                Ntry.dispatchEvent("unitAction", Ntry.STATIC.TURN_RIGHT, callBack);

                return Entry.STATIC.BREAK;
            } else if (this.isAction) {
                return Entry.STATIC.BREAK;
            } else {
                delete this.isAction;
                delete this.isContinue;
            }
        }
    },
    "maze_step_forward": {
        "skeleton": "basic",
        "mode": "maze",
        "color": "#A751E3",
        "syntax": [
            "Scope",
            "move"
        ],
        "params": [
            {
                "type": "Image",
                "img": "/img/assets/week/blocks/moveStep.png",
                "size": 24
            }
        ],
        func: function() {
            if (!this.isContinue) {
                this.isContinue = true;
                this.isAction = true;
                var self = this;
                var callBack = function() {
                    self.isAction = false;
                };
                // turn direction
                Ntry.dispatchEvent("unitAction", Ntry.STATIC.WALK, callBack);

                return Entry.STATIC.BREAK;
            } else if (this.isAction) {
                return Entry.STATIC.BREAK;
            } else {
                delete this.isAction;
                delete this.isContinue;
            }
        }
    },
    "maze_rotate_left": {
        "skeleton": "basic",
        "mode": "maze",
        "color": "#A751E3",
        "syntax": [
            "Scope",
            "left"
        ],
        "params": [
            {
                "type": "Image",
                "img": "/img/assets/week/blocks/turnL.png",
                "size": 24
            }
        ],
        func: function() {
            if (!this.isContinue) {

                this.isContinue = true;
                this.isAction = true;
                var self = this;
                var callBack = function() {
                    self.isAction = false;
                };

                // turn direction
                Ntry.dispatchEvent("unitAction", Ntry.STATIC.TURN_LEFT, callBack);

                return Entry.STATIC.BREAK;
            } else if (this.isAction) {
                return Entry.STATIC.BREAK;
            } else {
                delete this.isAction;
                delete this.isContinue;
            }
        }
    },
    "maze_rotate_right": {
        "skeleton": "basic",
        "mode": "maze",
        "color": "#A751E3",
        "syntax": [
            "Scope",
            "right"
        ],
        "params": [
            {
                "type": "Image",
                "img": "/img/assets/week/blocks/turnR.png",
                "size": 24
            }
        ],
        func: function() {
            if (!this.isContinue) {

                this.isContinue = true;
                this.isAction = true;
                var self = this;
                var callBack = function() {
                    self.isAction = false;
                };

                // turn direction
                Ntry.dispatchEvent("unitAction", Ntry.STATIC.TURN_RIGHT, callBack);

                return Entry.STATIC.BREAK;
            } else if (this.isAction) {
                return Entry.STATIC.BREAK;
            } else {
                delete this.isAction;
                delete this.isContinue;
            }
        }
    },
    "maze_moon_kick": {
        "skeleton": "basic",
        "mode": "maze",
        "color": "#2EB0E8",
        "syntax": [
            "Scope",
            "right"
        ],
        "params": [
            {
                "type": "Image",
                "img": "/img/assets/maze/sprite/moon_icon.png",
                "size": 24
            }
        ],
        func: function() {
            // TODO: func 내용은 변경해야 함.

            if (!this.isContinue) {
                var entities = Ntry.entityManager.getEntitiesByComponent(Ntry.STATIC.UNIT);
                var unitId;
                $.each(entities, function (id, entity) {
                    unitId = id;
                    components = entity.components;
                });
                var unitComp = Ntry.entityManager.getComponent(unitId, Ntry.STATIC.UNIT);
                var unitGrid = $.extend({}, Ntry.entityManager.getComponent(unitId, Ntry.STATIC.GRID));
                var isCollisionPossible = Ntry.checkCollisionTile(unitGrid, unitComp.direction, [Ntry.STATIC.OBSTACLE_BRICK], 1);

                if(!isCollisionPossible) {
                    Ntry.dispatchEvent("playSound", Ntry.STATIC.NOT_FOUND_DESTORY_OBJECT);
                    Ntry.dispatchEvent("complete", false, Ntry.STATIC.NOT_FOUND_DESTORY_OBJECT);
                    return;
                }
                this.isContinue = true;
                this.isAction = true;
                var self = this;
                var callback = function() {
                    Ntry.dispatchEvent('destroyObstacle', 1, function (state) {
                        switch(state) {
                            case Ntry.STATIC.OBSTACLE_DESTROY_SUCCESS:
                                self.isAction = false;
                                break;
                        }
                    });
                };

                // turn direction
                Ntry.dispatchEvent("unitAction", Ntry.STATIC.ATTACK, callback);

                return Entry.STATIC.BREAK;
            } else if (this.isAction) {
                return Entry.STATIC.BREAK;
            } else {
                delete this.isAction;
                delete this.isContinue;
            }
        }
    },
    "maze_cony_flower_throw": {
        "skeleton": "basic",
        "mode": "maze",
        "color": "#D8617D",
        "syntax": [
            "Scope",
            "right"
        ],
        "params": [
            {
                "type": "Image",
                "img": "/img/assets/maze/sprite/cony_icon.png",
                "size": 24
            }
        ],
        func: function() {
            var self = this;
            if (!this.isContinue) {
                this.isContinue = true;
                this.isAction = true;

                var entities = Ntry.entityManager.getEntitiesByComponent(Ntry.STATIC.UNIT);
                var unitId;
                $.each(entities, function (id, entity) {
                    unitId = id;
                    components = entity.components;
                });

                var unitComp = Ntry.entityManager.getComponent(unitId, Ntry.STATIC.UNIT);
                var unitGrid = $.extend({}, Ntry.entityManager.getComponent(unitId, Ntry.STATIC.GRID));
                var isCollisionPossible = Ntry.checkCollisionTile(unitGrid, unitComp.direction, [Ntry.STATIC.OBSTACLE_SPIDER]);
                var particleZIndex = 550;
                if(unitComp.direction === Ntry.STATIC.NORTH) {
                    particleZIndex = 450;
                }
                if(!isCollisionPossible) {
                    Ntry.dispatchEvent("playSound", Ntry.STATIC.NOT_FOUND_DESTORY_OBJECT);
                    Ntry.dispatchEvent("complete", false, Ntry.STATIC.NOT_FOUND_DESTORY_OBJECT);
                    return;
                }

                var particle = Ntry.entityManager.addEntity();
                Ntry.dispatchEvent("unitAction", Ntry.STATIC.ATTACK, function () {
                    $.each(components, function(type, component) {
                        if(+type === Ntry.STATIC.SPRITE) {
                            var cloneComponent = $.extend({}, component);
                            cloneComponent.zIndex = particleZIndex;
                            Ntry.entityManager.addComponent(particle.id, cloneComponent);
                        } else if(+type != Ntry.STATIC.UNIT) {
                            Ntry.entityManager.addComponent(particle.id, component);
                        } else {
                            Ntry.entityManager.addComponent(particle.id, {
                                type: Ntry.STATIC.PARTICLE,
                                direction: component.direction,
                                collisionList: [ Ntry.STATIC.OBSTACLE_SPIDER ],
                            });
                        }
                    });
                    Ntry.dispatchEvent("particleAction", {
                        entityId: particle.id,
                        actionType: Ntry.STATIC.FLOWER_ATTACK,
                        callback: function () {
                            Ntry.entityManager.removeEntity(particle.id);
                            self.isAction = false;
                        }
                    });
                });
                return Entry.STATIC.BREAK;
            } else if (this.isAction) {
                return Entry.STATIC.BREAK;
            } else {
                delete this.isAction;
                delete this.isContinue;
            }
        }
    },
    "maze_cony_flower_throw2": {
        "skeleton": "basic",
        "mode": "maze",
        "color": "#D8617D",
        "template": Lang.template.maze_cony_flower_throw,
        "syntax": [
            "Scope",
            "right"
        ],
        "params": [
            {
                "type": "Image",
                "img": "/img/assets/maze/sprite/cony_icon.png",
                "size": 24
            }
        ],
        func: function() {
            var self = this;
            if (!this.isContinue) {

                var entities = Ntry.entityManager.getEntitiesByComponent(Ntry.STATIC.UNIT);

                var unitId;
                $.each(entities, function (id, entity) {
                    unitId = id;
                    components = entity.components;
                });

                var unitComp = Ntry.entityManager.getComponent(unitId, Ntry.STATIC.UNIT);
                var unitGrid = $.extend({}, Ntry.entityManager.getComponent(unitId, Ntry.STATIC.GRID));
                var isCollisionPossible = Ntry.checkCollisionTile(unitGrid, unitComp.direction, [Ntry.STATIC.OBSTACLE_ENERMY5, Ntry.STATIC.OBSTACLE_ENERMY4], 2, true);
                var particleZIndex = 550;
                if(unitComp.direction === Ntry.STATIC.NORTH) {
                    particleZIndex = 450;
                }
                if(!isCollisionPossible) {
                    Ntry.dispatchEvent("playSound", Ntry.STATIC.NOT_FOUND_DESTORY_OBJECT);
                    Ntry.dispatchEvent("complete", false, Ntry.STATIC.NOT_FOUND_DESTORY_OBJECT);
                    return;
                }

                this.isContinue = true;
                this.isAction = true;

                var particle = Ntry.entityManager.addEntity();

                Ntry.dispatchEvent("unitAction", Ntry.STATIC.ATTACK, function () {
                    $.each(components, function(type, component) {
                        if(+type === Ntry.STATIC.SPRITE) {
                            var cloneComponent = $.extend({}, component);
                            cloneComponent.zIndex = particleZIndex;
                            Ntry.entityManager.addComponent(particle.id, cloneComponent);
                        } else if(+type != Ntry.STATIC.UNIT) {
                            Ntry.entityManager.addComponent(particle.id, component);
                        } else {
                            Ntry.entityManager.addComponent(particle.id, {
                                type: Ntry.STATIC.PARTICLE,
                                direction: component.direction,
                                collisionList: [Ntry.STATIC.OBSTACLE_ENERMY5, , Ntry.STATIC.OBSTACLE_ENERMY4],
                                penetrationList: [Ntry.STATIC.WALL],
                            });
                        }
                    });

                    Ntry.dispatchEvent("particleAction", {
                        entityId: particle.id,
                        actionType: Ntry.STATIC.HEART_ATTACK,
                        callback: function () {
                            Ntry.entityManager.removeEntity(particle.id);
                            self.isAction = false;
                        }
                    });
                });
                return Entry.STATIC.BREAK;
            } else if (this.isAction) {
                return Entry.STATIC.BREAK;
            } else {
                delete this.isAction;
                delete this.isContinue;
            }
        }
    },
    "maze_james_heart": {
        "skeleton": "basic",
        "mode": "maze",
        "color": "#D39D18",
        "syntax": [
            "Scope",
            "right"
        ],
        "params": [
            {
                "type": "Image",
                "img": "/img/assets/maze/sprite/james_icon.png",
                "size": 24
            }
        ],
        func: function() {
            var self = this;
            if (!this.isContinue) {

                var entities = Ntry.entityManager.getEntitiesByComponent(Ntry.STATIC.UNIT);

                var unitId;
                $.each(entities, function (id, entity) {
                    unitId = id;
                    components = entity.components;
                });

                var unitComp = Ntry.entityManager.getComponent(unitId, Ntry.STATIC.UNIT);
                var unitGrid = $.extend({}, Ntry.entityManager.getComponent(unitId, Ntry.STATIC.GRID));
                var isCollisionPossible = Ntry.checkCollisionTile(unitGrid, unitComp.direction, [Ntry.STATIC.OBSTACLE_ENERMY1, Ntry.STATIC.OBSTACLE_ENERMY2, Ntry.STATIC.OBSTACLE_ENERMY3, Ntry.STATIC.OBSTACLE_ENERMY5]);
                var particleZIndex = 550;
                if(unitComp.direction === Ntry.STATIC.NORTH) {
                    particleZIndex = 450;
                }
                if(!isCollisionPossible) {
                    Ntry.dispatchEvent("playSound", Ntry.STATIC.NOT_FOUND_DESTORY_OBJECT);
                    Ntry.dispatchEvent("complete", false, Ntry.STATIC.NOT_FOUND_DESTORY_OBJECT);
                    return;
                }

                this.isContinue = true;
                this.isAction = true;

                var particle = Ntry.entityManager.addEntity();

                Ntry.dispatchEvent("unitAction", Ntry.STATIC.ATTACK, function () {
                    $.each(components, function(type, component) {
                        if(+type === Ntry.STATIC.SPRITE) {
                            var cloneComponent = $.extend({}, component);
                            cloneComponent.zIndex = particleZIndex;
                            Ntry.entityManager.addComponent(particle.id, cloneComponent);
                        } else if(+type != Ntry.STATIC.UNIT) {
                            Ntry.entityManager.addComponent(particle.id, component);
                        } else {
                            Ntry.entityManager.addComponent(particle.id, {
                                type: Ntry.STATIC.PARTICLE,
                                direction: component.direction,
                                collisionList: [ Ntry.STATIC.OBSTACLE_ENERMY1, Ntry.STATIC.OBSTACLE_ENERMY2, Ntry.STATIC.OBSTACLE_ENERMY3, Ntry.STATIC.OBSTACLE_ENERMY5 ],
                            });
                        }
                    });

                    Ntry.dispatchEvent("particleAction", {
                        entityId: particle.id,
                        actionType: Ntry.STATIC.HEART_ATTACK,
                        callback: function () {
                            Ntry.entityManager.removeEntity(particle.id);
                            self.isAction = false;
                        }
                    });
                });
                return Entry.STATIC.BREAK;
            } else if (this.isAction) {
                return Entry.STATIC.BREAK;
            } else {
                delete this.isAction;
                delete this.isContinue;
            }
        }
    },
    "maze_james_heart2": {
        "skeleton": "basic",
        "mode": "maze",
        "color": "#D39D18",
        "template": Lang.template.maze_james_heart,
        "syntax": [
            "Scope",
            "right"
        ],
        "params": [
            {
                "type": "Image",
                "img": "/img/assets/maze/sprite/james_icon.png",
                "size": 24
            }
        ],
        func: function() {
            var self = this;
            if (!this.isContinue) {

                var entities = Ntry.entityManager.getEntitiesByComponent(Ntry.STATIC.UNIT);

                var unitId;
                $.each(entities, function (id, entity) {
                    unitId = id;
                    components = entity.components;
                });

                var unitComp = Ntry.entityManager.getComponent(unitId, Ntry.STATIC.UNIT);
                var unitGrid = $.extend({}, Ntry.entityManager.getComponent(unitId, Ntry.STATIC.GRID));
                var isCollisionPossible = Ntry.checkCollisionTile(unitGrid, unitComp.direction, [Ntry.STATIC.OBSTACLE_ENERMY3, Ntry.STATIC.OBSTACLE_ENERMY4], 2);
                var particleZIndex = 550;
                if(unitComp.direction === Ntry.STATIC.NORTH) {
                    particleZIndex = 450;
                }
                if(!isCollisionPossible) {
                    Ntry.dispatchEvent("playSound", Ntry.STATIC.NOT_FOUND_DESTORY_OBJECT);
                    Ntry.dispatchEvent("complete", false, Ntry.STATIC.NOT_FOUND_DESTORY_OBJECT);
                    return;
                }

                this.isContinue = true;
                this.isAction = true;

                var particle = Ntry.entityManager.addEntity();

                Ntry.dispatchEvent("unitAction", Ntry.STATIC.ATTACK, function () {
                    $.each(components, function(type, component) {
                        if(+type === Ntry.STATIC.SPRITE) {
                            var cloneComponent = $.extend({}, component);
                            cloneComponent.zIndex = particleZIndex;
                            Ntry.entityManager.addComponent(particle.id, cloneComponent);
                        } else if(+type != Ntry.STATIC.UNIT) {
                            Ntry.entityManager.addComponent(particle.id, component);
                        } else {
                            Ntry.entityManager.addComponent(particle.id, {
                                type: Ntry.STATIC.PARTICLE,
                                direction: component.direction,
                                collisionList: [Ntry.STATIC.OBSTACLE_ENERMY3, Ntry.STATIC.OBSTACLE_ENERMY4, Ntry.STATIC.OBSTACLE_ENERMY_AREA],
                                penetrationList: [Ntry.STATIC.OBSTACLE_ENERMY_AREA],
                            });
                        }
                    });

                    Ntry.dispatchEvent("particleAction", {
                        entityId: particle.id,
                        actionType: Ntry.STATIC.HEART_ATTACK,
                        callback: function () {
                            Ntry.entityManager.removeEntity(particle.id);
                            self.isAction = false;
                        }
                    });
                });
                return Entry.STATIC.BREAK;
            } else if (this.isAction) {
                return Entry.STATIC.BREAK;
            } else {
                delete this.isAction;
                delete this.isContinue;
            }
        }
    },
    "maze_iron_switch": {
        "skeleton": "basic",
        "mode": "maze",
        "color": "#748d69",
        "syntax": [
            "Scope",
            "right"
        ],
        "params": [
            {
                "type": "Image",
                "img": "/img/assets/maze/sprite/iron_icon.png",
                "size": 24
            }
        ],
        func: function() {
            if (!this.isContinue) {
                this.isContinue = true;
                this.isAction = true;
                var eventCount = 0;
                var self = this;
                var gridSize = Ntry.configManager.getConfig("gridSize");
                var tileSize = Ntry.configManager.getConfig("tileSize").width;
                var entities = Ntry.entityManager.getEntitiesByComponent(Ntry.STATIC.OBSTACLE);

                for(var id in entities) {
                    var obstacleComp = Ntry.entityManager.getComponent(id, Ntry.STATIC.OBSTACLE);
                    if(obstacleComp.tileType === Ntry.STATIC.OBSTACLE_IRON) {
                        var obstacleGrid = Ntry.entityManager.getComponent(id, Ntry.STATIC.GRID);
                        var obstaclePosition = Ntry.entityManager.getComponent(id, Ntry.STATIC.POSITION);
                        var grid = {
                            x: obstacleGrid.x,
                            y: (obstacleGrid.y === 1) ? 3 : 1,
                        }

                        obstacleGrid.y = (obstacleGrid.y === 1) ? 3 : 1;

                        var deltaY = tileSize * 2;

                        if(obstacleGrid.y === 1) {
                            deltaY = -deltaY;
                        }

                        var deltaPos = {
                            x: 0,
                            y: deltaY * 0.5,
                        };

                        var deltaPos2 = {
                            x: 0,
                            y: deltaY,
                        };

                        var targetPos = {
                            minY: 0,
                            maxY: gridSize.height * tileSize,
                        };

                        if(deltaY > 0) {
                            targetPos.maxY = obstacleGrid.y * tileSize + (tileSize / 2);
                        } else {
                            targetPos.minY = obstacleGrid.y * tileSize + (tileSize / 2);
                        }

                        (function (_id, _deltaPos, _deltaPos2, _targetPos, obstacleGrid) {
                            var comp = Ntry.entityManager.getComponent(_id, Ntry.STATIC.ANIMATE);
                            if(comp) {
                                if(eventCount === 0) {
                                    self.isAction = false;
                                }
                                Ntry.entityManager.addComponent(
                                    _id, {
                                        type: Ntry.STATIC.ANIMATE,
                                        animateType: Ntry.STATIC.TRANSITION,
                                        duration: 20,
                                        option: {
                                            deltaPos: _deltaPos2,
                                            targetPos: _targetPos,
                                        },
                                        afterAnimate: function() {
                                            var unitGrid = Ntry.getUtilGrid();

                                            if(obstacleGrid.x == unitGrid.x && obstacleGrid.y == unitGrid.y) {
                                                Ntry.dispatchEvent("unitAction", Ntry.STATIC.CONTACT_IRON2);
                                            }
                                        }
                                    }
                                );
                            } else {
                                Ntry.entityManager.addComponent(
                                    _id, {
                                        type: Ntry.STATIC.ANIMATE,
                                        animateType: Ntry.STATIC.TRANSITION,
                                        duration: 10,
                                        option: {
                                            deltaPos: _deltaPos,
                                        },
                                        afterAnimate: function() {
                                            if(eventCount === 0) {
                                                self.isAction = false;
                                            }
                                            Ntry.entityManager.addComponent(
                                                _id, {
                                                    type: Ntry.STATIC.ANIMATE,
                                                    animateType: Ntry.STATIC.TRANSITION,
                                                    duration: 10,
                                                    option: {
                                                        deltaPos: _deltaPos,
                                                        targetPos: _targetPos,
                                                    },
                                                    afterAnimate: function() {
                                                        var unitGrid = Ntry.getUtilGrid();

                                                        if(obstacleGrid.x == unitGrid.x && obstacleGrid.y == unitGrid.y) {
                                                            console.log('충돌');
                                                            // Ntry.dispatchEvent("playSound", Ntry.STATIC.NOT_FOUND_DESTORY_OBJECT);
                                                            Ntry.dispatchEvent("unitAction", Ntry.STATIC.CONTACT_IRON2);
                                                            // Ntry.dispatchEvent("complete", false, Ntry.STATIC.CONTACT_IRON2);
                                                        }
                                                    },
                                                }
                                            );
                                        },
                                    }
                                );
                            }
                        })(id, deltaPos, deltaPos2, targetPos, obstacleGrid);
                    }
                }
                return Entry.STATIC.BREAK;
            } else if (this.isAction) {
                return Entry.STATIC.BREAK;
            } else {
                delete this.isAction;
                delete this.isContinue;
            }
        }
    },
    "maze_brown_punch": {
        "skeleton": "basic",
        "mode": "maze",
        "color": "#6C483A",
        "syntax": [
            "Scope",
            "right"
        ],
        "params": [
            {
                "type": "Image",
                "img": "/img/assets/maze/sprite/brown_icon.png",
                "size": 24
            }
        ],
        func: function() {
            if (!this.isContinue) {
                var self = this;
                var entities = Ntry.entityManager.getEntitiesByComponent(Ntry.STATIC.UNIT);
                var unitId;
                $.each(entities, function (id, entity) {
                    unitId = id;
                    components = entity.components;
                });
                var unitComp = Ntry.entityManager.getComponent(unitId, Ntry.STATIC.UNIT);
                var unitGrid = $.extend({}, Ntry.entityManager.getComponent(unitId, Ntry.STATIC.GRID));
                var isCollisionPossible = Ntry.checkCollisionTile(unitGrid, unitComp.direction, [Ntry.STATIC.OBSTACLE_ICE], 1);

                if(!isCollisionPossible) {
                    Ntry.dispatchEvent("playSound", Ntry.STATIC.NOT_FOUND_DESTORY_OBJECT);
                    Ntry.dispatchEvent("complete", false, Ntry.STATIC.NOT_FOUND_DESTORY_OBJECT);
                    return;
                }
                this.isContinue = true;
                this.isAction = true;

                var callback = function() {
                    Ntry.dispatchEvent('destroyObstacle', 1, function (state) {
                        switch(state) {
                            case Ntry.STATIC.OBSTACLE_DESTROY_SUCCESS:
                                self.isAction = false;
                                break;
                        }
                    });
                };

                // turn direction
                Ntry.dispatchEvent("unitAction", Ntry.STATIC.ATTACK, callback);

                return Entry.STATIC.BREAK;
            } else if (this.isAction) {
                return Entry.STATIC.BREAK;
            } else {
                delete this.isAction;
                delete this.isContinue;
            }
        }
    },
    "maze_repeat_until_3": {
        "skeleton": "basic_loop",
        "mode": "maze",
        "color": "#498DEB",
        "syntax": [
            "BasicWhile",
            "true"
        ],
        "params": [
            {
                "type": "Image",
                "img": "/img/assets/maze/bitmap/ws/tile_goal_01.png",
                "size": 18
            },
            {
                "type": "Image",
                "img": "/img/assets/week/blocks/for.png",
                "size": 24
            }
        ],
        "statements": [
            {
                "accept": "basic"
            }
        ],
        func: function() {
            var isGoal = false;
            var statement = this.block.statements[0];
            if (statement.getBlocks().length === 0) {
                return;
            }

            var entities = Ntry.entityManager.getEntitiesByComponent(Ntry.STATIC.UNIT);
            var entity;
            for (var key in entities){
                entity = entities[key];
            }

            var unitComp = Ntry.entityManager.getComponent(entity.id, Ntry.STATIC.UNIT);

            if(unitComp.isStartedUnit) {
                var unitGrid = Ntry.entityManager.getComponent(entity.id, Ntry.STATIC.GRID);
                var entities = Ntry.entityManager.getEntitiesByGrid(unitGrid.x, unitGrid.y);

                for(var idx in entities) {
                    var entity = entities[idx];
                    var tile = Ntry.entityManager.getComponent(entity.id, Ntry.STATIC.TILE);
                    var item = Ntry.entityManager.getComponent(entity.id, Ntry.STATIC.ITEM);

                    if(tile && item && tile.tileType === Ntry.STATIC.GOAL && item.itemType === Ntry.STATIC.GOAL_ITEM) {
                        isGoal = true;
                        break;
                    }
                }
            }

            if(!isGoal) {
                this.executor.stepInto(statement);
                return Entry.STATIC.BREAK;
            }
            // Ntry.dispatchEvent('executeEnd');
        }
    },
    "maze_repeat_until_4": {
        "parent": "maze_repeat_until_3",
        "params": [
            {
                "type": "Image",
                "img": "/img/assets/maze/bitmap/ws/tile_goal_02.png",
                "size": 18
            },
            {
                "type": "Image",
                "img": "/img/assets/week/blocks/for.png",
                "size": 24
            }
        ],
    },
    "maze_repeat_until_5": {
        "parent": "maze_repeat_until_3",
        "params": [
            {
                "type": "Image",
                "img": "/img/assets/maze/bitmap/ws/tile_goal_03.png",
                "size": 18
            },
            {
                "type": "Image",
                "img": "/img/assets/week/blocks/for.png",
                "size": 24
            }
        ],
    },
    "maze_repeat_until_6": {
        "parent": "maze_repeat_until_3",
        "params": [
            {
                "type": "Image",
                "img": "/img/assets/maze/bitmap/ws/blcok-1.png",
                "size": 18
            },
            {
                "type": "Image",
                "img": "/img/assets/week/blocks/for.png",
                "size": 24
            }
        ],
    },
    "maze_repeat_until_7": {
        "parent": "maze_repeat_until_3",
        "params": [
            {
                "type": "Image",
                "img": "/img/assets/maze/bitmap/ws/blcok-4.png",
                "size": 18
            },
            {
                "type": "Image",
                "img": "/img/assets/week/blocks/for.png",
                "size": 24
            }
        ],
    },
    "maze_repeat_until_8": {
        "template": Lang.template.maze_repeat_until_7,
        "parent": "maze_repeat_until_3",
        "params": [
            {
                "type": "Image",
                "img": "/img/assets/maze/bitmap/ws/blcok-5.png",
                "size": 18
            },
            {
                "type": "Image",
                "img": "/img/assets/week/blocks/for.png",
                "size": 24
            }
        ],
    },
    "maze_repeat_until_9": {
        "template": Lang.template.maze_repeat_until_7,
        "parent": "maze_repeat_until_3",
        "params": [
            {
                "type": "Image",
                "img": "/img/assets/maze/bitmap/ws/blcok-6.png",
                "size": 18
            },
            {
                "type": "Image",
                "img": "/img/assets/week/blocks/for.png",
                "size": 24
            }
        ],
    },
    "maze_repeat_until_10": {
        "template": Lang.template.maze_repeat_until_7,
        "parent": "maze_repeat_until_3",
        "params": [
            {
                "type": "Image",
                "img": "/img/assets/maze/bitmap/ws/blcok-7.png",
                "size": 18
            },
            {
                "type": "Image",
                "img": "/img/assets/week/blocks/for.png",
                "size": 24
            }
        ],
    },
    "maze_repeat_until_11": {
        "template": Lang.template.maze_repeat_until_7,
        "parent": "maze_repeat_until_3",
        "params": [
            {
                "type": "Image",
                "img": "/img/assets/maze/bitmap/ws/blcok-9.png",
                "size": 18
            },
            {
                "type": "Image",
                "img": "/img/assets/week/blocks/for.png",
                "size": 24
            }
        ],
    },
    "maze_repeat_until_12": {
        "template": Lang.template.maze_repeat_until_7,
        "parent": "maze_repeat_until_3",
        "params": [
            {
                "type": "Image",
                "img": "/img/assets/maze/bitmap/ws/blcok-10.png",
                "size": 18
            },
            {
                "type": "Image",
                "img": "/img/assets/week/blocks/for.png",
                "size": 24
            }
        ],
    },
    "maze_repeat_until_13": {
        "template": Lang.template.maze_repeat_until_7,
        "parent": "maze_repeat_until_3",
        "params": [
            {
                "type": "Image",
                "img": "/img/assets/maze/bitmap/ws/blcok-11.png",
                "size": 18
            },
            {
                "type": "Image",
                "img": "/img/assets/week/blocks/for.png",
                "size": 24
            }
        ],
    },
    "maze_repeat_until_14": {
        "template": Lang.template.maze_repeat_until_7,
        "parent": "maze_repeat_until_3",
        "params": [
            {
                "type": "Image",
                "img": "/img/assets/maze/bitmap/ws/blcok-12.png",
                "size": 18
            },
            {
                "type": "Image",
                "img": "/img/assets/week/blocks/for.png",
                "size": 24
            }
        ],
    },
    "maze_repeat_until_15": {
        "template": Lang.template.maze_repeat_until_7,
        "parent": "maze_repeat_until_3",
        "params": [
            {
                "type": "Image",
                "img": "/img/assets/maze/bitmap/ws/tile_goal_04.png",
                "size": 18
            },
            {
                "type": "Image",
                "img": "/img/assets/week/blocks/for.png",
                "size": 24
            }
        ],
    },
    "maze_radar_check": {
        "skeleton": "basic_boolean_field",
        "mode": "maze",
        "color": "#AEB8FF",
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Menus.maze_distance1, "1"],
                    [Lang.Menus.maze_distance2, "2"],
                ],
                "value": "1",
                "fontSize": 11
            }, {
                "type": "Dropdown",
                "options": [
                    [Lang.Menus.maze_object_trap, "TRAP"],
                    [Lang.Menus.maze_object_monster, "MONSTER"],
                    [Lang.Menus.maze_object_obstacle1, "OBSTACLE"],
                ],
                "value": "TRAP",
                "fontSize": 11
            }
        ],
        "paramsKeyMap": {
            "DISTANCE": 0,
            "TYPE": 1,
        },
        func: function(sprite, script) {
            var distance = script.getNumberField("DISTANCE", script);
            var type = script.getField("TYPE", script);

            var entityId = Ntry.getRadarEntityIdByDistance(distance);
            var tileType;
            if(entityId) {
                var tileComp = Ntry.entityManager.getComponent(entityId, Ntry.STATIC.TILE);
                switch(tileComp.tileType) {
                    case Ntry.STATIC.OBSTACLE_HOLE:
                        tileType = 'TRAP';
                        break;
                    case Ntry.STATIC.OBSTACLE_ENERMY1:
                    case Ntry.STATIC.OBSTACLE_ENERMY2:
                    case Ntry.STATIC.OBSTACLE_ENERMY3:
                    case Ntry.STATIC.OBSTACLE_ENERMY4:
                    case Ntry.STATIC.OBSTACLE_ENERMY5:
                        tileType = 'MONSTER';
                        break;
                    case Ntry.STATIC.OBSTACLE_IRON:
                        tileType = 'OBSTACLE';
                        break;
                }
            } else {
                tileType = 'TRAP';
            }

            if(type === tileType) {
                return true;
            } else {
                return false;
            }
        }
    },
    // TODO: 해당 부분 수정 필요
    "maze_step_if_5": {
        "skeleton": "basic_loop",
        "mode": "maze",
        "color": "#498DEB",
        "syntax": [
            "BasicIf",
            "front == bee"
        ],
        "params": [
            {
                "type": "Image",
                "img": "../../../img/assets/ntry/bitmap/maze2/obstacle_01.png",
                "size": 18
            },
            {
                "type": "Image",
                "img": "/img/assets/week/blocks/if.png",
                "size": 24
            }
        ],
        "statements": [
            {
                "accept": "basic"
            }
        ],
        func: function() {
            if (this.isContinue) return;

            var entities =
                Ntry.entityManager.getEntitiesByComponent(Ntry.STATIC.UNIT);

            var entity;
            for (var key in entities)
                entity = entities[key];

            var unitComp = Ntry.entityManager.getComponent(
                entity.id, Ntry.STATIC.UNIT);
            var gridComp = Ntry.entityManager.getComponent(
                entity.id, Ntry.STATIC.GRID);

            var grid = {x: gridComp.x, y: gridComp.y};
            Ntry.addVectorByDirection(grid, unitComp.direction, 1);

            var fitEntities = Ntry.entityManager.find(
                {
                    type: Ntry.STATIC.GRID,
                    x: grid.x,
                    y: grid.y
                },
                {
                    type: Ntry.STATIC.TILE,
                    tileType: Ntry.STATIC.OBSTACLE_BEE
                }
            );

            this.isContinue = true;

            var statement = this.block.statements[0];
            if (fitEntities.length === 0) {
                return;
            } else if (statement.getBlocks().length === 0)
                return;
            else {
                this.executor.stepInto(statement);
                return Entry.STATIC.BREAK;
            }
        }
    },
    // TODO: 해당 부분 수정 필요
    "maze_step_if_6": {
        "skeleton": "basic_loop",
        "mode": "maze",
        "color": "#498DEB",
        "syntax": [
            "BasicIf",
            "front == bee"
        ],
        "params": [
            {
                "type": "Image",
                "img": "../../../img/assets/maze/bitmap/stage4/road_4_01.png",
                "size": 18
            },
            {
                "type": "Image",
                "img": "/img/assets/week/blocks/if.png",
                "size": 24
            }
        ],
        "statements": [
            {
                "accept": "basic"
            }
        ],
        func: function() {
            if (this.isContinue) return;

            var entities = Ntry.entityManager.getEntitiesByComponent(Ntry.STATIC.UNIT);

            var entity;
            for (var key in entities)
                entity = entities[key];

            var unitComp = Ntry.entityManager.getComponent(
                entity.id, Ntry.STATIC.UNIT);
            var gridComp = Ntry.entityManager.getComponent(
                entity.id, Ntry.STATIC.GRID);

            var grid = {x: gridComp.x, y: gridComp.y};
            Ntry.addVectorByDirection(grid, unitComp.direction, 1);

            var fitEntities = Ntry.entityManager.find(
                {
                    type: Ntry.STATIC.GRID,
                    x: grid.x,
                    y: grid.y
                },
                {
                    type: Ntry.STATIC.TILE,
                    tileType: Ntry.STATIC.ROAD
                }
            );

            this.isContinue = true;

            var statement = this.block.statements[0];
            if (fitEntities.length > 0) {
                return;
            } else if (statement.getBlocks().length === 0){
                return;
            } else {
                this.executor.stepInto(statement);
                return Entry.STATIC.BREAK;
            }
        }
    },
    // TODO: 해당 부분 수정 필요
    "maze_step_if_7": {
        "skeleton": "basic_loop",
        "mode": "maze",
        "color": "#498DEB",
        "syntax": [
            "BasicIf",
            "front == ice"
        ],
        "params": [
            {
                "type": "Image",
                "img": "../../../img/assets/maze/bitmap/stage4/obj_ice_01.png",
                "size": 18
            },
            {
                "type": "Image",
                "img": "/img/assets/week/blocks/if.png",
                "size": 24
            }
        ],
        "statements": [
            {
                "accept": "basic"
            }
        ],
        func: function() {
            if (this.isContinue) return;

            var entities =
                Ntry.entityManager.getEntitiesByComponent(Ntry.STATIC.UNIT);

            var entity;
            for (var key in entities)
                entity = entities[key];

            var unitComp = Ntry.entityManager.getComponent(
                entity.id, Ntry.STATIC.UNIT);
            var gridComp = Ntry.entityManager.getComponent(
                entity.id, Ntry.STATIC.GRID);

            var grid = {x: gridComp.x, y: gridComp.y};
            Ntry.addVectorByDirection(grid, unitComp.direction, 1);

            var fitEntities = Ntry.entityManager.find(
                {
                    type: Ntry.STATIC.GRID,
                    x: grid.x,
                    y: grid.y
                },
                {
                    type: Ntry.STATIC.TILE,
                    tileType: Ntry.STATIC.OBSTACLE_ICE
                }
            );

            this.isContinue = true;

            var statement = this.block.statements[0];
            if (fitEntities.length === 0) {
                return;
            } else if (statement.getBlocks().length === 0)
                return;
            else {
                this.executor.stepInto(statement);
                return Entry.STATIC.BREAK;
            }
        }
    },
    "maze_step_if_8": {
        "parent": "_if",
        "class": "",
    },
    "maze_step_if_else": {
        "parent": "if_else",
        "class": "",
    },
    "test_wrapper": {
        "skeleton": "basic",
        "mode": "maze",
        "color": "#3BBD70",
        "params": [
            {
                "type": "Block",
                "accept": "basic_boolean_field",
                "value": [
                    {
                        "type": "test",
                        "params": [
                            30,
                            50
                        ]
                    }
                ]
            },
            {
                "type": "Dropdown",
                "options": [
                    [ 1, 1 ],
                    [ 2, 2 ],
                    [ 3, 3 ],
                    [ 4, 4 ],
                    [ 5, 5 ],
                    [ 6, 6 ],
                    [ 7, 7 ],
                    [ 8, 8 ],
                    [ 9, 9 ],
                    [ 10, 10 ]
                ],
                "value": 1
            }
        ]
    },
    "basic_button": {
        "skeleton": "basic_button",
        "color": "#eee",
        "params": [
            {
                "type": "Text",
                "text": "basic button",
                "color": "#333",
                "align": "center"
            }
        ]
    },
    "dplay_get_number_sensor_value": {
        "parent": "arduino_get_number_sensor_value",
        "isNotFor": [
            "dplay"
        ],
        "def": {
            "params": [
                {
                    "type": "arduino_get_sensor_number"
                }
            ],
            "type": "dplay_get_number_sensor_value"
        },
        "class": "dplay_get",
        "syntax": {"js": [], "py": ["Dplay.sensor_value(%1)"]}
    },
    "dplay_get_dust_sensor_value": {
        "parent": "arduino_get_number_sensor_value",
        "template": "아날로그 %1 번  먼지 센서값",
        "isNotFor": [
            "dplay"
        ],
        "def": {
            "params": [
                {
                    "type": "arduino_get_sensor_number"
                }
            ],
            "type": "dplay_get_dust_sensor_value"
        },
        "class": "dplay_get",
        "syntax": {"js": [], "py": ["Dplay.dust_sensor_value(%1)"]}
    },
    "dplay_get_CO2_sensor_value": {
        "parent": "arduino_get_number_sensor_value",
        "template": "아날로그 %1 번  이산화탄소 센서값",
        "isNotFor": [
            "dplay"
        ],
        "def": {
            "params": [
                {
                    "type": "arduino_get_sensor_number"
                }
            ],
            "type": "dplay_get_CO2_sensor_value"
        },
        "class": "dplay_get",
        "syntax": {"js": [], "py": ["Dplay.co2_sensor_value(%1)"]}
    },
    "dplay_get_gas_sensor_value": {
        "parent": "arduino_get_number_sensor_value",
        "template": "아날로그 %1 번 가스 센서값",
        "isNotFor": [
            "dplay"
        ],
        "def": {
            "params": [
                {
                    "type": "arduino_get_sensor_number"
                }
            ],
            "type": "dplay_get_gas_sensor_value",
            "id": "hh5b"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "dplay_get",
        "isNotFor": ["dplay"],
        "func": function (sprite, script) {
            var signal = script.getValue("VALUE", script);
            return Entry.hw.getAnalogPortValue(signal[1]);
        },
        "syntax": {"js": [], "py": ["Dplay.gas_sensor_value(%1)"]}

    },
    "dplay_convert_scale": {
        "parent": "arduino_convert_scale",
        "isNotFor": [
            "dplay"
        ],
        "def": {
            "params": [
                {
                    "type": "arduino_get_number_sensor_value",
                    "params": [
                        {
                            "type": "arduino_get_sensor_number",
                            "id": "bl5e"
                        }
                    ]
                },
                {
                    "type": "number",
                    "params": [ "0" ]
                },
                {
                    "type": "number",
                    "params": [ "1023" ]
                },
                {
                    "type": "number",
                    "params": [ "0" ]
                },
                {
                    "type": "number",
                    "params": [ "100" ]
                }
            ],
            "type": "dplay_convert_scale"
        },
        "class": "dplay_get",
        "syntax": {"js": [], "py": ["Dplay.convert_scale(%1, %2, %3, %4, %5)"]}
    },
    "dplay_get_value": {
        "color": "#00979D",
        "fontColor": "#FFF",
        "skeleton": "basic_string_field",
        "statements": [],
        "template": "아날로그 %1 번  %2 센서값",
        "params": [{
            "type": "Block",
            "accept": "string"
        }, {
            "type": "Dropdown",
            "options": [
                ["적외선", "INFR"],
                ["가변저항", "ADJU"],
                ["빛센서", "LIGHT"],
                ["온도센서", "TEMP"],
                ["조이스틱 X", "JOYSX"],
                ["조이스틱 Y", "JOYSY"]
            ],
            "value": "INFR",
            "fontSize": 11,
            'arrowColor': EntryStatic.ARROW_COLOR_HW
        }],
        "events": {},
        "def": {
            "params": [{
                "type": "arduino_get_sensor_number"
            }, null],
            "type": "dplay_get_value",
            "id": "hh5b"
        },
        "paramsKeyMap": {
            "VALUE": 0,
            "OPERATOR": 1
        },
        "class": "dplay_get",
        "isNotFor": ["dplay"],
        "func": function (sprite, script) {
            var signal = script.getValue("VALUE", script);
            return Entry.hw.getAnalogPortValue(signal[1]);
        },
        "syntax": {"js": [], "py": ["Dplay.value(%1, %2)"]}
    },
    "dplay_get_digital_value": {
        "parent": "arduino_get_digital_value",
        "isNotFor": [
            "dplay"
        ],
        "def": {
            "params": [
                {
                    "type": "arduino_get_port_number"
                }
            ],
            "type": "dplay_get_digital_value"
        },
        "class": "dplay_get",
        "syntax": {"js": [], "py": ["Dplay.digital_value(%1)"]}
    },
    "dplay_get_switch_status": {
        "color": "#00979D",
        "fontColor": "#FFF",
        "skeleton": "basic_boolean_field",
        "statements": [],
        "template": "디지털 %1 번 스위치가 %2  ",
        "params": [{
            "type": "Dropdown",
            "options": [
                ["2", "2"],
                ["4", "4"]
            ],
            "value": "2",
            "fontSize": 11,
            'arrowColor': EntryStatic.ARROW_COLOR_HW
        }, {
            "type": "Dropdown",
            "options": [
                ["눌림", "ON"],
                ["열림", "OFF"]
            ],
            "value": "ON",
            "fontSize": 11,
            'arrowColor': EntryStatic.ARROW_COLOR_HW
        }],
        "events": {},
        "def": {
            "params": [null, null],
            "type": "dplay_get_switch_status"
        },
        "paramsKeyMap": {
            "PORT": 0,
            "STATUS": 1
        },
        "class": "dplay_get",
        "isNotFor": ["dplay"],
        "func": function (sprite, script) {
            var port1 = script.getField("PORT");
            var port = 2;
            if (port1 == "2") port = 2;
            else if (port1 == "4") port = 4;
            var value1 = script.getField("STATUS");
            if (value1 == "ON") return Entry.hw.getDigitalPortValue(port) == 1 ? 1 : 0;
            else return Entry.hw.getDigitalPortValue(port) == 0 ? 1 : 0;
        },
        "syntax": {"js": [], "py": ["Dplay.switch_status(%1, %2)"]}
    },
    "dplay_get_tilt": {
        "color": "#00979D",
        "fontColor": "#FFF",
        "skeleton": "basic_boolean_field",
        "statements": [],
        "template": "디지털  %1 번 기울기센서가 %2  ",
        "params": [{
            "type": "Dropdown",
            "options": [
                ["2", "2"],
                ["4", "4"]
            ],
            "value": "2",
            "fontSize": 11,
            'arrowColor': EntryStatic.ARROW_COLOR_HW
        }, {
            "type": "Dropdown",
            "options": [
                ["왼쪽", "LEFT"],
                ["오른쪽", "LIGHT"]
            ],
            "value": "LEFT",
            "fontSize": 11,
            'arrowColor': EntryStatic.ARROW_COLOR_HW
        }],
        "events": {},
        "def": {
            "params": [null, null],
            "type": "dplay_get_tilt"
        },
        "paramsKeyMap": {
            "PORT": 0,
            "STATUS": 1
        },
        "class": "dplay_get",
        "isNotFor": ["dplay"],
        "func": function (sprite, script) {
            var port1 = script.getField("PORT");
            var port = 2;
            if (port1 == "2") port = 2;
            else if (port1 == "4") port = 4;
            var value1 = script.getField("STATUS");
            if (value1 == "LIGHT") return Entry.hw.getDigitalPortValue(port) == 1 ? 1 : 0;
            else return Entry.hw.getDigitalPortValue(port) == 0 ? 1 : 0;
        },
        "syntax": {"js": [], "py": ["Dplay.tilt(%1, %2)"]}
    },
    "dplay_toggle_led": {
        "parent": "arduino_toggle_led",
        "isNotFor": [
            "dplay"
        ],
        "def": {
            "params": [
                {
                    "type": "arduino_get_port_number"
                },
                null,
                null
            ],
            "type": "dplay_toggle_led"
        },
        "class": "dplay_set",
        "syntax": {"js": [], "py": ["Dplay.toggle_led(%1)"]}
    },
    "dplay_toggle_pwm": {
        "parent": "arduino_toggle_pwm",
        "isNotFor": [
            "dplay"
        ],
        "def": {
            "params": [
                {
                    "type": "arduino_get_pwm_port_number"
                },
                {
                    "type": "arduino_text",
                    "params": [ "255" ]
                },
                null
            ],
            "type": "dplay_toggle_pwm"
        },
        "class": "dplay_set",
        "syntax": {"js": [], "py": ["Dplay.toggle_pwm(%1, %2)"]}
    },
    "dplay_select_led": {
        "color": "#00979D",
        "fontColor": "#FFF",
        "skeleton": "basic",
        "statements": [],
        "template": "디지털 %1 LED 상태를 %2 %3",
        "params": [{
            "type": "Dropdown",
            "options": [
                ["7", "7"],
                ["8", "8"],
                ['12', "12"],
                ['13', "13"]
            ],
            "value": "7",
            "fontSize": 11,
            'arrowColor': EntryStatic.ARROW_COLOR_HW
        }, {
            "type": "Dropdown",
            "options": [
                ["켜기", "ON"],
                ["끄기", "OFF"]
            ],
            "value": "ON",
            "fontSize": 11,
            'arrowColor': EntryStatic.ARROW_COLOR_HW
        }, {
            "type": "Indicator",
            "img": "block_icon/hardware_03.png",
            "size": 12
        }],
        "events": {},
        "def": {
            "params": [null, null, null],
            "type": "dplay_select_led"
        },
        "paramsKeyMap": {
            "PORT": 0,
            "OPERATOR": 1
        },
        "class": "dplay_set",
        "isNotFor": ["dplay"],
        "func": function (sprite, script) {
            var port1 = script.getField("PORT");
            var port = 7;
            if (port1 == "7") port = 7;
            else if (port1 == "8") port = 8;
            else if (port1 == "12") port = 12;
            else if (port1 == "13") port = 13;
            var operator = script.getField("OPERATOR");
            var value = operator == "ON" ? 255 : 0;
            Entry.hw.setDigitalPortValue(port, value);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Dplay.select_led(%1, %2)"]}

    },
    "dplay_DCmotor": {
        "color": "#00979D",
        "fontColor": "#FFF",
        "skeleton": "basic",
        "statements": [],
        "template": "%1  DC모터 상태를 %2 %3",
        "params": [{
            "type": "Dropdown",
            "options": [
                ["왼쪽", "1"],
                ["오른쪽", "2"],
                ['양쪽', "3"]
            ],
            "value": "1",
            "fontSize": 11,
            'arrowColor': EntryStatic.ARROW_COLOR_HW
        }, {
            "type": "Dropdown",
            "options": [
                ["정방향", "FRONT"],
                ["역방향", "REAR"],
                ["정지", "OFF"]
            ],
            "value": "FRONT",
            "fontSize": 11,
            'arrowColor': EntryStatic.ARROW_COLOR_HW
        }, {
            "type": "Indicator",
            "img": "block_icon/hardware_03.png",
            "size": 12
        }],
        "events": {},
        "def": {
            "params": [null, null, null],
            "type": "dplay_DCmotor"
        },
        "paramsKeyMap": {
            "PORT": 0,
            "OPERATOR": 1
        },
        "class": "dplay_set",
        "isNotFor": ["dplay"],
        "func": function (sprite, script) {
            var port = script.getField("PORT");
            var port1 = 0;
            var port2 = 0;
            var port3 = 0;
            var port4 = 0;
            if (port == "1") {
              port1 = 3; port2 = 5;
            }
            else if (port == "2") {
              port1 = 6; port2 = 11;
            }
            else if (port == "3") {
              port1 = 3; port2 = 5; port3 = 11; port4 = 6;
            }
            var temp = Entry.dplay.vel_value;
            var operator = script.getField("OPERATOR");
            var value1 = 0;
            var value2 = 0;
            var value3 = 0;
            var value4 = 0;
            if (operator == "FRONT") {
                value1 = temp;
                value2 = 0;
            }
            else if (operator == "REAR") {
                value1 = 0;
                value2 = temp;
            }
            else if (operator == "OFF") {
                value1 = 0;
                value2 = 0;
            }
            Entry.hw.setDigitalPortValue(port1, value2);
            Entry.hw.setDigitalPortValue(port2, value1);
            Entry.hw.setDigitalPortValue(port3, value2);
            Entry.hw.setDigitalPortValue(port4, value1);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Dplay.dc_motor(%1, %2)"]}
    },
    "dplay_DCmotor_speed": {
        "color": "#00979D",
        "fontColor": "#FFF",
        "skeleton": "basic",
        "statements": [],
        "template": "%1 DC모터 속도를 %2(으)로 정하기 %3",
        "params": [{
            "type": "Dropdown",
            "options": [
                ["왼쪽", "1"],
                ["오른쪽", "2"],
                ['양쪽', "3"]
            ],
            "value": "1",
            "fontSize": 11,
            'arrowColor': EntryStatic.ARROW_COLOR_HW
        }, {
            "type": "Block",
            "accept": "string"
        }, {
            "type": "Indicator",
            "img": "block_icon/hardware_03.png",
            "size": 12
        }],
        "events": {},
        "def": {
            "params":  [null, {
                "type": "text",
                "params": ["100"]
            }, null],
            "type": "dplay_DCmotor_speed"
        },
        "paramsKeyMap": {
            "PORT": 0,
            "VALUE": 1
        },
        "class": "dplay_set",
        "isNotFor": ["dplay"],
        "func": function (sprite, script) {
          var port1 = 0;
          var port2 = 0;
          var port3 = 0;
          var port4 = 0;
          var value1 = 0;
          var value2 = 0;
          var result = 0;
          var port = script.getField("PORT");
          if (port == "1") {
              port1 = 3; port2 = 5;
          }
          else if (port == "2") {
              port1 = 11; port2 = 6;
          }
          else if (port == "3") {
              port1 = 3; port2 = 5; port3 = 11; port4 = 6;
          }
          var operator = script.getNumberValue("VALUE", script);
          operator = Math.max(operator, -100);
          operator = Math.min(operator, 100);
          if (operator == 0) {
              value1 = 0;
              value2 = 0;
              Entry.dplay.vel_value = value2;
          }
          else if (operator > 0) {
              result = operator + 155;
              result = Math.round(result);
              value1 = 0;
              value2 = result;
              Entry.dplay.vel_value = value2;
          }
          else if (operator < 0) {
              result = operator - 155;
              result = Math.round(result);
              value1 = -result;
              value2 = 0;
              Entry.dplay.vel_value = value1;
          }
          if (!script.isStart) {
              script.isStart = true;
              script.timeFlag = 1;
              var timeValue = 50;
              var timer = setTimeout(function() {
                script.timeFlag = 2;
                Entry.dplay.removeTimeout(timer);
              }, timeValue);
              Entry.dplay.timeouts.push(timer);
              return script;
          } else if (script.timeFlag == 1) {
              Entry.hw.setDigitalPortValue(3, 0);
              Entry.hw.setDigitalPortValue(5, 0);
              Entry.hw.setDigitalPortValue(6, 0);
              Entry.hw.setDigitalPortValue(11, 0);
              return script;
          } else if (script.timeFlag == 2) {
              Entry.hw.setDigitalPortValue(port1, value1);
              Entry.hw.setDigitalPortValue(port2, value2);
              Entry.hw.setDigitalPortValue(port3, value1);
              Entry.hw.setDigitalPortValue(port4, value2);
              delete script.isStart;
              delete script.timeFlag;
              Entry.engine.isContinue = false;
              return script.callReturn();
          }
       },
       "syntax": {"js": [], "py": ["Dplay.dc_motor_speed(%1, %2)"]}
    },
    "dplay_buzzer": {
        "color": "#00979D",
        "fontColor": "#FFF",
        "skeleton": "basic",
        "statements": [],
        "template": "디지털 10번 부저를 %1 %2 %3 박자로 연주하기",
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    ['도', "1"],
                    ['도#', "2"],
                    ['레', "3"],
                    ['미b', "4"],
                    ['미', "5"],
                    ['파', "6"],
                    ['파#', "7"],
                    ['솔', "8"],
                    ['솔#', "9"],
                    ['라', "10"],
                    ['시b', "11"],
                    ['시', "12"],
                    ['무음', "100"]
                ],
                "value": "1",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_HW
            },
            {
                "type": "Dropdown",
                "options": [
                    ['1', "1"],
                    ['2', "2"],
                    ['3', "3"]
                ],
                "value": "1",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_HW
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                "1",
                "1",
                {
                    "type": "text",
                    "params": [ "0.5" ]
                },
                null
            ],
            "type": "dplay_buzzer"
        },
        "paramsKeyMap": {
            "NOTE": 0,
            "OCTAVE": 1,
            "VALUE": 2
        },
        "class": "dplay_set",
        "isNotFor": ["dplay"],
        "func": function (sprite, script) {
            if (!script.isStart) {
                var note = script.getNumberField("NOTE", script);
                var octave = script.getNumberField("OCTAVE", script);
                var beat = script.getNumberValue("VALUE");
                var tempo = 60;
                var note_go = note + ((octave-1)*12);
                var timeValue = beat*60*1000/tempo;
                script.isStart = true;
                script.timeFlag = 1;
                if(note == 100)   Entry.hw.setDigitalPortValue(10, 100);
                else            Entry.hw.setDigitalPortValue(10, note_go);
                if(timeValue > 100) {
                    var timer1 = setTimeout(function() {
                        Entry.hw.setDigitalPortValue(10, 100);
                        Entry.dplay.removeTimeout(timer1);
                    }, timeValue-100);
                    Entry.dplay.timeouts.push(timer1);
                }
                var timer2 = setTimeout(function() {
                    script.timeFlag = 0;
                    Entry.dplay.removeTimeout(timer2);
                }, timeValue);
                Entry.dplay.timeouts.push(timer2);
                return script;
            }
            else if (script.timeFlag == 1) {
                return script;
            }
            else {
                Entry.hw.setDigitalPortValue(10, 100);
                delete script.isStart;
                delete script.timeFlag;
                Entry.engine.isContinue = false;
                return script.callReturn();
            }
        },
        "syntax": {"js": [], "py": ["Dplay.buzzer(%1, %2, %3)"]}
    },
    "dplay_servo": {
        "color": "#00979D",
        "fontColor": "#FFF",
        "skeleton": "basic",
        "statements": [],
        "template": "디지털 9번 서보모터 각도를 %1 (도)로 이동",
        "params": [{
            "type": "Block",
            "accept": "string"
        }, {
            "type": "Indicator",
            "img": "block_icon/hardware_03.png",
            "size": 12
        }],
        "events": {},
        "def": {
            "params": [{
                "type": "text",
                "params": ["180"],
            }, null],
            "type": "dplay_servo",
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "dplay_set",
        "isNotFor": ["dplay"],
        "func": function (sprite, script) {
            var port = 9;
            var value = script.getNumberValue("VALUE");
            value = Math.round(value);
            value = Math.max(value, 1);
            value = Math.min(value, 179);
            Entry.hw.setDigitalPortValue(9, value);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Dplay.servo(%1)"]}
    },
    "dplay_Robot_run": {
        "color": "#00979D",
        "fontColor": "#FFF",
        "skeleton": "basic",
        "statements": [],
        "template": "로봇을 %1 하기 %2",
        "params": [{
            "type": "Dropdown",
            "options": [
              ['전진',"1"],
              ['후진',"2"],
              ['우회전',"3"],
              ['좌회전',"4"]
            ],
            "value": "1",
            "fontSize": 11,
            'arrowColor': EntryStatic.ARROW_COLOR_HW
        }, {
            "type": "Indicator",
            "img": "block_icon/hardware_03.png",
            "size": 12
        }],
        "events": {},
        "def": {
            "params":  [null, null],
            "type": "dplay_Robot_run"
        },
        "paramsKeyMap": {
            "PORT": 0
        },
        "class": "dplay_robot",
        "isNotFor": ["dplay"],
        "func": function (sprite, script) {
            var port = script.getField("PORT");
            var port1 = 3;
            var port2 = 5;
            var port3 = 6;
            var port4 = 11;
            var value1 = 0;
            var value2 = 0;
            var value3 = 0;
            var value4 = 0;
            var temp_Left = Entry.dplay.Left_value;
            var temp_Right = Entry.dplay.Right_value;
            if(port == "1") {
              value1 = 0; value2 = temp_Left; value3 = temp_Right; value4 = 0;
            }
            else if(port == "2") {
              value1 = temp_Left; value2 = 0; value3 = 0; value4 = temp_Right;
            }
            else if(port == "3") {
              value1 = 0; value2 = temp_Left; value3 = 0; value4 = 0;
            }
            else if(port == "4") {
              value1 = 0; value2 = 0; value3 = temp_Right; value4 = 0;
            }
            Entry.hw.setDigitalPortValue(port1, value1);
            Entry.hw.setDigitalPortValue(port2, value2);
            Entry.hw.setDigitalPortValue(port3, value3);
            Entry.hw.setDigitalPortValue(port4, value4);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Dplay.robot_run(%1)"]}
    },
    "dplay_Robot_run_sec": {
        "color": "#00979D",
        "fontColor": "#FFF",
        "skeleton": "basic",
        "statements": [],
        "template": "로봇을 %1 초 동안 %2 하기 %3",
        "params": [{
            "type": "Block",
            "accept": "string"
        }, {
            "type": "Dropdown",
            "options": [
              ['전진',"1"],
              ['후진',"2"],
              ['우회전',"3"],
              ['좌회전',"4"]
            ],
            "value": "1",
            "fontSize": 11,
            'arrowColor': EntryStatic.ARROW_COLOR_HW
        }, {
            "type": "Indicator",
            "img": "block_icon/hardware_03.png",
            "size": 12
        }],
        "events": {},
        "def": {
            "params":  [{
                "type": "text",
                "params": ["1"]
            }, null, null],
            "type": "dplay_Robot_run_sec"
        },
        "paramsKeyMap": {
            "VALUE": 0,
            "PORT": 1
        },
        "class": "dplay_robot",
        "isNotFor": ["dplay"],
        "func": function (sprite, script) {
            var port1 = 3;
            var port2 = 5;
            var port3 = 6;
            var port4 = 11;
            var value1 = 0;
            var value2 = 0;
            var value3 = 0;
            var value4 = 0;
            var temp_Left = Entry.dplay.Left_value;
            var temp_Right = Entry.dplay.Right_value;
            var port = script.getField("PORT");
            if (!script.isStart) {
              script.isStart = true;
              script.timeFlag = 1;
              var timeValue = script.getNumberValue("VALUE") * 1000;
              var timer = setTimeout(function() {
                script.timeFlag = 0;
                Entry.dplay.removeTimeout(timer);
              }, timeValue);
              Entry.dplay.timeouts.push(timer);
              return script;
            } else if (script.timeFlag == 1) {
             if(port == "1") {
                value1 = 0; value2 = temp_Left; value3 = temp_Right; value4 = 0;
              }
              else if(port == "2") {
                value1 = temp_Left; value2 = 0; value3 = 0; value4 = temp_Right;
              }
              else if(port == "3") {
                value1 = 0; value2 = temp_Left; value3 = 0; value4 = 0;
              }
              else if(port == "4") {
                value1 = 0; value2 = 0; value3 = temp_Right; value4 = 0;
              }
              Entry.hw.setDigitalPortValue(port1, value1);
              Entry.hw.setDigitalPortValue(port2, value2);
              Entry.hw.setDigitalPortValue(port3, value3);
              Entry.hw.setDigitalPortValue(port4, value4);
              return script;
            } else {
              delete script.isStart;
              delete script.timeFlag;
              Entry.engine.isContinue = false;
              value1 = 0;
              value2 = 0;
              value3 = 0;
              value4 = 0;
              return script.callReturn();
            }
        },
        "syntax": {"js": [], "py": ["Dplay.robot_run_sec(%1, %2)"]}
    },
    "dplay_robot_speed_sel": {
        "color": "#00979D",
        "fontColor": "#FFF",
        "skeleton": "basic",
        "statements": [],
        "template": "%1 바퀴 속도를 %2(으)로 정하기 %3",
        "params": [{
            "type": "Dropdown",
            "options": [
              ['왼쪽',"1"],
              ['오른쪽',"2"],
              ['양쪽', "3"]
            ],
            "value": "1",
            "fontSize": 11,
            'arrowColor': EntryStatic.ARROW_COLOR_HW
        }, {
            "type": "Block",
            "accept": "string"
        }, {
            "type": "Indicator",
            "img": "block_icon/hardware_03.png",
            "size": 12
        }],
        "events": {},
        "def": {
            "params":  [null, {
                "type": "text",
                "params": ["100"]
            }, null],
            "type": "dplay_robot_speed_sel"
        },
        "paramsKeyMap": {
            "PORT": 0,
            "VALUE": 1
        },
        "class": "dplay_robot",
        "isNotFor": ["dplay"],
        "func": function (sprite, script) {
            var port1 = 0;
            var port2 = 0;
            var port3 = 0;
            var port4 = 0;
            var value1 = 0;
            var value2 = 0;
            var value3 = 0;
            var value4 = 0;
            var result = 0;
            var port = script.getField("PORT");
            var operator = script.getNumberValue("VALUE", script);
            operator = Math.max(operator, -100);
            operator = Math.min(operator, 100);
            if (port == "1") {
                   port1 = 3; port2 = 5;
                   if(operator > 0) {
                     result = operator + 155;
                     result = Math.round(result);
                     value1 = 0;
                     value2 = result;
                     Entry.dplay.Left_value = value2;
                   }
                   else if (operator < 0) {
                     result = operator - 155;
                     result = Math.round(result);
                     value1 = -result;
                     value2 = 0;
                     Entry.dplay.Left_value = value1;
                   }
                   else if( operator == 0) {
                     value1 = 0;
                     value2 = 0;
                     Entry.dplay.Left_value = 0;
                   }
            }
            if (port == "2") {
                  port3 = 6; port4 = 11;
                  if(operator > 0) {
                    result = operator + 155;
                    result = Math.round(result);
                    value3 = 0;
                    value4 = result;
                    Entry.dplay.Right_value = value4;
                  }
                  else if (operator < 0) {
                    result = operator - 155;
                    result = Math.round(result);
                    value3 = -result;
                    value4 = 0;
                    Entry.dplay.Right_value = value3;
                  }
                  else if( operator == 0) {
                    value3 = 0;
                    value4 = 0;
                    Entry.dplay.Right_value = value3;
                  }
            }
            if (port == "3") {
                port1 = 3; port2 = 5; port3 = 6; port4 = 11;
                if(operator > 0) {
                  result = operator + 155;
                  result = Math.round(result);
                  value1 = 0;
                  value2 = result;
                  value3 = 0;
                  value4 = result;
                  Entry.dplay.Left_value = value2;
                  Entry.dplay.Right_value = value4;
                }
                else if (operator < 0) {
                  result = operator - 155;
                  result = Math.round(result);
                  value1 = -result;
                  value2 = 0;
                  value3 = -result;
                  value4 = 0;
                  Entry.dplay.Left_value = value1;
                  Entry.dplay.Right_value = value3;
                }
                else if(operator == 0){
                  value1 = 0;
                  value2 = 0;
                  value3 = 0;
                  value4 = 0;
                  Entry.dplay.Left_value = 0;
                  Entry.dplay.Right_value = 0;
                }
            }
            if (!script.isStart) {
                  script.isStart = true;
                  script.timeFlag = 1;
                  var timeValue = 50;
                  var timer = setTimeout(function() {
                    script.timeFlag = 2;
                    Entry.dplay.removeTimeout(timer);
                  }, timeValue);
                  Entry.dplay.timeouts.push(timer);
                  return script;
            } else if (script.timeFlag == 1) {
                  Entry.hw.setDigitalPortValue(3, 0);
                  Entry.hw.setDigitalPortValue(5, 0);
                  Entry.hw.setDigitalPortValue(6, 0);
                  Entry.hw.setDigitalPortValue(11, 0);
                  return script;
            } else if (script.timeFlag == 2) {
                  Entry.hw.setDigitalPortValue(port1, value1);
                  Entry.hw.setDigitalPortValue(port2, value2);
                  Entry.hw.setDigitalPortValue(port3, value4);
                  Entry.hw.setDigitalPortValue(port4, value3);
                  delete script.isStart;
                  delete script.timeFlag;
                  Entry.engine.isContinue = false;
                  return script.callReturn();
              }
          }
    },
    "dplay_robot_speed_set": {
        "color": "#00979D",
        "fontColor": "#FFF",
        "skeleton": "basic",
        "statements": [],
        "template": "오른쪽 바퀴 %1 왼쪽 바퀴 %2(으)로 정하기 %3",
        "params": [{
            "type": "Block",
            "accept": "string"
        }, {
            "type": "Block",
            "accept": "string"
        }, {
            "type": "Indicator",
            "img": "block_icon/hardware_03.png",
            "size": 12
        }],
        "events": {},
        "def": {
            "params":  [{
                "type": "text",
                "params": ["100"]
            }, {
                "type": "text",
                "params": ["100"]
            }, null],
            "type": "dplay_robot_speed_set"
        },
        "paramsKeyMap": {
            "R_VALUE": 0,
            "L_VALUE": 1
        },
        "class": "dplay_robot",
        "isNotFor": ["dplay"],
        "func": function (sprite, script) {
            var port1 = 3;
            var port2 = 5;
            var port3 = 6;
            var port4 = 11;
            var value1 = 0;
            var value2 = 0;
            var value3 = 0;
            var value4 = 0;
            var result_R = 0;
            var result_L = 0;
            var value_L = script.getNumberValue("L_VALUE", script);
            value_L = Math.max(value_L, -100);
            value_L = Math.min(value_L, 100);
            if(value_L > 0) {
              result_L = value_L + 155;
              result_L = Math.round(result_L);
              value1 = 0;
              value2 = result_L;
              Entry.dplay.Left_value = value2;
            }
            else if (value_L < 0) {
              result_L = value_L - 155;
              result_L = Math.round(result_L);
              value1 = -result_L;
              value2 = 0;
              Entry.dplay.Left_value = value1;
            }
            else if(value_L == 0){
              value1 = 0;
              value2 = 0;
              Entry.dplay.Left_value = 0;
            }
            var value_R = script.getNumberValue("R_VALUE", script);
            value_R = Math.max(value_R, -100);
            value_R = Math.min(value_R, 100);
            if(value_R > 0) {
              result_R = value_R + 155;
              result_R = Math.round(result_R);
              value3 = 0;
              value4 = result_R;
              Entry.dplay.Right_value = value4;
            }
            else if (value_R < 0) {
              result_R = value_R - 155;
              result_R = Math.round(result_R);
              value3 = -result_R;
              value4 = 0;
              Entry.dplay.Right_value = value3;
            }
            else if(value_R == 0){
              value3 = 0;
              value4 = 0;
              Entry.dplay.Right_value = 0;
            }
            if (!script.isStart) {
                  script.isStart = true;
                  script.timeFlag = 1;
                  var timeValue = 50;
                  var timer = setTimeout(function() {
                    script.timeFlag = 2;
                    Entry.dplay.removeTimeout(timer);
                  }, timeValue);
                  Entry.dplay.timeouts.push(timer);
                  return script;
            } else if (script.timeFlag == 1) {
                  Entry.hw.setDigitalPortValue(3, 0);
                  Entry.hw.setDigitalPortValue(5, 0);
                  Entry.hw.setDigitalPortValue(6, 0);
                  Entry.hw.setDigitalPortValue(11, 0);
                  return script;
            } else if (script.timeFlag == 2) {
                  Entry.hw.setDigitalPortValue(port1, value1);
                  Entry.hw.setDigitalPortValue(port2, value2);
                  Entry.hw.setDigitalPortValue(port3, value4);
                  Entry.hw.setDigitalPortValue(port4, value3);
                  delete script.isStart;
                  delete script.timeFlag;
                  Entry.engine.isContinue = false;
                  return script.callReturn();
            }
        },
        "syntax": {"js": [], "py": ["Dplay.robot_speed_sel(%1, %2)"]}
    },
    "dplay_robot_stop": {
        "color": "#00979D",
        "fontColor": "#FFF",
        "skeleton": "basic",
        "statements": [],
        "template": "로봇을 정지하기 %1",
        "params": [{
            "type": "Indicator",
            "img": "block_icon/hardware_03.png",
            "size": 12
        }],
        "events": {},
        "def": {
            "params":  [null],
            "type": "dplay_robot_stop"
        },
        "paramsKeyMap": {
        },
        "class": "dplay_robot",
        "isNotFor": ["dplay"],
        "func": function (sprite, script) {
            var port1 = 3;
            var port2 = 5;
            var port3 = 6;
            var port4 = 11;
            var value1 = 0;
            var value2 = 0;
            Entry.hw.setDigitalPortValue(port1, value1);
            Entry.hw.setDigitalPortValue(port2, value2);
            Entry.hw.setDigitalPortValue(port4, value1);
            Entry.hw.setDigitalPortValue(port3, value2);
            return script.callReturn();
        },
        "syntax": {"js": [], "py": ["Dplay.robot_stop()"]}
    },
    "nemoino_get_number_sensor_value": {
        "parent": "arduino_get_number_sensor_value",
        "isNotFor": [
            "nemoino"
        ],
        "def": {
            "params": [
                {
                    "type": "arduino_get_sensor_number"
                }
            ],
            "type": "nemoino_get_number_sensor_value"
        },
        "class": "arduino_value",
        "syntax": {"js": [], "py": ["Nemoino.sensor_value(%1)"]}
    },
    "nemoino_get_digital_value": {
        "parent": "arduino_get_digital_value",
        "isNotFor": [
            "nemoino"
        ],
        "def": {
            "params": [
                {
                    "type": "arduino_get_port_number"
                }
            ],
            "type": "nemoino_get_digital_value"
        },
        "class": "arduino_value",
        "syntax": {"js": [], "py": ["Nemoino.digital_value(%1)"]}
    },
    "nemoino_toggle_led": {
        "parent": "arduino_toggle_led",
        "isNotFor": [
            "nemoino"
        ],
        "def": {
            "params": [
                {
                    "type": "arduino_get_port_number"
                },
                null,
                null
            ],
            "type": "nemoino_toggle_led"
        },
        "class": "arduino_set",
        "syntax": {"js": [], "py": ["Nemoino.toggle_led(%1)"]}
    },
    "nemoino_toggle_pwm": {
        "parent": "arduino_toggle_pwm",
        "isNotFor": [
            "nemoino"
        ],
        "def": {
            "params": [
                {
                    "type": "arduino_get_pwm_port_number"
                },
                {
                    "type": "arduino_text",
                    "params": [ "255" ]
                },
                null
            ],
            "type": "nemoino_toggle_pwm"
        },
        "class": "arduino_set",
        "syntax": {"js": [], "py": ["Nemoino.toggle_pwm(%1, %2)"]}
    },
    "nemoino_convert_scale": {
        "parent": "arduino_convert_scale",
        "isNotFor": [
            "nemoino"
        ],
        "def": {
            "params": [
                {
                    "type": "arduino_get_number_sensor_value",
                    "params": [
                        {
                            "type": "arduino_get_sensor_number"
                        }
                    ]
                },
                {
                    "type": "number",
                    "params": [ "0" ]
                },
                {
                    "type": "number",
                    "params": [ "1023" ]
                },
                {
                    "type": "number",
                    "params": [ "0" ]
                },
                {
                    "type": "number",
                    "params": [ "100" ]
                }
            ],
            "type": "nemoino_convert_scale"
        },
        "class": "arduino",
        "syntax": {"js": [], "py": ["Nemoino.convert_scale(%1, %2, %3, %4, %5)"]}
    },
    "sensorBoard_get_number_sensor_value": {
        "parent": "arduino_get_number_sensor_value",
        "isNotFor": [
            "sensorBoard"
        ],
        "def": {
            "params": [
                {
                    "type": "arduino_get_sensor_number"
                }
            ],
            "type": "sensorBoard_get_number_sensor_value"
        },
        "class": "arduino_value",
        "syntax": {"js": [], "py": ["SensorBoard.get_number_sensor_value(%1)"]}
    },
    "sensorBoard_get_digital_value": {
        "parent": "arduino_get_digital_value",
        "isNotFor": [
            "sensorBoard"
        ],
        "def": {
            "params": [
                {
                    "type": "arduino_get_port_number"
                }
            ],
            "type": "sensorBoard_get_digital_value"
        },
        "class": "arduino_value",
        "syntax": {"js": [], "py": ["SensorBoard.get_digital_value(%1)"]}
    },
    "sensorBoard_toggle_led": {
        "parent": "arduino_toggle_led",
        "isNotFor": [
            "sensorBoard"
        ],
        "def": {
            "params": [
                {
                    "type": "arduino_get_port_number"
                },
                null,
                null
            ],
            "type": "sensorBoard_toggle_led"
        },
        "class": "arduino_set",
        "syntax": {"js": [], "py": ["SensorBoard.toggle_led(%1)"]}
    },
    "sensorBoard_toggle_pwm": {
        "parent": "arduino_toggle_pwm",
        "isNotFor": [
            "sensorBoard"
        ],
        "def": {
            "params": [
                {
                    "type": "arduino_get_pwm_port_number"
                },
                {
                    "type": "arduino_text",
                    "params": [ "255" ]
                },
                null
            ],
            "type": "sensorBoard_toggle_pwm"
        },
        "class": "arduino_set",
        "syntax": {"js": [], "py": ["SensorBoard.toggle_pwm(%1, %2)"]}
    },
    "sensorBoard_convert_scale": {
        "parent": "arduino_convert_scale",
        "isNotFor": [
            "sensorBoard"
        ],
        "def": {
            "params": [
                {
                    "type": "arduino_get_number_sensor_value",
                    "params": [
                        {
                            "type": "arduino_get_sensor_number",
                            "id": "bl5e"
                        }
                    ]
                },
                {
                    "type": "number",
                    "params": [ "0" ]
                },
                {
                    "type": "number",
                    "params": [ "1023" ]
                },
                {
                    "type": "number",
                    "params": [ "0" ]
                },
                {
                    "type": "number",
                    "params": [ "100" ]
                }
            ],
            "type": "sensorBoard_convert_scale"
        },
        "class": "arduino",
        "syntax": {"js": [], "py": ["SensorBoard.convert_scale(%1, %2, %3, %4, %5)"]}
    },
    // ardublock Added 2016-06-01
    "ardublock_get_number_sensor_value": {
        "parent": "arduino_get_number_sensor_value",
        "isNotFor": [
            "ardublock"
        ],
        "def": {
            "params": [
                {
                    "type": "arduino_get_sensor_number"
                }
            ],
            "type": "ardublock_get_number_sensor_value"
        },
        "class": "arduino_value"
    },
    "ardublock_get_digital_value": {
        "parent": "arduino_get_digital_value",
        "isNotFor": [
            "ardublock"
        ],
        "def": {
            "params": [
                {
                    "type": "arduino_get_port_number"
                }
            ],
            "type": "ardublock_get_digital_value"
        },
        "class": "arduino_value"
    },
    "ardublock_toggle_led": {
        "parent": "arduino_toggle_led",
        "isNotFor": [
            "ardublock"
        ],
        "def": {
            "params": [
                {
                    "type": "arduino_get_port_number"
                },
                null,
                null
            ],
            "type": "ardublock_toggle_led"
        },
        "class": "arduino_set"
    },
    "ardublock_toggle_pwm": {
        "parent": "arduino_toggle_pwm",
        "isNotFor": [
            "ardublock"
        ],
        "def": {
            "params": [
                {
                    "type": "arduino_get_pwm_port_number"
                },
                {
                    "type": "arduino_text",
                    "params": [ "255" ]
                },
                null
            ],
            "type": "ardublock_toggle_pwm"
        },
        "class": "arduino_set"
    },
    "ardublock_convert_scale": {
        "parent": "arduino_convert_scale",
        "isNotFor": [
            "ardublock"
        ],
        "def": {
            "params": [
                {
                    "type": "arduino_get_number_sensor_value",
                    "params": [
                        {
                            "type": "arduino_get_sensor_number"
                        }
                    ]
                },
                {
                    "type": "number",
                    "params": [ "0" ]
                },
                {
                    "type": "number",
                    "params": [ "1023" ]
                },
                {
                    "type": "number",
                    "params": [ "0" ]
                },
                {
                    "type": "number",
                    "params": [ "100" ]
                }
            ],
            "type": "ardublock_convert_scale"
        },
        "class": "arduino"
    },
    // ardublock Added 2016-06-01
    "joystick_get_number_sensor_value": {
        "parent": "arduino_get_number_sensor_value",
        "isNotFor": [
            "joystick"
        ],
        "def": {
            "params": [
                {
                    "type": "arduino_get_sensor_number"
                }
            ],
            "type": "joystick_get_number_sensor_value"
        },
        "class": "arduino_value"
    },
    "joystick_get_digital_value": {
        "parent": "arduino_get_digital_value",
        "isNotFor": [
            "joystick"
        ],
        "def": {
            "params": [
                {
                    "type": "arduino_get_port_number"
                }
            ],
            "type": "joystick_get_digital_value"
        },
        "class": "arduino_value"
    },
    "joystick_toggle_led": {
        "parent": "arduino_toggle_led",
        "isNotFor": [
            "joystick"
        ],
        "def": {
            "params": [
                {
                    "type": "arduino_get_port_number"
                },
                null,
                null
            ],
            "type": "joystick_toggle_led"
        },
        "class": "arduino_set"
    },
    "joystick_toggle_pwm": {
        "parent": "arduino_toggle_pwm",
        "isNotFor": [
            "joystick"
        ],
        "def": {
            "params": [
                {
                    "type": "arduino_get_pwm_port_number"
                },
                {
                    "type": "arduino_text",
                    "params": [ "255" ]
                },
                null
            ],
            "type": "joystick_toggle_pwm"
        },
        "class": "arduino_set"
    },
    "joystick_convert_scale": {
        "parent": "arduino_convert_scale",
        "isNotFor": [
            "joystick"
        ],
        "def": {
            "params": [
                {
                    "type": "arduino_get_number_sensor_value",
                    "params": [
                        {
                            "type": "arduino_get_sensor_number"
                        }
                    ]
                },
                {
                    "type": "number",
                    "params": [ "0" ]
                },
                {
                    "type": "number",
                    "params": [ "1023" ]
                },
                {
                    "type": "number",
                    "params": [ "0" ]
                },
                {
                    "type": "number",
                    "params": [ "100" ]
                }
            ],
            "type": "joystick_convert_scale"
        },
        "class": "arduino"
    },
    "ebs_if": {
        "parent": "_if",
        "def": {
            type: "_if",
            params: [
                {
                    type: 'reach_something',
                    params: [
                        null,
                        "wall"
                    ]
                }
            ]
        }
    },
    "ebs_if2": {
        "parent": "_if",
        "def": {
            type: "_if",
            params: [
                {
                    type: 'reach_something',
                    params: [
                        null,
                        "cwz5"
                    ]
                }
            ]
        }
    },
    "ai_move_right": {
        "skeleton": "basic",
        "mode": "maze",
        "color": "#A751E3",
        "syntax": [
            "Scope",
            "move"
        ],
        "params": [
            {
                "type": "Image",
                "img": "/img/assets/week/blocks/moveStep.png",
                "size": 24
            }
        ],
        func: function(entity, script) {
            if (!script.isStart) {
                script.isStart = true;
                script.isAction = true;
                Ntry.dispatchEvent("gridChange", function() {
                    script.isAction = false;
                });
                var spaceShipComp = Ntry.entityManager.getComponent(
                    entity.id, Ntry.STATIC.SPACE_SHIP
                );
                spaceShipComp.direction = Ntry.STATIC.EAST;
                var gridComp = Ntry.entityManager.getComponent(
                    entity.id, Ntry.STATIC.GRID
                );
                Ntry.entityManager.addComponent(
                    entity.id, {
                        type: Ntry.STATIC.ANIMATE,
                        animateType: Ntry.STATIC.ROTATE_TO,
                        animateValue: 0
                    }
                );
                gridComp.x++;
                return Entry.STATIC.BREAK;
            } else if (script.isAction) {
                return Entry.STATIC.BREAK;
            } else {
                delete script.isAction;
                delete script.isStart;
                //Entry.engine.isContinue = false;
            }
        }
    },
    "ai_move_up": {
        "skeleton": "basic",
        "mode": "maze",
        "color": "#A751E3",
        "syntax": [
            "Scope",
            "up"
        ],
        "params": [
            {
                "type": "Image",
                "img": "/img/assets/week/blocks/ai_move_up.png",
                "size": 24
            }
        ],
        func: function(entity, script) {
            if (!script.isStart) {
                script.isStart = true;
                script.isAction = true;
                Ntry.dispatchEvent("gridChange", function() {
                    script.isAction = false;
                });
                var spaceShipComp = Ntry.entityManager.getComponent(
                    entity.id, Ntry.STATIC.SPACE_SHIP
                );
                spaceShipComp.direction = Ntry.STATIC.NORTH;
                var gridComp = Ntry.entityManager.getComponent(
                    entity.id, Ntry.STATIC.GRID
                );
                Ntry.entityManager.addComponent(
                    entity.id, {
                        type: Ntry.STATIC.ANIMATE,
                        animateType: Ntry.STATIC.ROTATE_TO,
                        animateValue: -45
                    }
                );
                gridComp.x++;
                gridComp.y--;
                return script;
            } else if (script.isAction) {
                return script;
            } else {
                delete script.isAction;
                delete script.isStart;
                return script.callReturn();
            }
        }
    },
    "ai_move_down": {
        "skeleton": "basic",
        "mode": "maze",
        "color": "#A751E3",
        "syntax": [
            "Scope",
            "down"
        ],
        "params": [
            {
                "type": "Image",
                "img": "/img/assets/week/blocks/ai_move_down.png",
                "size": 24
            }
        ],
        func: function(entity, script) {
            if (!script.isStart) {
                script.isStart = true;
                script.isAction = true;
                Ntry.dispatchEvent("gridChange", function() {
                    script.isAction = false;
                });
                var spaceShipComp = Ntry.entityManager.getComponent(
                    entity.id, Ntry.STATIC.SPACE_SHIP
                );
                spaceShipComp.direction = Ntry.STATIC.SOUTH;
                var gridComp = Ntry.entityManager.getComponent(
                    entity.id, Ntry.STATIC.GRID
                );
                Ntry.entityManager.addComponent(
                    entity.id, {
                        type: Ntry.STATIC.ANIMATE,
                        animateType: Ntry.STATIC.ROTATE_TO,
                        animateValue: 45
                    }
                );
                gridComp.x++;
                gridComp.y++;
                return script;
            } else if (script.isAction) {
                return script;
            } else {
                delete script.isAction;
                delete script.isStart;
                return script.callReturn();
            }
        }
    },
    "ai_repeat_until_reach": {
        "skeleton": "basic_loop",
        "mode": "maze",
        "color": "#498DEB",
        "syntax": [
            "BasicWhile",
            "true"
        ],
        statements: [
            {
                "accept": "basic"
            }
        ],
        "params": [
            {
                "type": "Image",
                "img": "/img/assets/week/blocks/for.png",
                "size": 24
            }
        ],
        func: function() {
            var statement = this.block.statements[0];
            if (statement.getBlocks().length === 0)
                return;

            return this.executor.stepInto(statement);
        }
    },
    "ai_if_else_1": {
        "skeleton": "basic_double_loop",
        "mode": "maze",
        "color": "#498DEB",
        "syntax": [
            "BasicIf",
            "front == 'stone'"
        ],
        "statements": [
            {
                "accept": "basic"
            },
            {
                "accept": "basic"
            }
        ],
        "params": [
            {
                "type": "Image",
                "img": "/img/assets/ntry/bitmap/ai/obstacle_1.png",
                "size": 24
            },
            {
                "type": "Image",
                "img": "/img/assets/week/blocks/for.png",
                "size": 24
            },
            {
                "type": "LineBreak"
            }
        ],
        func: function(entity, script) {
            if (script.isLooped) {
                delete script.isLooped;
                return script.callReturn();
            }
            var radar = Ntry.entityManager.getComponent(
                entity.id, Ntry.STATIC.RADAR
            );

            var statements = this.block.statements;
            var index = 1;
            script.isLooped = true;
            if (radar.center.type == Ntry.STATIC.AI_METEO &&
                radar.center.distance == 1)
                index = 0;
            this.executor.stepInto(statements[index]);
            return Entry.STATIC.BREAK;
        }
    },
    "ai_boolean_distance": {
        "skeleton": "basic_boolean_field",
        "mode": "maze",
        "color": "#2fc9f0",
        "fontColor": "#fff",
        "syntax": [
            "Scope",
            "radar_%1 %2 %3#"
        ],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Menus.ai_above, "UP"],
                    [Lang.Menus.ai_front, "RIGHT"],
                    [Lang.Menus.ai_under, "DOWN"]
                ],
                "value": "RIGHT",
                "fontSize": 11
            },
            {
                "type": "Dropdown",
                "options": [
                    [">","BIGGER"],
                    [">=","BIGGER_EQUAL"],
                    ["=","EQUAL"],
                    ["<","SMALLER"],
                    ["<=","SMALLER_EQUAL"]
                ],
                "value": "BIGGER",
                "fontSize": 11
            },
            {
                "type": "Block",
                "accept": "string"
            }
        ],
        func: function(entity, script) {
            var radar = Ntry.entityManager.getComponent(
                entity.id, Ntry.STATIC.RADAR
            );

            var params = this.block.params;

            var direction = params[0];
            var operator = params[1];
            var value = this.getParam(2);

            var radarValue;
            switch (direction) {
                case "UP":
                    radarValue = radar.left;
                    break;
                case "RIGHT":
                    radarValue = radar.center;
                    break;
                case "DOWN":
                    radarValue = radar.right;
                    break;
            }
            if (radarValue.type == Ntry.STATIC.AI_GOAL)
                radarValue = Number.MAX_VALUE;
            else
                radarValue = radarValue.distance;

            switch (operator) {
                case "BIGGER":
                    return radarValue > value;
                case "BIGGER_EQUAL":
                    return radarValue >= value;
                case "EQUAL":
                    return radarValue == value;
                case "SMALLER":
                    return radarValue < value;
                case "SMALLER_EQUAL":
                    return radarValue <= value;
            }
        }
    },
    "ai_distance_value": {
        "skeleton": "basic_string_field",
        "mode": "maze",
        "color": "#ffd974",
        "syntax": [
            "Scope",
            "radar_%1#"
        ],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Menus.ai_above, "UP"],
                    [Lang.Menus.ai_front, "RIGHT"],
                    [Lang.Menus.ai_under, "DOWN"]
                ],
                "value": "RIGHT",
                "fontSize": 11
            }
        ],
        func: function(entity, script) {
            var radar = Ntry.entityManager.getComponent(
                entity.id, Ntry.STATIC.RADAR
            );

            switch (this.block.params[0]) {
                case "UP":
                    radarValue = radar.left;
                    break;
                case "RIGHT":
                    radarValue = radar.center;
                    break;
                case "DOWN":
                    radarValue = radar.right;
                    break;
            }
            return radarValue.type == Ntry.STATIC.AI_GOAL ?
                Number.MAX_VALUE : radarValue.distance;
        }
    },
    "ai_boolean_object": {
        "skeleton": "basic_boolean_field",
        "fontColor": "#fff",
        "mode": "maze",
        "color": "#2fc9f0",
        "syntax": [
            "Scope",
            "object_%1 == %2#"
        ],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Menus.ai_above, "UP"],
                    [Lang.Menus.ai_front, "RIGHT"],
                    [Lang.Menus.ai_under, "DOWN"]
                ],
                "value": "RIGHT",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_HW
            },
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Menus.asteroids, "OBSTACLE"],
                    [Lang.Menus.wall, "WALL"],
                    [Lang.Menus.item, "ITEM"]
                ],
                "value": "OBSTACLE",
                "fontSize": 11
            }
        ],
        func: function(entity, script) {
            var radar = Ntry.entityManager.getComponent(
                entity.id, Ntry.STATIC.RADAR
            );

            var params = this.block.params;

            var radarValue;
            switch (params[0]) {
                case "UP":
                    radarValue = radar.left.type;
                    break;
                case "RIGHT":
                    radarValue = radar.center.type;
                    break;
                case "DOWN":
                    radarValue = radar.right.type;
                    break;
            }
            switch (params[1]) {
                case "OBSTACLE":
                    return radarValue == Ntry.STATIC.AI_METEO;
                case "WALL":
                    return radarValue == Ntry.STATIC.AI_WALL;
                case "ITEM":
                    return radarValue == Ntry.STATIC.AI_ITEM;
            }
        }
    },
    "ai_use_item": {
        "skeleton": "basic",
        "mode": "maze",
        "color": "#EACF11",
        "syntax": [
            "Scope",
            "use_item"
        ],
        "params": [
            {
                "type": "Image",
                "img": '/img/assets/week/blocks/item.png',
                "size": 24
            }
        ],
        func: function(entity, script) {
            if (!script.isStart) {
                Ntry.dispatchEvent("triggerWeapon");
                script.isStart = true;
                script.isAction = true;
                Ntry.dispatchEvent("gridChange", function() {
                    script.isAction = false;
                });
                var spaceShipComp = Ntry.entityManager.getComponent(
                    entity.id, Ntry.STATIC.SPACE_SHIP
                );
                spaceShipComp.direction = Ntry.STATIC.EAST;
                var gridComp = Ntry.entityManager.getComponent(
                    entity.id, Ntry.STATIC.GRID
                );
                Ntry.entityManager.addComponent(
                    entity.id, {
                        type: Ntry.STATIC.ANIMATE,
                        animateType: Ntry.STATIC.ROTATE_TO,
                        animateValue: 0
                    }
                );
                gridComp.x++;
                return script;
            } else if (script.isAction) {
                return script;
            } else {
                delete script.isAction;
                delete script.isStart;
                //Entry.engine.isContinue = false;
                return script.callReturn();
            }
        }
    },
    "ai_boolean_and": {
        "color": "#2fc9f0",
        "skeleton": "basic_boolean_field",
        "fontColor": "#fff",
        "statements": [],
        "syntax": [
            "Scope",
            "%1 && %3#"
        ],
        "params": [
            {
                "type": "Block",
                "accept": "boolean"
            },
            {
                "type": "Text",
                "text": Lang.Blocks.JUDGEMENT_boolean_and,
                "color": "#fff"
            },
            {
                "type": "Block",
                "accept": "boolean"
            }
        ],
        "events": {},
        "func": function () {
            return this.getParam(0) && this.getParam(2);
        }
    },
    "ai_True": {
        "color": "#2fc9f0",
        "skeleton": "basic_boolean_field",
        "statements": [],
        "params": [
            {
                "type": "Text",
                "text": Lang.Blocks.JUDGEMENT_true,
                "color": "#3D3D3D"
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            type: "True"
        },
        "func": function (sprite, script) {
            return true;
        },
        "isPrimitive": true
    },
    "ai_if_else": {
        "color": "#498deb",
        "skeleton": "basic_double_loop",
        "statements": [
            {
                "accept": "basic"
            },
            {
                "accept": "basic"
            }
        ],
        "params": [
            {
                "type": "Block",
                "accept": "boolean"
            },
            {
                "type": "Indicator",
                "img": "block_icon/if.png",
                "size": 12
            },
            {
                "type": "LineBreak"
            }
        ],
        "func": function (sprite, script) {
            if (script.isCondition) {
                delete script.isCondition;
                return script.callReturn();
            }
            var value = this.getParam(0);
            script.isCondition = true;
            if (value)
                return this.executor.stepInto(this.block.statements[0]);
            else
                return this.executor.stepInto(this.block.statements[1]);
        },
        "syntax": [
            "BasicIf",
            "true"
        ]
    },
    "ev3_color_sensor": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_string_field",
        "statements": [],
        "template": "%1 의  %2 값",
        "params": [{
            "type": "Dropdown",
            "options": [
                ["1", "1"],
                ["2", "2"],
                ["3", "3"],
                ["4", "4"]
            ],
            "value": "1",
            "fontSize": 11
        }, {
            "type": "Dropdown",
            "options": [
                ["RGB", "RGB"],
                ["R", "R"],
                ["G", "G"],
                ["B", "B"]
            ],
            "value": "RGB",
            "fontSize": 11
        }],
        "events": {},
        "def": {
            "params": [null, null],
            "type": "ev3_color_sensor"
        },
        "paramsKeyMap": {
            "PORT": 0,
            "RGB": 1
        },
        "class": "ev3_sensor",
        "isNotFor": ["EV3"],
        "func": function (sprite, script) {
            var port = script.getStringField("PORT", script);
            var rgb = script.getStringField("RGB", script);
            var portData = Entry.hw.getDigitalPortValue(script.getNumberField("PORT", script));
            var result = '';
            if(portData.type == Entry.EV3.deviceTypes.Color) {
                if(portData.siValue == 0) {
                    result = '';
                } else {
                    switch(rgb) {
                        case 'RGB':
                            result = Entry.EV3.colorSensorValue[portData.siValue];
                            break;
                        case 'R':
                            result = Entry.EV3.colorSensorValue[portData.siValue].substring(0, 2);
                            break;
                        case 'G':
                            result = Entry.EV3.colorSensorValue[portData.siValue].substring(2, 4);
                            break;
                        case 'B':
                            result = Entry.EV3.colorSensorValue[portData.siValue].substring(4, 6);
                            break;
                    }
                }
            } else {
                result = '컬러 센서 아님';
            }
            return result;
        }
    },
    "ev3_get_sensor_value": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_string_field",
        "statements": [],
        "template": "%1 의 값",
        "params": [{
            "type": "Dropdown",
            "options": [
                ["1", "1"],
                ["2", "2"],
                ["3", "3"],
                ["4", "4"]
            ],
            "value": "1",
            "fontSize": 11
        }],
        "events": {},
        "def": {
            "params": [null],
            "type": "ev3_get_sensor_value"
        },
        "paramsKeyMap": {
            "PORT": 0
        },
        "class": "ev3_sensor",
        "isNotFor": ["EV3"],
        "func": function (sprite, script) {
            var port = script.getStringField("PORT", script);
            var portData = Entry.hw.getDigitalPortValue(script.getNumberField("PORT", script));
            var result;
            if($.isPlainObject(portData)) {
                result = portData.siValue || 0;
            }
            return result;
        }
    },
    "ev3_motor_degrees": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "template": "%1 의 값을 %2 으로  %3 도 만큼 회전 %4",
        "params": [{
            "type": "Dropdown",
            "options": [
                ["A", "A"],
                ["B", "B"],
                ["C", "C"],
                ["D", "D"]
            ],
            "value": "A",
            "fontSize": 11
        }, {
            "type": "Dropdown",
            "options": [
                ["시계방향", "CW"],
                ["반시계방향", "CCW"]
            ],
            "value": "CW",
            "fontSize": 11
        }, {
            "type": "Block",
            "accept": "string"
        }, {
            "type": "Indicator",
            "img": "block_icon/hardware_03.png",
            "size": 12
        }],
        "events": {},
        "def": {
            "params": [null, null, {
                "type": "angle"
            }],
            "type": "ev3_motor_degrees"
        },
        "paramsKeyMap": {
            "PORT": 0,
            "DIRECTION": 1,
            "DEGREE": 2
        },
        "class": "ev3_output",
        "isNotFor": ["EV3"],
        "func": function (sprite, script) {
            var port = script.getStringField("PORT", script);
            var degree = script.getValue("DEGREE", script);
            if(degree <= 0) {
                degree = 0;
            } else if(degree >= 720) {
                degree = 720;
            }
            var direction = script.getStringField("DIRECTION", script);
            Entry.hw.sendQueue[port] = {
                'id': Math.floor(Math.random() * 100000, 0),
                'type': Entry.EV3.motorMovementTypes.Degrees,
                'degree': degree,
                'power': (direction == 'CW') ? 50 : -50
            };
            return script.callReturn();
        }
    },
    "ev3_motor_power": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "template": "%1 의 값을 %2 으로 출력 %3",
        "params": [{
            "type": "Dropdown",
            "options": [
                ["A", "A"],
                ["B", "B"],
                ["C", "C"],
                ["D", "D"]
            ],
            "value": "A",
            "fontSize": 11
        }, {
            "type": "Block",
            "accept": "string"
        }, {
            "type": "Indicator",
            "img": "block_icon/hardware_03.png",
            "size": 12
        }],
        "events": {},
        "def": {
            "params": [null, {
                "type": "number",
                "params": ["50"]
            }],
            "type": "ev3_motor_power"
        },
        "paramsKeyMap": {
            "PORT": 0,
            "VALUE": 1
        },
        "class": "ev3_output",
        "isNotFor": ["EV3"],
        "func": function (sprite, script) {
            var port = script.getStringField("PORT", script);
            var value = script.getValue("VALUE", script);
            Entry.hw.sendQueue[port] = {
                'id': Math.floor(Math.random() * 100000, 0),
                'type': Entry.EV3.motorMovementTypes.Power,
                'power': value,
            };
            return script.callReturn();
        }
    },
    "ev3_motor_power_on_time": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "template": "%1 의 값을 %2 초 동안 %3 으로 출력 %4",
        "params": [{
            "type": "Dropdown",
            "options": [
                ["A", "A"],
                ["B", "B"],
                ["C", "C"],
                ["D", "D"]
            ],
            "value": "A",
            "fontSize": 11
        }, {
            "type": "Block",
            "accept": "string"
        }, {
            "type": "Block",
            "accept": "string"
        }, {
            "type": "Indicator",
            "img": "block_icon/hardware_03.png",
            "size": 12
        }],
        "events": {},
        "def": {
            "params": [null, {
                "type": "number",
                "params": ["2"]
            }, {
                "type": "number",
                "params": ["50"]
            }],
            "type": "ev3_motor_power_on_time"
        },
        "paramsKeyMap": {
            "PORT": 0,
            "TIME": 1,
            "VALUE": 2
        },
        "class": "ev3_output",
        "isNotFor": ["EV3"],
        "func": function (sprite, script) {
            var sq = Entry.hw.sendQueue;
            var port = script.getStringField("PORT", script);
            if (!script.isStart) {
                var time = script.getValue("TIME", script);
                var value = script.getValue("VALUE", script);
                script.isStart = true;
                script.timeFlag = 1;
                Entry.hw.sendQueue[port] = {
                    'id': Math.floor(Math.random() * 100000, 0),
                    'type': Entry.EV3.motorMovementTypes.Power,
                    'power': value
                };
                var timeValue = time * 1000;
                var timer = setTimeout(function() {
                    script.timeFlag = 0;
                    Entry.EV3.removeTimeout(timer);
                }, timeValue);
                Entry.EV3.timeouts.push(timer);
                return script;
            } else if (script.timeFlag == 1) {
                return script;
            } else {
                delete script.isStart;
                delete script.timeFlag;
                Entry.engine.isContinue = false;
                Entry.hw.sendQueue[port] = {
                    'id': Math.floor(Math.random() * 100000, 0),
                    'type': Entry.EV3.motorMovementTypes.Power,
                    'power': 0
                };
                return script.callReturn();
            }
        }
    },
    "ev3_touch_sensor": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_boolean_field",
        "statements": [],
        "template": "%1 의 터치센서가 작동되었는가?",
        "params": [{
            "type": "Dropdown",
            "options": [
                ["1", "1"],
                ["2", "2"],
                ["3", "3"],
                ["4", "4"]
            ],
            "value": "1",
            "fontSize": 11
        }],
        "events": {},
        "def": {
            "params": [null],
            "type": "ev3_touch_sensor"
        },
        "paramsKeyMap": {
            "PORT": 0
        },
        "class": "ev3_sensor",
        "isNotFor": ["EV3"],
        "func": function (sprite, script) {
            var port = script.getStringField("PORT", script);
            var portData = Entry.hw.getDigitalPortValue(script.getNumberField("PORT", script));
            var result = false;
            if(portData.type == Entry.EV3.deviceTypes.Touch) {
                if(Number(portData.siValue) >= 1) {
                    result = true;
                }
            }

            return result;
        }
    },
    "roduino_on_block": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "roduino_on_block"
        },
        "paramsKeyMap": {
        },
        "class": "roduino_value",
        "isNotFor": [ "roborobo_roduino" ],
        "func": function (sprite, script) {
            return "1";
        }
    },
    "roduino_off_block": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "roduino_off_block"
        },
        "paramsKeyMap": {
        },
        "class": "roduino_value",
        "isNotFor": [ "roborobo_roduino" ],
        "func": function (sprite, script) {
            return "0";
        }
    },
    "roduino_get_analog_number": {
        "color": "#00979D",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ '0', "0" ],
                    [ '1', "1" ],
                    [ '2', "2" ],
                    [ '3', "3" ],
                    [ '4', "4" ],
                    [ '5', "5" ]
                ],
                "value": "0",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_HW
            }
        ],
        "events": {},
        "def": {
            "params": [ null ]
        },
        "paramsKeyMap": {
            "PORT": 0
        },
        "func": function (sprite, script) {
            return script.getStringField("PORT");
        }
    },
    "roduino_get_port_number": {
        "color": "#00979D",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ '2', "2" ],
                    [ '3', "3" ],
                    [ '4', "4" ],
                    [ '5', "5" ],
                    [ '6', "6" ],
                    [ '7', "7" ],
                    [ '8', "8" ]
                ],
                "value": "2",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_HW
            }
        ],
        "events": {},
        "def": {
            "params": [ null ]
        },
        "paramsKeyMap": {
            "PORT": 0
        },
        "func": function (sprite, script) {
            return script.getStringField("PORT");
        }
    },
    "roduino_get_analog_value": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "roduino_get_analog_number"
                }
            ],
            "type": "roduino_get_analog_value"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "roduino_value",
        "isNotFor": [ "roborobo_roduino" ],
        "func": function (sprite, script) {
            var signal = parseInt(script.getValue("VALUE", script));
            Entry.Roborobo_Roduino.setSendData([Entry.Roborobo_Roduino.INSTRUCTION.ANALOG_READ, signal]);
            return Entry.hw.getAnalogPortValue(signal);
        }
    },
    "roduino_get_digital_value": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "roduino_get_port_number"
                }
            ],
            "type": "roduino_get_digital_value"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "roduino_value",
        "isNotFor": [ "roborobo_roduino" ],
        "func": function (sprite, script) {
            var signal = script.getNumberValue("VALUE", script);
            Entry.Roborobo_Roduino.setSendData([Entry.Roborobo_Roduino.INSTRUCTION.DIGITAL_READ, signal]);
            return Entry.hw.portData[signal - 2];
        }
    },
    "roduino_get_color": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [Lang.Blocks.roborobo_color_red, "red"],
                    [Lang.Blocks.roborobo_color_green, "green"],
                    [Lang.Blocks.roborobo_color_blue, "blue"],
                    [Lang.Blocks.roborobo_color_yellow, "yellow"]
                ],
                "value": "red",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_HW
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "roduino_get_color"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "roduino_value",
        "isNotFor": [ "roborobo_roduino" ],
        "func": function (sprite, script) {
            var flag = 0;
            var signal = script.getField("VALUE", script);
            var value =
            [
                Entry.hw.portData[Entry.Roborobo_Roduino.ColorPin[0] - 2],
                Entry.hw.portData[Entry.Roborobo_Roduino.ColorPin[1] - 2],
                Entry.hw.portData[Entry.Roborobo_Roduino.ColorPin[2] - 2]
            ];

            switch(signal) {
                case "red":
                    if(value[0] == 1 && value[1] == 0 && value[2] == 0) {
                        flag = 1;
                    }
                break;
                case "green":
                    if(value[0] == 0 && value[1] == 1 && value[2] == 0) {
                        flag = 1;
                    }
                break;
                case "blue":
                    if(value[0] == 0 && value[1] == 0 && value[2] == 1) {
                        flag = 1;
                    }
                break;
                case "yellow":
                    if(value[0] == 1 && value[1] == 1 && value[2] == 1) {
                        flag = 1;
                    }
                break;
            }
            return flag;
        }
    },
    "roduino_set_digital": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Dropdown",
                "options": [
                    [ Lang.Blocks.roborobo_on, "on" ],
                    [ Lang.Blocks.roborobo_off, "off" ]
                ],
                "value": "on",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_HW
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "roduino_get_port_number"
                },
                null,
                null
            ],
            "type": "roduino_set_digital"
        },
        "paramsKeyMap": {
            "VALUE": 0,
            "OPERATOR": 1
        },
        "class": "roduino_set",
        "isNotFor": [ "roborobo_roduino" ],
        "func": function (sprite, script) {
            var pin = script.getNumberValue("VALUE", script);
            var operator = script.getField("OPERATOR");
            var value = operator == "on" ? 1 : 0;

            Entry.Roborobo_Roduino.setSendData([Entry.Roborobo_Roduino.INSTRUCTION.DIGITAL_WRITE, pin, value]);
            return script.callReturn();
        }
    },
    "roduino_motor": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ Lang.Blocks.roborobo_motor1, "motor1" ],
                    [ Lang.Blocks.roborobo_motor2, "motor2" ]
                ],
                "value": "motor1",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_HW
            },
            {
                "type": "Dropdown",
                "options": [
                    [ Lang.Blocks.roborobo_motor_CW, "cw" ],
                    [ Lang.Blocks.roborobo_motor_CCW, "ccw" ],
                    [ Lang.Blocks.roborobo_motor_stop, "stop" ]
                ],
                "value": "cw",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_HW
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                null,
                null
            ],
            "type": "roduino_motor"
        },
        "paramsKeyMap": {
            "MODE": 0,
            "OPERATOR": 1
        },
        "class": "roduino_set",
        "isNotFor": [ "roborobo_roduino" ],
        "func": function (sprite, script) {
            var pin1 = pin2 = 0;
            var value1 = value2 = 0;
            var mode = script.getField("MODE");
            var operator = script.getField("OPERATOR");

            if(mode == "motor1") {
                pin1 = 9;
                pin2 = 10;
            } else {
                pin1 = 11;
                pin2 = 12;
            }

            if (operator == "cw") {
                value1 = 1;
                value2 = 0;
            } else if (operator == "ccw") {
                value1 = 0;
                value2 = 1;
            } else {
                value1 = 0;
                value2 = 0;
            }
            Entry.Roborobo_Roduino.setSendData([Entry.Roborobo_Roduino.INSTRUCTION.MOTOR, pin1, value1, pin2, value2]);
            return script.callReturn();
        }
    },
    "roduino_set_color_pin": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "number",
                    "params": [ "2" ]
                },
                {
                    "type": "number",
                    "params": [ "3" ]
                },
                {
                    "type": "number",
                    "params": [ "4" ]
                },
                null
            ],
            "type": "roduino_set_color_pin"
        },
        "paramsKeyMap": {
            "RED": 0,
            "GREEN": 1,
            "BLUE": 2
        },
        "class": "roduino_set",
        "isNotFor": [ "roborobo_roduino" ],
        "func": function (sprite, script) {
            var redPin = script.getNumberValue("RED", script);
            var greenPin = script.getNumberValue("GREEN", script);
            var bluePin = script.getNumberValue("BLUE", script);

            Entry.Roborobo_Roduino.ColorPin = [ redPin, greenPin, bluePin ];
            Entry.Roborobo_Roduino.setSendData([Entry.Roborobo_Roduino.INSTRUCTION.COLOR, redPin, greenPin, bluePin]);
            return script.callReturn();
        }
    },
    "schoolkit_on_block": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "schoolkit_on_block"
        },
        "paramsKeyMap": {
        },
        "class": "schoolkit_value",
        "isNotFor": [ "roborobo_schoolkit" ],
        "func": function (sprite, script) {
            return "1";
        }
    },
    "schoolkit_off_block": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "schoolkit_off_block"
        },
        "paramsKeyMap": {
        },
        "class": "schoolkit_value",
        "isNotFor": [ "roborobo_schoolkit" ],
        "func": function (sprite, script) {
            return "0";
        }
    },
    "schoolkit_get_out_port_number": {
        "color": "#00979D",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ "OUT1", 2 ],
                    [ "OUT2", 3 ],
                    [ "OUT3", 4 ],
                    [ "OUT4", 5 ],
                    [ "OUT5", 6 ]
                ],
                "value": 2,
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_HW
            }
        ],
        "events": {},
        "def": {
            "params": [ null ]
        },
        "paramsKeyMap": {
            "PORT": 0
        },
        "func": function (sprite, script) {
            return script.getNumberField("PORT");
        }
    },
    "schoolkit_get_in_port_number": {
        "color": "#00979D",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ "IN1", 7 ],
                    [ "IN2", 8 ],
                    [ "IN3", 9 ],
                    [ "IN4", 10 ],
                    [ "IN5", 11 ],
                    [ "IN6", 12 ],
                    [ "IN7", 13 ]
                ],
                "value": 7,
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_HW
            }
        ],
        "events": {},
        "def": {
            "params": [ null ]
        },
        "paramsKeyMap": {
            "PORT": 0
        },
        "func": function (sprite, script) {
            return script.getNumberField("PORT");
        }
    },
    "schoolkit_set_output": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Dropdown",
                "options": [
                    [ Lang.Blocks.roborobo_on, "on" ],
                    [ Lang.Blocks.roborobo_off, "off" ]
                ],
                "value": "on",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_HW
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "schoolkit_get_out_port_number"
                },
                null,
                null
            ],
            "type": "schoolkit_set_output"
        },
        "paramsKeyMap": {
            "VALUE": 0,
            "OPERATOR": 1
        },
        "class": "schoolkit_set",
        "isNotFor": [ "roborobo_schoolkit" ],
        "func": function (sprite, script) {
            var pin = script.getNumberValue("VALUE", script);
            var operator = script.getField("OPERATOR");
            var value = operator == "on" ? 1 : 0;

            Entry.Roborobo_SchoolKit.setSendData([Entry.Roborobo_SchoolKit.INSTRUCTION.DIGITAL_WRITE, pin, value]);
            return script.callReturn();
        }
    },
    "schoolkit_get_input_value": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "schoolkit_get_in_port_number"
                }
            ],
            "type": "schoolkit_get_input_value"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "schoolkit_value",
        "isNotFor": [ "roborobo_schoolkit" ],
        "func": function (sprite, script) {
            var signal = script.getNumberValue("VALUE", script);
            Entry.Roborobo_SchoolKit.setSendData([Entry.Roborobo_SchoolKit.INSTRUCTION.DIGITAL_READ, signal]);
            return Entry.hw.portData[signal - 7];
        }
    },
    "schoolkit_motor": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ Lang.Blocks.roborobo_motor1, "motor1" ],
                    [ Lang.Blocks.roborobo_motor2, "motor2" ]
                ],
                "value": "motor1",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_HW
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Dropdown",
                "options": [
                    [ Lang.Blocks.roborobo_motor_CW, "cw" ],
                    [ Lang.Blocks.roborobo_motor_CCW, "ccw" ],
                    [ Lang.Blocks.roborobo_motor_stop, "stop" ]
                ],
                "value": "cw",
                "fontSize": 11,
                'arrowColor': EntryStatic.ARROW_COLOR_HW
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                {
                    "type": "number",
                    "params": [ "0" ]
                },
                null,
                null
            ],
            "type": "schoolkit_motor"
        },
        "paramsKeyMap": {
            "MODE": 0,
            "VALUE": 1,
            "OPERATOR": 2
        },
        "class": "schoolkit_set",
        "isNotFor": [ "roborobo_schoolkit" ],
        "func": function (sprite, script) {
            var pin = 0;
            var operatorValue = 0;
            var mode = script.getField("MODE");
            var operator = script.getField("OPERATOR");
            var value = script.getNumberValue("VALUE");

            if(mode == "motor1") {
                pin = 7;
            } else {
                pin = 8;
            }
            if(value > 255) {
                value = 255;
            } else if(value < 0) {
                value = 0;
            }

            if (operator == "cw") {
                operatorValue = 1;
                Entry.Roborobo_SchoolKit.setSendData([Entry.Roborobo_SchoolKit.INSTRUCTION.MOTOR, operatorValue, pin, value]);
            } else if (operator == "ccw") {
                operatorValue = 2;
                Entry.Roborobo_SchoolKit.setSendData([Entry.Roborobo_SchoolKit.INSTRUCTION.MOTOR, operatorValue, pin, value]);
            } else if(operator == "stop") {
                Entry.Roborobo_SchoolKit.setSendData([Entry.Roborobo_SchoolKit.INSTRUCTION.MOTOR, operatorValue, pin, value]);
            }
            return script.callReturn();
        }
    },
    "schoolkit_set_servo_value": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                {
                    "type": "schoolkit_get_out_port_number"
                },
                {
                    "type": "number",
                    "params": [ "0" ]
                },
                null
            ],
            "type": "schoolkit_set_servo_value"
        },
        "paramsKeyMap": {
            "PIN": 0,
            "VALUE": 1
        },
        "class": "schoolkit_set",
        "isNotFor": [ "roborobo_schoolkit" ],
        "func": function (sprite, script) {
            var pin = script.getNumberValue("PIN", script);
            var value = script.getNumberValue("VALUE");

            if(value < 0) {
                value = 0;
            } else if(value > 180) {
                value = 180;
            }

            Entry.Roborobo_Roduino.setSendData([Entry.Roborobo_SchoolKit.INSTRUCTION.SERVO, pin, value]);
            return script.callReturn();
        }
    },
    codestar_color_single: {
        color: '#00979D',
        skeleton: 'basic',
        statements: [],
        template: '%1 LED %2 %3',
        params: [{
            type: 'Dropdown',
            options: [[Lang.Hw.leftEye, 7], [Lang.Hw.rightEye, 8]]
        }, {
            type: 'Dropdown',
            options: [[Lang.Blocks.ARDUINO_on,"on"], [Lang.Blocks.ARDUINO_off,"off"]],
        }, {
            type: 'Indicator',
            img: 'block_icon/hardware_03.png',
            size: 12
        }],
        events: {},
        def: {
            params: [7, 'on', null],
            type: 'codestar_color_single'
        },
        paramsKeyMap: {
            PORT: 0,
            ONOFF: 1
        },
        class: 'codestar_output_sensor',
        isNotFor: ['codestar'],
        func: function (sprite, script) {
            var port = script.getField('PORT');
            var onoff = script.getField('ONOFF');
            var value = onoff == 'on' ? 255 : 0;
            Entry.hw.setDigitalPortValue(port, value);
            return script.callReturn();
        }
    },
    codestar_3color: {
        color: '#00979D',
        skeleton: 'basic',
        statements: [],
        template: '3색 LED %1 밝기 %2 %3',
        params: [{
            type: 'Dropdown',
            options: [['빨간색', 9],
                ['초록색', 10],
                ['파란색', 11]]
        }, {
            type: 'Block',
            accept: 'string'
        }, {
            type: 'Indicator',
            img: 'block_icon/hardware_03.png',
            size: 12
        }],
        events: {},
        def: {
            params: [9, {type:'number', params: [120]}, null],
            type: 'codestar_3color'
        },
        paramsKeyMap: {
            PORT: 0,
            VALUE: 1
        },
        class: 'codestar_output_sensor',
        isNotFor: ['codestar'],
        func: function (sprite, script) {
            var port = script.getField('PORT');
            var value = script.getNumberValue('VALUE');
            value = Math.round(value);
            value = Math.max(value, 0);
            value = Math.min(value, 255);
            Entry.hw.setDigitalPortValue(port, value);
            return script.callReturn();
        }
    },
    codestar_vibration: {
        color: '#00979D',
        skeleton: 'basic',
        statements: [],
        template: '진동모터 %1 %2',
        params: [{
            type: 'Dropdown',
            options: [[Lang.Blocks.ARDUINO_on,"on"], [Lang.Blocks.ARDUINO_off,"off"]],
        }, {
            type: 'Indicator',
            img: 'block_icon/hardware_03.png',
            size: 12
        }],
        events: {},
        def: {
            params: ['on', null],
            type: 'codestar_vibration'
        },
        paramsKeyMap: {
            ONOFF: 0
        },
        class: 'codestar_output_sensor',
        isNotFor: ['codestar'],
        func: function (sprite, script) {
            var port = 13;
            var onoff = script.getField('ONOFF');
            var value = onoff == 'on' ? 255 : 0;
            Entry.hw.setDigitalPortValue(port, value);
            return script.callReturn();
        }
    },
    codestar_buzzer: {
        color: '#00979D',
        skeleton: 'basic',
        statements: [],
        template: '부저 톤%1 %2',
        params: [{
            type: 'Dropdown',
            options: [['G3', 1], ['A3', 2], ['B3', 3], ['C4', 4], ['D4', 5], ['E4', 6], ['F4', 7], ['G4', 8], ['A4', 9], ['B4', 10], ['C5', 11], ['D5', 12], ['E5', 13], ['F5', 14]]
        }, {
            type: 'Indicator',
            img: 'block_icon/hardware_03.png',
            size: 12
        }],
        events: {},
        def: {
            params: [4, null],
            type: 'codestar_buzzer'
        },
        paramsKeyMap: {
            TONE: 0
        },
        class: 'codestar_output_sensor',
        isNotFor: ['codestar'],
        func: function (sprite, script) {
            var tone = script.getField('TONE');
            Entry.hw.setDigitalPortValue(15, tone);
            return script.callReturn();
        }
    },
    codestar_buzzer_stop: {
        color: '#00979D',
        skeleton: 'basic',
        statements: [],
        template: '부저 중지 %1',
        params: [{
            type: 'Indicator',
            img: 'block_icon/hardware_03.png',
            size: 12
        }],
        events: {},
        def: {
            params: [null],
            type: 'codestar_buzzer_stop'
        },
        paramsKeyMap: {},
        class: 'codestar_output_sensor',
        isNotFor: ['codestar'],
        func: function (sprite, script) {
            Entry.hw.setDigitalPortValue(15, 24);
            return script.callReturn();
        }
    },
    codestar_servo: {
        color: '#00979D',
        skeleton: 'basic',
        statements: [],
        template: '서버모터 %1 모터값 %2 %3',
        params: [{
            type: 'Dropdown',
            options: [['D3', 'D3'], ['D5', 'D5'], ['D6', 'D6'], ['D9', 'D9'], ['D10', 'D10'], ['D11', 'D11']]
        }, {
            type: 'Block',
            accept: 'string'
        }, {
            type: 'Indicator',
            img: 'block_icon/hardware_03.png',
            size: 12
        }],
        events: {},
        def: {
            params: ['D3', {type:'number', params: [90]}, null],
            type: 'codestar_servo'
        },
        paramsKeyMap: {
            PORT: 0,
            VALUE: 1
        },
        class: 'codestar_motor',
        isNotFor: ['codestar'],
        func: function (sprite, script) {
            var value = script.getNumberValue('VALUE');
            var sq = Entry.hw.sendQueue;
            sq.outport = script.getField('PORT');
            sq.value = 0;
            if(!isNaN(value)){
                var tmp = value;
                if(value < 0) tmp = 0;
                if(value > 255) tmp = 255;
                sq.value = tmp;
            }
            return script.callReturn();
        }
    },
    codestar_drive: {
        color: '#00979D',
        skeleton: 'basic',
        statements: [],
        template: '방향 %1 속도 %2 %3',
        params: [{
            type: 'Dropdown',
            options: [['앞으로', '0'], ['뒤로', '1'], ['왼쪽', '2'], ['오른쪽', '3']]
        }, {
            type: 'Block',
            accept: 'string'
        }, {
            type: 'Indicator',
            img: 'block_icon/hardware_03.png',
            size: 12
        }],
        events: {},
        def: {
            params: ['0', {type:'number', params: [100]}, null],
            type: 'codestar_drive'
        },
        paramsKeyMap: {
            DIRECTION: 0,
            VALUE: 1
        },
        class: 'codestar_motor',
        isNotFor: ['codestar'],
        func: function (sprite, script) {
            var value = script.getNumberValue('VALUE');
            var dir = Number(script.getField('DIRECTION'));
            var id = 0;
            //if(value == 0) value = 1;
            value = Math.round(value);
            value = Math.max(value, 0);
            value = Math.min(value, 255);

            value = Math.round(value/30);
            //if(value == 0) value = 1;
            var query = (id << 7) + (dir << 5) + value;
            Entry.hw.setDigitalPortValue(14, query);
            return script.callReturn();
        }
    },
    codestar_wheel: {
        color: '#00979D',
        skeleton: 'basic',
        statements: [],
        template: '방향 %1 바퀴속도 %2 %3',
        params: [{
            type: 'Dropdown',
            options: [['왼쪽', '0'], ['오른쪽', '1']]
        }, {
            type: 'Block',
            accept: 'string'
        }, {
            type: 'Indicator',
            img: 'block_icon/hardware_03.png',
            size: 12
        }],
        events: {},
        def: {
            params: ['0', {type:'number', params: [100]}, null],
            type: 'codestar_wheel'
        },
        paramsKeyMap: {
            DIRECTION: 0,
            VALUE: 1
        },
        class: 'codestar_motor',
        isNotFor: ['codestar'],
        func: function (sprite, script) {
            var value = script.getNumberValue('VALUE');
            var dir = Number(script.getField('DIRECTION'));
            var id = 1;
            //if(value == 0)value = 1;
            value = Math.round(value);
            value = Math.max(value, -255);
            value = Math.min(value, 255);
            if( value < 0 ){
                dir = 2+dir;
                value *=-1;
            }
            value = Math.round(value/30);
            //if(value == 0) value = 1;
            var query = (id << 7) + (dir << 5) + value;
            Entry.hw.setDigitalPortValue(14, query);
            return script.callReturn();
        }
    },
    codestar_light: {
        color: '#00979D',
        fontColor: '#fff',
        skeleton: 'basic_string_field',
        statements: [],
        template: '밝기센서',
        params: [],
        events: {},
        def: {
            params: [],
            type: 'codestar_light'
        },
        paramsKeyMap: {},
        class: 'codestar_input_sensor',
        isNotFor: ['codestar'],
        func: function (sprite, script) {
            return Entry.hw.getAnalogPortValue('6');
        }
    },
    codestar_button: {
        color: '#00979D',
        fontColor: '#fff',
        skeleton: 'basic_string_field',
        statements: [],
        template: '버튼',
        params: [],
        events: {},
        def: {
            params: [],
            type: 'codestar_button'
        },
        paramsKeyMap: {},
        class: 'codestar_input_sensor',
        isNotFor: ['codestar'],
        func: function (sprite, script) {
            return Entry.hw.getDigitalPortValue('12');
        }
    },
    codestar_ir: {
        color: '#00979D',
        fontColor: '#fff',
        skeleton: 'basic_string_field',
        statements: [],
        template: 'IR %1',
        params: [{
            type: 'Dropdown',
            options: [['A0', '0'], ['A1', '1'], ['A4', '4'], ['A5', '5']]
        }],
        events: {},
        def: {
            params: ['0'],
            type: 'codestar_ir'
        },
        paramsKeyMap: {
            PORT: 0
        },
        class: 'codestar_input_sensor',
        isNotFor: ['codestar'],
        func: function (sprite, script) {
            var port = script.getField('PORT');
            return Entry.hw.getAnalogPortValue(port);
        }
    },
    codestar_sonar: {
        color: '#00979D',
        fontColor: '#fff',
        skeleton: 'basic_string_field',
        statements: [],
        template: '초음파',
        params: [],
        events: {},
        def: {
            params: [],
            type: 'codestar_sonar'
        },
        paramsKeyMap: {},
        class: 'codestar_input_sensor',
        isNotFor: ['codestar'],
        func: function (sprite, script) {
            return Entry.hw.portData.sonar;
        }
    },
    codestar_variable_R: {
        color: '#00979D',
        fontColor: '#fff',
        skeleton: 'basic_string_field',
        statements: [],
        template: '가변저항 %1',
        params: [{
            type: 'Dropdown',
            options: [['A0', '0'], ['A1', '1'], ['A4', '4'], ['A5', '5']]
        }],
        events: {},
        def: {
            params: ['1'],
            type: 'codestar_variable_R'
        },
        paramsKeyMap: {
            PORT: 0
        },
        class: 'codestar_input_sensor',
        isNotFor: ['codestar'],
        func: function (sprite, script) {
            var port = script.getField('PORT');
            return Entry.hw.getAnalogPortValue(port);
        }
    },
    codestar_mic: {
        color: '#00979D',
        fontColor: '#fff',
        skeleton: 'basic_string_field',
        statements: [],
        template: '마이크',
        params: [],
        events: {},
        def: {
            params: [],
            type: 'codestar_mic'
        },
        paramsKeyMap: {},
        class: 'codestar_input_sensor',
        isNotFor: ['codestar'],
        func: function (sprite, script) {
            return Entry.hw.getAnalogPortValue('2');
        }
    },
    codestar_temperature: {
        color: '#00979D',
        fontColor: '#fff',
        skeleton: 'basic_string_field',
        statements: [],
        template: '온도',
        params: [],
        events: {},
        def: {
            params: [],
            type: 'codestar_temperature'
        },
        paramsKeyMap: {},
        class: 'codestar_input_sensor',
        isNotFor: ['codestar'],
        func: function (sprite, script) {
            return Entry.hw.portData.temperature;
        }
    },
    codestar_gyroscope: {
        color: '#00979D',
        fontColor: '#fff',
        skeleton: 'basic_string_field',
        statements: [],
        template: '3축 자이로 %1 축 %2',
        params: [{
            type: 'Dropdown',
            options: [['x', 'x'], ['y', 'y'], ['z', 'z']]
        }, {
            type: 'Indicator',
            size: 11
        }],
        events: {},
        def: {
            params: ['x', null],
            type: 'codestar_gyroscope'
        },
        paramsKeyMap: {
            AXIS: 0
        },
        class: 'codestar_input_sensor',
        isNotFor: ['codestar'],
        func: function (sprite, script) {
            return Entry.hw.getAnalogPortValue('gyro_'+axis);
        }
    },
    codestar_geomagnetic: {
        color: '#00979D',
        fontColor: '#fff',
        skeleton: 'basic_string_field',
        statements: [],
        template: '3축 지자기 %1 축 %2',
        params: [{
            type: 'Dropdown',
            options: [['x', 'x'], ['y', 'y'], ['z', 'z']]
        },{
            type: 'Indicator',
            size: 11
        }],
        events: {},
        def: {
            params: ['x', null],
            type: 'codestar_geomagnetic'
        },
        paramsKeyMap: {
            AXIS: 0
        },
        class: 'codestar_input_sensor',
        isNotFor: ['codestar'],
        func: function (sprite, script) {
            var axis = script.getField('AXIS');
            return Entry.hw.getAnalogPortValue('geo_'+axis);
        }
    },
    codestar_irR: {
        color: '#00979D',
        fontColor: '#fff',
        skeleton: 'basic_string_field',
        statements: [],
        template: 'IR 리모콘',
        params: [],
        events: {},
        def: {
            params: [],
            type: 'codestar_irR'
        },
        paramsKeyMap: {},
        class: 'codestar_input_sensor',
        isNotFor: ['codestar'],
        func: function (sprite, script) {
            return Entry.hw.getDigitalPortValue('4');
        }
    },
    codestar_tilt: {
        color: '#00979D',
        fontColor: '#fff',
        skeleton: 'basic_string_field',
        statements: [],
        template: '틸트',
        params: [],
        events: {},
        def: {
            params: [],
            type: 'codestar_tilt'
        },
        paramsKeyMap: {},
        class: 'codestar_input_sensor',
        isNotFor: ['codestar'],
        func: function (sprite, script) {
            return Entry.hw.getDigitalPortValue('6');
        }
    },
    "smartBoard_get_named_sensor_value": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_string_field",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ "소리", "3" ],
                    [ "빛", "4" ],
                    [ "가변저항", "5" ],
                    [ "확장포트", "2"]
                ],
                "value": "3",
                "fontSize": 11
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "smartBoard_get_named_sensor_value"
        },
        "paramsKeyMap": {
            "PORT": 0
        },
        "class": "smartBoard",
        "isNotFor": [ "smartBoard" ],
        "func": function (sprite, script) {
            return Entry.hw.getAnalogPortValue(script.getField("PORT", script));
        }
    },
    "smartBoard_is_button_pressed": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic_boolean_field",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ "빨간", "12" ],
                    [ "노란", "13" ],
                    [ "초록", "14" ],
                    [ "파랑", "15" ]
                ],
                "value": "12",
                "fontSize": 11
            }
        ],
        "events": {},
        "def": {
            "params": [ null ],
            "type": "smartBoard_is_button_pressed"
        },
        "paramsKeyMap": {
            "PORT": 0
        },
        "class": "smartBoard",
        "isNotFor": [ "smartBoard" ],
        "func": function (sprite, script) {
            return Entry.hw.getDigitalPortValue(script.getNumberField("PORT", script));
        }
    },
    "smartBoard_set_dc_motor_direction": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ "MT1", "4" ],
                    [ "MT2", "7" ],
                ],
                "value": "4",
                "fontSize": 11
            },
            {
                "type": "Dropdown",
                "options": [
                    [ "정", "0" ],
                    [ "역", "255" ],
                ],
                "value": "0",
                "fontSize": 11
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                null
            ],
            "type": "smartBoard_set_dc_motor_direction"
        },
        "paramsKeyMap": {
            "PORT": 0,
            "OPERATOR": 1
        },
        "class": "smartBoard",
        "isNotFor": [ "smartBoard" ],
        "func": function (sprite, script) {
            Entry.hw.setDigitalPortValue(script.getField("PORT"),
                                         script.getNumberField("OPERATOR"));
                                         return script.callReturn();
        }
    },
    "smartBoard_set_dc_motor_speed": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ "MT1", "5" ],
                    [ "MT2", "6" ]
                ],
                "value": "5",
                "fontSize": 11
            },
            {
                "type": "Dropdown",
                "options": [
                    [ "정지 시키기", "0"],
                    [ "매우 느린 속도로 돌리기", "160"],
                    [ "느린 속도로 돌리기", "185" ],
                    [ "보통 속도로 돌리기", "210" ],
                    [ "빠른 속도로 돌리기", "235" ],
                    [ "매우 빠른 속도로 돌리기", "255"]
                ],
                "value": "210",
                "fontSize": 11
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null, null ],
            "type": "smartBoard_set_dc_motor_speed"
        },
        "paramsKeyMap": {
            "PORT": 0,
            "OPERATOR": 1
        },
        "class": "smartBoard",
        "isNotFor": [ "smartBoard" ],
        "func": function (sprite, script) {
            Entry.hw.setDigitalPortValue(script.getField("PORT"),
                                         script.getNumberField("OPERATOR"));
                                         return script.callReturn();
        }
    },
    "smartBoard_set_dc_motor_pwm": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ "MT1", "5" ],
                    [ "MT2", "6" ]
                ],
                "value": "5",
                "fontSize": 11
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                {
                    "type": "arduino_text",
                    "params": [ "255" ]
                },
                null
            ],
            "type": "smartBoard_set_dc_motor_pwm"
        },
        "paramsKeyMap": {
            "PORT": 0,
            "VALUE": 1
        },
        "class": "smartBoard",
        "isNotFor": [ "smartBoard" ],
        "func": function (sprite, script) {
            var port = script.getField("PORT");
            var value = script.getNumberValue("VALUE");
            value = Math.round(value);
            value = Math.max(value, 0);
            value = Math.min(value, 255);
            Entry.hw.setDigitalPortValue(port, value);
            return script.callReturn();
        }
    },
    "smartBoard_set_servo_port_power": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ "SM3", "9" ],
                    [ "SM2", "10" ],
                    [ "SM1", "11" ]
                ],
                "value": "11",
                "fontSize": 11
            },
            {
                "type": "Dropdown",
                "options": [
                    [ "끄기", "2"],
                    [ "어둡게 켜기", "40"],
                    [ "보통 밝기로 켜기    ", "124" ],
                    [ "밝게 켜기", "254" ]
                ],
                "value": "124",
                "fontSize": 11
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null, null ],
            "type": "smartBoard_set_servo_port_power"
        },
        "paramsKeyMap": {
            "PORT": 0,
            "OPERATOR": 1
        },
        "class": "smartBoard",
        "isNotFor": [ "smartBoard" ],
        "func": function (sprite, script) {
            Entry.hw.setDigitalPortValue(script.getField("PORT"),
                                         script.getNumberField("OPERATOR"));
                                         return script.callReturn();
        }
    },
    "smartBoard_set_servo_port_pwm": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ "SM3", "9" ],
                    [ "SM2", "10" ],
                    [ "SM1", "11" ]
                ],
                "value": "9",
                "fontSize": 11
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                {
                    "type": "arduino_text",
                    "params": [ "255" ]
                },
                null
            ],
            "type": "smartBoard_set_servo_port_pwm"
        },
        "paramsKeyMap": {
            "PORT": 0,
            "VALUE": 1
        },
        "class": "smartBoard",
        "isNotFor": [ "smartBoard" ],
        "func": function (sprite, script) {
            var port = script.getField("PORT"); //script.getNumberValue("PORT");
            var value = script.getNumberValue("VALUE");
            value = Math.round(value);
            if(value%2 == 1) value = value + 1;
            value = Math.max(value, 2);
            value = Math.min(value, 254);
            Entry.hw.setDigitalPortValue(port, value);
            return script.callReturn();
        }
    },
    "smartBoard_set_servo_speed": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ "SM3", "9" ],
                    [ "SM2", "10" ],
                    [ "SM1", "11" ]
                ],
                "value": "9",
                "fontSize": 11
            },
            {
                "type": "Dropdown",
                "options": [
                    [ "느린 속도로", "193" ],
                    [ "보통 속도로", "201" ],
                    [ "빠른 속도로", "243" ]
                ],
                "value": "193",
                "fontSize": 11
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [ null, null, null ],
            "type": "smartBoard_set_servo_speed"
        },
        "paramsKeyMap": {
            "PORT": 0,
            "OPERATOR": 1
        },
        "class": "smartBoard",
        "isNotFor": [ "smartBoard" ],
        "func": function (sprite, script) {
            Entry.hw.setDigitalPortValue(script.getField("PORT"),
                                         script.getNumberField("OPERATOR"));
            if (!script.isStart) {
                script.isStart = true;
                script.timeFlag = 1;
                setTimeout(function() {
                    script.timeFlag = 0;
                }, 250);
                return script;
            } else if (script.timeFlag == 1) {
                return script;
            } else {
                delete script.timeFlag;
                delete script.isStart;
                return script.callReturn();
            }
        }
    },
    "smartBoard_set_servo_angle": {
        "color": "#00979D",
        "skeleton": "basic",
        "statements": [],
        "params": [
            {
                "type": "Dropdown",
                "options": [
                    [ "SM3", "9" ],
                    [ "SM2", "10" ],
                    [ "SM1", "11" ]
                ],
                "value": "9",
                "fontSize": 11
            },
            {
                "type": "Block",
                "accept": "string"
            },
            {
                "type": "Indicator",
                "img": "block_icon/hardware_03.png",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                null,
                {
                    "type": "arduino_text",
                    "params": [ "180" ]
                },
                null
            ],
            "type": "smartBoard_set_servo_angle"
        },
        "paramsKeyMap": {
            "PORT": 0,
            "VALUE": 1
        },
        "class": "smartBoard",
        "isNotFor": [ "smartBoard" ],
        "func": function (sprite, script) {
            var port = script.getField("PORT"); //script.getNumberValue("PORT");
            var value = script.getNumberValue("VALUE");
            value = Math.round(value);
            if( value%2 == 0 ) value = value + 1;
            value = Math.max(value, 1);
            value = Math.min(value, 179);
            Entry.hw.setDigitalPortValue(port, value);
            return script.callReturn();
        }
    },
    "smartBoard_set_number_eight_pin": {
        "color": "#00979D",
        "fontColor": "#fff",
        "skeleton": "basic",
        "statements": [],
        "params": [{
            "type": "Dropdown",
            "options": [
                [ "끄기", "0"],
                [ "켜기", "255"]
            ],
            "value": "255",
            "fontSize": 11
        }, {
            "type": "Indicator",
            "img": "block_icon/hardware_03.png",
            "size": 12
        }],
        "def": {
            "params": [ null ],
            "type": "smartBoard_set_number_eight_pin"
        },
        "paramsKeyMap": {
            "OPERATOR": 0
        },
        "class": "smartBoard",
        "isNotFor": ["smartBoard"],
        "func": function (sprite, script) {
            Entry.hw.setDigitalPortValue(8, script.getNumberField("OPERATOR"));
            return script.callReturn();
        }
    },
    "hidden": {
        "color": "#7C7C7C",
        "skeleton": "basic",
        "template": "         ?       %1",
        "statements": [],
        "params": [
            {
                "type": "Indicator",
                "color": "#6B6B6B",
                "size": 12
            }
        ],
        "events": {},
        "def": {
            "params": [
                null
            ],
            "type": "hidden"
        },
        "paramsKeyMap": {
            "VALUE": 0
        },
        "class": "etc",
        "isNotFor": [],
        "func": function (sprite, script) {
        }
    }
};

(function() {
    for (var type in Entry.block) {
        var block = Entry.block[type];
        if (block.parent) {
            var f = function() {};
            f.prototype = Entry.block[block.parent];
            var schema = new f();
            for (var key in block) {
                schema[key] = block[key];
            }
            Entry.block[type] = schema;
        }
    }
})();

if (typeof exports == "object") {
    exports.block = Entry.block;
}
