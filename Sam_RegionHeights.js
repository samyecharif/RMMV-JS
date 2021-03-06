"use strict";
// =============================================================================
// REGION HEIGHTS
// =============================================================================
//
// =============================================================================
// Software: RPG MAKER MV
// FileName: Sam_RegionHeights.js
// Author: Sam
// =============================================================================
//
// =============================================================================
// Versions:
// 1.0 - 24/07/2018
// 		 beta
//
// 1.1 - 25/07/2018
//       added some usefull functions
//
// 1.2 - 25/07/2018
//       player will automatically fall when going into lower heights
//
// 1.3 - 26/07/2018
//       added some parameters: FallSpeed, AutoFall
//
// 1.4 - 27/07/2019
//       added OverWrite parameter
//
// 1.5 - 30/07/2018
//       brand new way of handling movements using moveRoutes !
//
// 1.6 - 03/08/2018
//       added Ground Change Common Events
//       ability to call a common event when going into or leaving a ground
//
// 1.7 - 03/08/2018
//       added ladder grounds (RegionG = 9)
//
// 1.8 - 07/08/2018
//       player can now dash
//       added DashSpeed parameter
//       added AutoClimb parameter
//       added some plugin commands
//
// 1.9 - 08/08/2018
//       it's now possible to change animations
//       (walking, jumping, falling, dashing)
//
// 2.0 - 08/08/2018
//       better way of handling ground change common events
//       you can show an animation during the dash
//
// 2.1 - 11/08/2018
//       player can't Jump/Dash while jumping/dashing/climbing/falling
//
// 3.0 - 12/08/2018
//       ES6 : class, arrow functions, ...
//
// 3.1 - 14/08/2018
//       changed action order :
//       player will try to climb first and jump after
//
// 4.0 - 18/08/2018
//       locking events !
// =============================================================================
//

var Imported = Imported || {};
Imported.Sam_RegionHeights = true;

var Sam = Sam || {};
Sam.RH = Sam.RH || {};
Sam.RH.version = 4.0;

//
// =============================================================================
/*:
 *
 * @plugindesc Region Heights - Use regions to define map's different heights
 * Altitudes des régions - Définit les niveaux de la maps avec les régions
 *
 * @author Sam
 *
 * @param NormalSpeed
 * @desc Define how fast the player walks
 * Définit la vitesse de marche
 * @default 4
 * @type number
 *
 * @param FallSpeed
 * @desc Define how fast the player must fall
 * Définit la vitesse de chute
 * @default 6
 * @type number
 *
 * @param DashSpeed
 * @desc Define how fast the player must fall
 * Définit la vitesse de chute
 * @default 8
 * @type number
 *
 * @param AutoFall
 * @desc Player will fall automatically when going into lower regions
 * Le joueur tombe quand il se rend dans des niveaux plus bas
 * @default false
 * @type boolean
 *
 * @param AutoClimb
 * @desc Player will automatically climb when going into higher regions
 * Le joueur escalade quand il se rend dans des niveaux plus hauts
 * @default false
 * @type boolean
 *
 * @param OverWrite
 * @desc OverWrite "Game_Player.prototype.canPass" ?
 * @default true
 * @type boolean
 *
 * @param Dash Animation
 * @desc 
 * @default 0
 * @type number
 *
 * =============================================================================
 * @param ==========================
 * @default ========================== 
 * =============================================================================
 *
 * @param Animations
 * @default
 * @type file
 * @dir img/characters
 * 
 * @param Dash
 * @parent Animations
 * @desc Walking animation
 * @default 0
 * @type number
 * @min 0
 * @max 7
 * @decimals 0
 * 
 * @param Down
 * @parent Animations
 * @desc Walking animation
 * @default 1
 * @type number
 * @min 0
 * @max 7
 * @decimals 0
 * 
 * @param Fall
 * @parent Animations
 * @desc Walking animation
 * @default 2
 * @type number
 * @min 0
 * @max 7
 * @decimals 0
 * 
 * @param Jump
 * @parent Animations
 * @desc Walking animation
 * @default 3
 * @type number
 * @min 0
 * @max 7
 * @decimals 0
 * 
 * @param Run
 * @parent Animations
 * @desc Walking animation
 * @default 4
 * @type number
 * @min 0
 * @max 7
 * @decimals 0
 * 
 * @param Spec
 * @parent Animations
 * @desc Walking animation
 * @default 5
 * @type number
 * @min 0
 * @max 7
 * @decimals 0
 * 
 * @param Idle
 * @parent Animations
 * @desc Walking animation
 * @default 6
 * @type number
 * @min 0
 * @max 7
 * @decimals 0
 * 
 * @param Walk
 * @parent Animations
 * @desc Walking animation
 * @default 7
 * @type number
 * @min 0
 * @max 7
 * @decimals 0
 *
 * =============================================================================
 * @param ==========================
 * @default ==========================
 * =============================================================================
 *
 * @param Ground Change Events
 * @default
 *
 * @param Ground Change To 0
 * @parent Ground Change Events
 * @type common_event 
 * @desc The common event to call when going to this ground.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Ground Change From 0
 * @parent Ground Change Events
 * @type common_event
 * @desc The common event to call when leaving this ground.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Ground Change To 1
 * @parent Ground Change Events
 * @type common_event 
 * @desc The common event to call when going to this ground.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Ground Change From 1
 * @parent Ground Change Events
 * @type common_event
 * @desc The common event to call when leaving this ground.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Ground Change To 2
 * @parent Ground Change Events
 * @type common_event 
 * @desc The common event to call when going to this ground.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Ground Change From 2
 * @parent Ground Change Events
 * @type common_event
 * @desc The common event to call when leaving this ground.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Ground Change To 3
 * @parent Ground Change Events
 * @type common_event 
 * @desc The common event to call when going to this ground.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Ground Change From 3
 * @parent Ground Change Events
 * @type common_event
 * @desc The common event to call when leaving this ground.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Ground Change To 4
 * @parent Ground Change Events
 * @type common_event 
 * @desc The common event to call when going to this ground.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Ground Change From 4
 * @parent Ground Change Events
 * @type common_event
 * @desc The common event to call when leaving this ground.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Ground Change To 5
 * @parent Ground Change Events
 * @type common_event 
 * @desc The common event to call when going to this ground.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Ground Change From 5
 * @parent Ground Change Events
 * @type common_event
 * @desc The common event to call when leaving this ground.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Ground Change To 6
 * @parent Ground Change Events
 * @type common_event 
 * @desc The common event to call when going to this ground.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Ground Change From 6
 * @parent Ground Change Events
 * @type common_event
 * @desc The common event to call when leaving this ground.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Ground Change To 7
 * @parent Ground Change Events
 * @type common_event 
 * @desc The common event to call when going to this ground.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Ground Change From 7
 * @parent Ground Change Events
 * @type common_event
 * @desc The common event to call when leaving this ground.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Ground Change To 8
 * @parent Ground Change Events
 * @type common_event 
 * @desc The common event to call when going to this ground.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Ground Change From 8
 * @parent Ground Change Events
 * @type common_event
 * @desc The common event to call when leaving this ground.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Ground Change To 9
 * @parent Ground Change Events
 * @type common_event 
 * @desc The common event to call when going to this ground.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @param Ground Change From 9
 * @parent Ground Change Events
 * @type common_event
 * @desc The common event to call when leaving this ground.
 * Set to 0 if you don't wish for a common event to call.
 * @default 0
 *
 * @help
 * =============================================================================
 *                         Region Heights (EN)
 * =============================================================================
 *
 * This plugin will allow you to use regions to define the different heights 
 * of your maps.
 *
 * HOW DOES IT WORK ?
 *
 * The first digits of each region defines the elevation of the region.
 * We will call this the Region Height or RegionZ.
 *
 * The last digit defines the type of ground of the region.
 * We will call this the Region Ground or RegionG.
 *
 * Region Grounds can be used at you convenience, 
 * Nevertheless, note that :
 *  - Region Ground 5 is used for half heights : the elevation between 
 *    2 altitudes (for exaple stairs, ramps, ...)
 *  - Region Ground 9 is used for ladders, cords, ...
 *
 * For example I could decide to use RegionG 0 for normal grounds 
 * (by default),
 * And RegionG 1 for water regions.
 * Regions 10, 20, 30, ... will be normal grounds at heights 1, 2, 3, ...
 * And regions 11, 21, 31, ... will be water grounds at same heights 
 * (1, 2, 3, ...)
 *
 * /!\ IMPORTANT /!\
 * Region 0 MUST ONLY be used for walls
 * Note that you can also use no regions in that case.
 *
 * 
 * To get the height of a region you can use this function :
 * Sam.RH.RegionZ(regionId)
 * Which basically does this :
 * Math.floor(regionId / 10.);
 * 
 * To get the last digit you can use this function :
 * Sam.RH.RegionG(RegionId)
 * Which basically does this :
 * RegionId - Math.floor(regionId / 10.) * 10
 *
 *
 * =============================================================================
 *                     Altitudes des régions (FR)
 * =============================================================================
 * 
 * Ce module a pour but d'associer chaque régions à différentes altitudes, 
 * afin de donner un semblant de relief à votre map.
 * Le fonctionnement est le suivant :
 * Les premiers chiffres de chaque région définissent la hauteur du terrain.
 * Le dernier chiffre peut être utiliser comme bon vous semble, 
 * Avec pour exception le chiffre 5, utilisé pour définir le niveau entre 
 * 2 altitudes (par exemple des escaliers, une rampe, ...)
 * Par example la région 25 est utilisée pour des escaliers entre 
 * la région 10 et la région 20.
 * 
 * Par exmple, par défaut le dernier chiffre est utilisé pour 
 * les terrains "normaux"
 * Je peux décider d'utiliser le chiffre 1 pour les terrains aquatiques. 
 * Ce qui me donnerait :
 * Les régions 10, 20, 30, ... pour les terrains basiques 
 * d'altitudes 1, 2, 3, ...
 * Et les régions 11, 21, 31, ... pour les terrains aquatiques 
 * de mêmes altitudes (1, 2, 3, ...)
 *
 *
 *=============================================================================
 *                         How to use commands (EN) 
 * =============================================================================
 * 
 * To use the different commands, I advocate that you use some plugin 
 * to bind common events to buttons
 * For example YEP_ButtonCommonEvents suits really well
 * All those commands can be uses inside scripts or plugin commands 
 * as following :
 *
 * 
 * =============================================================================
 *                   Comment utiliser les commandes (FR) 
 * =============================================================================
 * 
 * Pour utiliser les différentes commandes, je vous conseile d'utiliser 
 * un module pour lier vos évènements communs à des boutons.
 * Toutes ces commandes peuvent être utilisées en tant que scripts
 * ou commandes de modules de cette manière :
 *
 *
 * =============================================================================
 *                                COMMANDS
 * =============================================================================
 *
 * /// JUMP ///
 *
 * desc :           Character will make a smart jump of 0, 1 or 2 tiles 
 *                  and fall down if he has to.
 *
 * script :         $gamePlayer.Sam_RH_Jump();
 * plugin command : Sam_RH_Jump
 *
 *
 * /// FALL DOWN ///
 * 
 * desc :           Character will try to fall down a cliff if possible
 *
 * script :         $gamePlayer.Sam_RH_FallDown();
 * plugin command : Sam_RH_FallDown
 *
 * 
 * /// CLIMB UP ///
 *
 * desc :           Character will try to climb a cliff if possible
 *
 * script :         $gamePlayer.Sam_RH_ClimbUp();
 * plugin command : Sam_RH_ClimbUp
 *
 *
 * /// TILE ///
 *
 * desc :           Get tile info
 *
 * script :         $gamePlayer.Sam_RH_getTile(x, y);
 * plugin command : Sam_RH_getTile x y
 *
 *
 * /// GET INFO ///
 *
 * desc :           Will give you some informations about the character
 *
 * script :         $gamePlayer.Sam_RH_getInfo();
 * plugin command : Sam_RH_getInfo
 *
 *
 * =============================================================================
 *                   PLUGIN REGION HEIGHTS BY SAM 
 * =============================================================================
 */

//

(function() {
	// =============================================================================
	// Parameters
	// =============================================================================

	Sam.RH.parameters = PluginManager.parameters("Sam_RegionHeights");

	Sam.RH.NormalSpeed = Number(Sam.RH.parameters["NormalSpeed"]);
	Sam.RH.FallSpeed = Number(Sam.RH.parameters["FallSpeed"]);
	Sam.RH.DashSpeed = Number(Sam.RH.parameters["DashSpeed"]);

	Sam.RH.AutoFall = Sam.RH.parameters["AutoFall"] == "true";
	Sam.RH.AutoClimb = Sam.RH.parameters["AutoClimb"] == "true";

	Sam.RH.OverWrite = Sam.RH.parameters["OverWrite"] == "true";

	Sam.RH.DashAnimation = Number(Sam.RH.parameters["Dash Animation"]);

	Sam.RH.Anim_Dash = Sam.RH.parameters["Dash"];
	Sam.RH.Anim_Down = Sam.RH.parameters["Down"];
	Sam.RH.Anim_Fall = Sam.RH.parameters["Fall"];
	Sam.RH.Anim_Jump = Sam.RH.parameters["Jump"];
	Sam.RH.Anim_Run = Sam.RH.parameters["Run"];
	Sam.RH.Anim_Spec = Sam.RH.parameters["Spec"];
	Sam.RH.Anim_Idle = Sam.RH.parameters["Idle"];
	Sam.RH.Anim_Walk = Sam.RH.parameters["Walk"];

	// =============================================================================
	// Direction
	// =============================================================================

	const directionXY = d => {
		return {
			x: ((d - 1) % 3) - 1,
			y: 1 - Math.trunc((d - 1) / 3)
		};
	};

	// const playerDirection = () => {
	// 	return directionXY($gamePlayer.direction());
	// };

	// =============================================================================
	// Class
	// =============================================================================

	class Tile {
		constructor(x, y) {
			this.x = x;
			this.y = y;
			this.region = new Region(x, y);
			// this.eventz =
			this.id = this.region.id;
			this.z = this.region.z; // TO be changed (add eventz)
			this.g = this.region.g;
		}

		NearbyTile(d) {
			const dx = directionXY(d).x;
			const dy = directionXY(d).y;
			return new Tile(this.x + dx, this.y + dy);
		}

		JumpingTile(d) {
			switch (d) {
				case 2:
					return new Tile(this.x, this.y + 2);
					break;
				case 4:
					return new Tile(this.x - 2, this.y);
					break;
				case 6:
					return new Tile(this.x + 2, this.y);
					break;
				case 8:
					return new Tile(this.x, this.y - 2);
					break;
			}
		}

		ClimbingTile(d) {
			switch (d) {
				case 2:
					return this.NearbyTile(2);
					break;
				case 4:
					return this.NearbyTile(7);
					break;
				case 6:
					return this.NearbyTile(9);
					break;
				case 8:
					return this.JumpingTile(8);
					break;
			}
		}

		FallingTile(d) {
			switch (d) {
				case 2:
					return this.NearbyTile(2);
					break;
				case 4:
					return this.NearbyTile(1);
					break;
				case 6:
					return this.NearbyTile(3);
					break;
				case 8:
					return this.NearbyTile(8);
					break;
			}
		}
	}

	class Region {
		constructor(x, y) {
			this.id = $gameMap.regionId(x, y);
			this.z = Math.floor(this.id / 10);
			this.g = this.id - this.z * 10;
		}
	}

	// =============================================================================
	// getTile
	// =============================================================================

	Game_CharacterBase.prototype.Tile = function() {
		return new Tile(this.x, this.y);
	};

	Game_CharacterBase.prototype.NearbyTile = function(d) {
		return this.Tile().NearbyTile(d);
	};

	Game_CharacterBase.prototype.LookingTile = function() {
		return this.Tile().NearbyTile(this.direction());
	};

	Game_CharacterBase.prototype.JumpingTile = function() {
		return this.Tile().JumpingTile(this.direction());
	};

	Game_CharacterBase.prototype.ClimbingTile = function() {
		return this.Tile().ClimbingTile(this.direction());
	};

	Game_CharacterBase.prototype.FallingTile = function() {
		return this.Tile().FallingTile(this.direction());
	};

	// =============================================================================
	// Event Id/IdZ/TileZ
	// =============================================================================

	// Sam.RH.eventId = (pos) {
	// 	return $gameMap.eventIdXy(x, y);
	// };

	// Sam.RH.eventIdZ = (eventId) {
	// 	return eventId ? Number($dataMap.events[eventId].meta.height) : 0;
	// };

	// Sam.RH.eventTileZ = (pos) {
	// 	return this.eventIdZ(this.eventId(pos));
	// };

	// =============================================================================
	// Region Z
	// =============================================================================

	// Sam.RH.RegionZ = (pos) {
	// 	for (var i = 1; i <= 3; i++) {
	// 		var eventTile = this.Tile(x, y + i);
	// 		var eventId = this.eventId(eventTile);
	// 		if (eventId) {
	// 			var eventZ = this.eventIdZ(eventId);
	// 			if (
	// 				eventZ > 0 &&
	// 				eventZ <= i &&
	// 				$dataMap.events[eventId].meta.pillar
	// 			) {
	// 				var posZ = {
	// 					x: x,
	// 					y: y + eventZ
	// 				};
	// 				return eventZ + this.TileZ(posZ);
	// 			}
	// 		}
	// 	}
	// 	var eventTile = this.Tile(x, y);
	// 	var eventId = this.eventId(eventTile);
	// 	if (eventId) {
	// 		var eventZ = this.eventIdZ(eventId);
	// 		if (eventZ > 0 && $dataMap.events[eventId].meta.platform) {
	// 			return eventZ;
	// 		}
	// 	}
	// 	return this.TileZ(pos);
	// };

	// =============================================================================
	// Ground Change
	// =============================================================================

	Sam.RH.GroundChange = (tileG1, tileG2) => {
		if (tileG1 != tileG2) {
			console.log("ground changed from " + tileG1 + " To " + tileG2);

			const CommonEventId1 = Number(
				Sam.RH.parameters["Ground Change From " + tileG1]
			);
			if (CommonEventId1 != 0) {
				console.log("call", CommonEventId1);
				$gameTemp.reserveCommonEvent(CommonEventId1);
			}

			const CommonEventId2 = Number(
				Sam.RH.parameters["Ground Change To " + tileG2]
			);
			if (CommonEventId2 != 0) {
				console.log("call", CommonEventId2);
				$gameTemp.reserveCommonEvent(CommonEventId2);
			}
		}
	};

	// =============================================================================
	// canPass
	// =============================================================================

	// OVERWRITE
	Game_CharacterBase.prototype.canPass = function(x, y, d) {
		return this.Sam_RH_canPass(x, y, d);
	};

	Game_CharacterBase.prototype.canPassTile = function(x, y) {
		return this.Sam_RH_canPass(this.direction());
	};

	Game_CharacterBase.prototype.Sam_RH_canPass = function(x, y, d) {
		// return true;
		// console.log("canPass ?");
		const tile1 = new Tile(x, y);
		const tile2 = new Tile(
			$gameMap.roundXWithDirection(x, d),
			$gameMap.roundYWithDirection(y, d)
		);

		if (this.isThrough() || this.isDebugThrough()) {
			return true;
		}

		// Calculate height (z) difference
		const dZ = tile2.z - tile1.z;
		const adId = Math.abs(tile2.id - tile1.id);

		if (!$gameMap.isValid(tile2.x, tile2.y)) {
			return false;
		}

		if (tile2.id == 255) {
			return false;
		}
		if (this.isCollidedWithCharacters(tile2.x, tile2.y)) {
			return false;
		}

		if (tile2.z == 0 && d != 2) {
			return false;
		}

		if (adId != 5 && (tile1.g != 9 && tile2.g != 9)) {
			if (dZ != 0) {
				return false;
			}
		}

		return true;
	};

	Game_Player.prototype.Sam_RH_canPass = function(x, y, d) {
		// return true;
		// console.log("canPass ?");
		const tile1 = new Tile(x, y);
		const tile2 = new Tile(
			$gameMap.roundXWithDirection(x, d),
			$gameMap.roundYWithDirection(y, d)
		);

		if (this.isThrough() || this.isDebugThrough()) {
			Sam.RH.GroundChange(tile1.g, tile2.g);
			return true;
		}

		// Calculate height (z) difference
		const dZ = tile2.z - tile1.z;
		const adId = Math.abs(tile2.id - tile1.id);
		// dZ = 0 : same height
		// adZ = .5 : stairs

		// AutoClimb
		if (tile2.z != tile1.z) {
			if (adId != 5 && (tile1.g != 9 && tile2.g != 9)) {
				if (tile1.id != 0) {
					if (Sam.RH.AutoClimb) {
						this.setDirection(d);
						this.Sam_RH_ClimbUp();
					}
				}
			}
		}

		// Platforms - To be finished
		// var eventId = Sam.RH.eventId(pos2);
		// if ($dataMap.events[eventId]) {
		// 	if ($dataMap.events[eventId].meta.platform) {
		// 		var eventZ = Sam.RH.eventTileZ(pos2);
		// 		if (TileZ1 < eventZ) {
		// 			$gameMap.event(eventId).setPriorityType(2);
		// 			return true;
		// 		} else {
		// 			$gameMap.event(eventId).setPriorityType(0);
		// 			return true;
		// 		}
		// 	}
		// }

		if (!$gameMap.isValid(tile2.x, tile2.y)) {
			return false;
		}

		if (tile2.id == 255) {
			return false;
		}
		if (this.isCollidedWithCharacters(tile2.x, tile2.y)) {
			return false;
		}

		if (tile2.z == 0 && d != 2) {
			return false;
		}

		if (adId != 5 && (tile1.g != 9 && tile2.g != 9)) {
			if (dZ != 0) {
				if (dZ < 0) {
					if (Sam.RH.AutoFall) {
						this.setDirection(d);
						this.Sam_RH_FallDown();
					}
				}
				return false;
			}
		}

		Sam.RH.GroundChange(tile1.g, tile2.g);
		return true;
	};

	// =============================================================================
	// MoveCommands
	// =============================================================================

	class Route {
		constructor(list = [], skippable = true, repeat = false, wait = true) {
			this.moveRoute = {
				list: list,
				skippable: skippable,
				repeat: repeat,
				wait: wait
			};
		}

		start() {
			this.moveRoute.list = this.moveRoute.list.concat([
				{ code: Game_Character.ROUTE_THROUGH_ON },
				{ code: Game_Character.ROUTE_WALK_ANIME_OFF },
				{ code: Game_Character.ROUTE_DIR_FIX_ON }
			]);
		}

		jump(jumpx, jumpy) {
			this.moveRoute.list = this.moveRoute.list.concat([
				{
					code: Game_Character.ROUTE_CHANGE_IMAGE,
					parameters: [$gamePlayer.characterName(), Sam.RH.Anim_Jump]
				},
				{
					code: Game_Character.ROUTE_JUMP,
					parameters: [jumpx, jumpy]
				}
			]);
		}

		beforeDash() {
			this.moveRoute.list = this.moveRoute.list.concat([
				{
					code: Game_Character.ROUTE_CHANGE_SPEED,
					parameters: [Sam.RH.DashSpeed]
				},
				{
					code: Game_Character.ROUTE_CHANGE_IMAGE,
					parameters: [$gamePlayer.characterName(), Sam.RH.Anim_Dash]
				}
			]);
		}

		animation(animation) {
			this.moveRoute.list = this.moveRoute.list.concat([
				{
					code: Game_Character.ROUTE_SCRIPT,
					parameters: [
						"$gamePlayer.requestAnimation(" + animation + ");"
					]
				}
			]);
		}

		dash(dash) {
			// Add moveCommand Dash
			if (dash >= 1) {
				this.moveRoute.list = this.moveRoute.list.concat([
					{ code: Game_Character.ROUTE_MOVE_FORWARD }
				]);
			}
			if (dash >= 2) {
				this.moveRoute.list = this.moveRoute.list.concat([
					{ code: Game_Character.ROUTE_MOVE_FORWARD }
				]);
			}
		}

		beforeFall() {
			this.moveRoute.list = this.moveRoute.list.concat([
				{
					code: Game_Character.ROUTE_CHANGE_SPEED,
					parameters: [Sam.RH.FallSpeed]
				},
				{
					code: Game_Character.ROUTE_CHANGE_IMAGE,
					parameters: [$gamePlayer.characterName(), Sam.RH.Anim_Fall]
				}
			]);
		}

		fall() {
			let playerZ = this.startTile.z;

			if ($gamePlayer.direction() == 8) {
				if (
					playerZ > this.endTile.NearbyTile(2).z &&
					playerZ > this.endTile.z
				) {
					this.moveRoute.list = this.moveRoute.list.concat([
						{ code: Game_Character.ROUTE_THROUGH_ON },
						{ code: Game_Character.ROUTE_MOVE_DOWN }
					]);
				}
			} else {
				while (
					this.endTile.id == 0 ||
					(playerZ > this.endTile.NearbyTile(2).z &&
						playerZ > this.endTile.z)
				) {
					this.moveRoute.list = this.moveRoute.list.concat([
						{ code: Game_Character.ROUTE_MOVE_DOWN }
					]);
					this.endTile = new Tile(this.endTile.x, this.endTile.y + 1);
					playerZ -= 1;

					if (playerZ < 0) break;
				}
			}
		}

		finish() {
			console.log("afterFall");
			this.moveRoute.list = this.moveRoute.list.concat([
				{
					code: Game_Character.ROUTE_CHANGE_IMAGE,
					parameters: [$gamePlayer.characterName(), Sam.RH.Anim_Walk]
				},
				{ code: Game_Character.ROUTE_THROUGH_OFF },
				{ code: Game_Character.ROUTE_WALK_ANIME_ON },
				{ code: Game_Character.ROUTE_DIR_FIX_OFF },
				{
					code: Game_Character.ROUTE_CHANGE_SPEED,
					parameters: [Sam.RH.NormalSpeed]
				}
			]);
		}

		changeGroundCommands(tileG1, tileG2) {
			console.log("Hi");

			if (tileG1 != tileG2) {
				console.log("ground changed from " + tileG1 + " To " + tileG2);

				const CommonEventId1 = Number(
					Sam.RH.parameters["Ground Change From " + tileG1]
				);
				if (CommonEventId1 != 0) {
					this.moveRoute.list = this.moveRoute.list.concat([
						{
							code: Game_Character.ROUTE_SCRIPT,
							parameters: [
								"$gameTemp.reserveCommonEvent(" +
									CommonEventId1 +
									");"
							]
						}
					]);
				}

				const CommonEventId2 = Number(
					Sam.RH.parameters["Ground Change To " + tileG2]
				);
				if (CommonEventId2 != 0) {
					this.moveRoute.list = this.moveRoute.list.concat([
						{
							code: Game_Character.ROUTE_SCRIPT,
							parameters: [
								"$gameTemp.reserveCommonEvent(" +
									CommonEventId2 +
									");"
							]
						}
					]);
				}
			}
		}

		end() {
			console.log("end");
			this.moveRoute.list = this.moveRoute.list.concat([
				{ code: Game_Character.ROUTE_END }
			]);
		}
	}

	// =============================================================================
	// MoveRoute Jumping & Falling
	// =============================================================================

	Sam.RH.moveRouteJump = (jumpx, jumpy, fall = true) => {
		// Create moveRoute
		let route = new Route();

		route.startTile = $gamePlayer.Tile();
		route.endTile = new Tile(
			route.startTile.x + jumpx,
			route.startTile.y + jumpy
		);

		// Start moveCommands
		route.start();

		// Add moveCommand Jump
		route.jump(jumpx, jumpy);

		// Add moveCommand Fall
		if (fall) {
			route.beforeFall();
			route.fall();
		}

		route.finish();

		// Change Ground Common Events
		route.changeGroundCommands(route.startTile.g, route.endTile.g);

		// End moveCommands
		route.end();

		// set moveRoute
		if (!$gamePlayer.isMoveRouteForcing())
			$gamePlayer.forceMoveRoute(route.moveRoute);
	};

	// =============================================================================
	// MoveRoute Dashing & Falling
	// =============================================================================

	Sam.RH.moveRouteDash = dash => {
		// Create moveRoute
		let route = new Route();

		route.startTile = $gamePlayer.Tile();

		route.endTile = route.startTile;
		if (dash == 1) {
			route.endTile = $gamePlayer.LookingTile();
		} else if (dash == 2) {
			route.endTile = $gamePlayer.JumpingTile();
		}

		// Start moveCommands
		route.start();

		route.beforeDash();
		if (Sam.RH.DashAnimation) {
			route.animation(Sam.RH.DashAnimation);
		}
		// Add moveCommand Jump
		route.dash(dash);

		// Add moveCommand Fall
		route.beforeFall();
		route.fall();

		route.finish();

		// Change Ground Common Events
		route.changeGroundCommands(route.startTile.g, route.endTile.g);

		// End moveCommands
		route.end();

		// set moveRoute
		if (!$gamePlayer.isMoveRouteForcing())
			$gamePlayer.forceMoveRoute(route.moveRoute);
	};

	// =============================================================================
	// MoveRoute Flashing & Falling
	// =============================================================================

	Sam.RH.moveRouteFlash = (x, y) => {
		// Create moveRoute
		let route = new Route();

		route.startTile = $gamePlayer.Tile();

		route.endTile = new Tile(x, y);

		// Start moveCommands
		route.start();

		// Transfer
		$gamePlayer.reserveTransfer(
			$gameMap._mapId,
			x,
			y,
			$gamePlayer.direction(),
			3
		);

		route.animation(131);

		// Add moveCommand Fall
		route.beforeFall();
		route.fall();

		route.finish();

		// Change Ground Common Events
		route.changeGroundCommands(route.startTile.g, route.endTile.g);

		// End moveCommands
		route.end();

		// set moveRoute
		if (!$gamePlayer.isMoveRouteForcing())
			$gamePlayer.forceMoveRoute(route.moveRoute);
	};

	// =============================================================================
	// Game_CharacterBase
	// =============================================================================

	Game_CharacterBase.prototype.Sam_RH_Jump = function() {
		const playerTile = this.Tile();
		const lookingPlayerTile = this.LookingTile();
		const climbingPlayerTile = this.ClimbingTile();
		const jumpingPlayerTile = this.JumpingTile();

		if (this.direction() == 2) {
			if (
				playerTile.z + 1 == climbingPlayerTile.z &&
				!this.isCollidedWithCharacters(
					climbingPlayerTile.x,
					climbingPlayerTile.y
				)
			) {
				this.Sam_RH_ClimbUp();
			} else if (
				playerTile.z >= jumpingPlayerTile.z &&
				!this.isCollidedWithCharacters(
					jumpingPlayerTile.x,
					jumpingPlayerTile.y
				)
			) {
				Sam.RH.moveRouteJump(0, 2);
			} else if (
				playerTile.z >= lookingPlayerTile.z &&
				!this.isCollidedWithCharacters(
					lookingPlayerTile.x,
					lookingPlayerTile.y
				)
			) {
				Sam.RH.moveRouteJump(0, 1);
			} else {
				Sam.RH.moveRouteJump(0, 0);
			}
		} else if (
			playerTile.z + 1 == climbingPlayerTile.z &&
			!this.isCollidedWithCharacters(
				climbingPlayerTile.x,
				climbingPlayerTile.y
			)
		) {
			this.Sam_RH_ClimbUp();
		} else if (
			playerTile.z + 0.5 >= jumpingPlayerTile.z &&
			jumpingPlayerTile.id != 0 &&
			!this.isCollidedWithCharacters(
				jumpingPlayerTile.x,
				jumpingPlayerTile.y
			)
		) {
			switch (this.direction()) {
				case 4:
					Sam.RH.moveRouteJump(-2, 0);
					break;
				case 6:
					Sam.RH.moveRouteJump(2, 0);
					break;
				case 8:
					Sam.RH.moveRouteJump(0, -2);
					break;
			}
		} else if (
			playerTile.z >= lookingPlayerTile.z &&
			lookingPlayerTile.id != 0 &&
			!this.isCollidedWithCharacters(
				lookingPlayerTile.x,
				lookingPlayerTile.y
			)
		) {
			switch (this.direction()) {
				case 4:
					Sam.RH.moveRouteJump(-1, 0);
					break;
				case 6:
					Sam.RH.moveRouteJump(1, 0);
					break;
				case 8:
					Sam.RH.moveRouteJump(0, -1);
					break;
			}
		} else {
			Sam.RH.moveRouteJump(0, 0);
		}
	};

	// Climb Up
	Game_CharacterBase.prototype.Sam_RH_ClimbUp = function() {
		const playerTile = $gamePlayer.Tile();
		const lookingPlayerTile = $gamePlayer.LookingTile();
		const climbingPlayerTile = $gamePlayer.ClimbingTile();

		const dZ = lookingPlayerTile.z - playerTile.z;
		const adZ = Math.abs(dZ);

		if (
			playerTile.z + 1 == climbingPlayerTile.z &&
			(adZ != 0 || adZ != 0.5) &&
			!this.isCollidedWithCharacters(
				climbingPlayerTile.x,
				climbingPlayerTile.y
			)
		) {
			switch (this.direction()) {
				case 2:
					Sam.RH.moveRouteJump(0, 1, false);
					break;
				case 4:
					Sam.RH.moveRouteJump(-1, -1, false);
					break;
				case 6:
					Sam.RH.moveRouteJump(1, -1, false);
					break;
				case 8:
					Sam.RH.moveRouteJump(0, -2, false);
					break;
			}
		}
	};

	// Fall Down
	Game_CharacterBase.prototype.Sam_RH_FallDown = function() {
		console.log("Sam_RH_FallDown");

		const playerTile = this.Tile();
		const lookingPlayerTile = this.LookingTile();
		const fallingPlayerTile = this.FallingTile();

		if (playerTile.z > lookingPlayerTile.z) {
			switch (this.direction()) {
				case 2:
					Sam.RH.moveRouteJump(0, 1);
					break;
				case 8:
					Sam.RH.moveRouteJump(0, -1, false);
					break;
			}
			if (playerTile.z > fallingPlayerTile.z) {
				switch (this.direction()) {
					case 4:
						Sam.RH.moveRouteJump(-1, 0);
						break;
					case 6:
						Sam.RH.moveRouteJump(1, 0);
						break;
				}
			}
		}
	};

	// Dash
	Game_CharacterBase.prototype.Sam_RH_Dash = function() {
		$gameActors.actor(1)._mp -= 50;
		const playerTile = this.Tile();
		const lookingPlayerTile = this.LookingTile();
		const jumpingPlayerTile = this.JumpingTile();

		if (
			playerTile.z >= jumpingPlayerTile.z &&
			(jumpingPlayerTile.id != 0 || this.direction() == 2) &&
			!this.isCollidedWithCharacters(
				jumpingPlayerTile.x,
				jumpingPlayerTile.y
			) &&
			this.screenY() <= 528
		) {
			Sam.RH.moveRouteDash(2);
		} else if (
			playerTile.z >= lookingPlayerTile.z &&
			(lookingPlayerTile.id != 0 || this.direction() == 2) &&
			!this.isCollidedWithCharacters(
				lookingPlayerTile.x,
				lookingPlayerTile.y
			) &&
			this.screenY() <= 576
		) {
			Sam.RH.moveRouteDash(1);
		} else {
			Sam.RH.moveRouteDash(0);
		}
	};

	// TileZ
	Game_CharacterBase.prototype.Sam_RH_getTile = function(x, y) {
		return new Tile(x, y);
	};

	// GET INFO
	Game_CharacterBase.prototype.Sam_RH_getInfo = function() {
		console.log("PlayerTile:");
		console.log(this.Tile());
		console.log("LookingPlayerTile:");
		console.log(this.LookingTile());
		console.log("JumpingPlayerTile:");
		console.log(this.JumpingTile());
		console.log("ClimbingPlayerTile:");
		console.log(this.ClimbingTile());
		console.log("FallingPlayerTile:");
		console.log(this.FallingTile());
	};

	const getEventTileId = tile => {
		return $gameMap.eventIdXy(tile.x, tile.y);
	};

	const killEvent = eventId => {
		const event = $gameMap.event(eventId);
		event.dead = true;
		if ($gamePlayer.lockEvent == eventId) {
			$gamePlayer.lockEvent = 0;
			$gameScreen.erasePicture(1);
		}
	};

	const damageEnemy = tile => {
		const eventId = getEventTileId(tile);
		const event = $gameMap.event(eventId);
		if (eventId) {
			$gameSelfSwitches.setValue([$gameMap._mapId, eventId, "D"], true);
			event.requestAnimation(126);
			killEvent(eventId);
		}
	};

	const updateEndurance = () => {
		if ($gameActors.actor(1)._mp < 0) $gameActors.actor(1)._mp = 0;
		if ($gameActors.actor(1).mp < $gameActors.actor(1).mmp)
			$gameActors.actor(1)._mp += 0.05;
		$gameScreen.movePicture(
			92,
			0,
			145,
			84,
			(100 * $gameActors.actor(1).mp) / $gameActors.actor(1).mmp,
			100,
			255,
			0,
			1
		);
	};

	Game_CharacterBase.prototype.Sam_RH_Attack = function() {
		if ($gameActors.actor(1).mp >= 20) {
			damageEnemy(this.LookingTile());
			$gameActors.actor(1)._mp -= 20;
			// updateEndurance();

			if (this.direction() == 8) {
				this.requestAnimation(122);
				damageEnemy(this.NearbyTile(7));
				damageEnemy(this.NearbyTile(9));
			} else if (this.direction() == 6) {
				this.requestAnimation(123);
				damageEnemy(this.NearbyTile(3));
				damageEnemy(this.NearbyTile(9));
			} else if (this.direction() == 4) {
				this.requestAnimation(124);
				damageEnemy(this.NearbyTile(7));
				damageEnemy(this.NearbyTile(1));
			} else if (this.direction() == 2) {
				this.requestAnimation(125);
				damageEnemy(this.NearbyTile(3));
				damageEnemy(this.NearbyTile(1));
			}
			// $gameInterpreter.setWaitMode('animation');
		}
	};

	Game_CharacterBase.prototype.Sam_RH_CircleAttack = function() {
		if ($gameActors.actor(1).mp >= 20) {
			$gameActors.actor(1)._mp -= 50;
			this.requestAnimation(130);
			let i = 1;
			while (i <= 9) {
				damageEnemy(this.NearbyTile(i));
				i++;
			}
		}
	};

	// Display Lock image

	Game_Event.prototype.Sam_RH_updateLock = function() {
		// console.log($gamePlayer.lockEvent);
		if ($gamePlayer.lockEvent) {
			const eventId = $gamePlayer.lockEvent;
			const event = $gameMap.event(eventId);
			if (!event.dead) {
				const screenX = event.screenX();
				const screenY = event.screenY();
				// console.log("EVENT", eventId, screenX, screenY);
				// console.log(screenX, screenY);
				if (
					Math.hypot(
						event.x - $gamePlayer.x,
						event.y - $gamePlayer.y
					) <= 5
				) {
					$gameScreen.showPicture(
						1,
						"Lock",
						1,
						screenX,
						screenY - 14,
						100,
						100,
						255,
						0
					);
					$gamePlayer.turnTowardCharacter(event);
				} else {
					$gamePlayer.lockEvent = 0;
					$gameScreen.erasePicture(1);
				}
			}
		}
	};

	// Aliasing
	Sam.RH.Game_Event_update = Game_Event.prototype.update;
	Game_Event.prototype.update = function() {
		Sam.RH.Game_Event_update.call(this);
		Game_Character.prototype.update.call(this);

		this.Sam_RH_updateLock();
		updateEndurance();
	};

	// Aliasing
	Sam.RH.Game_Player_clearTransferInfo =
		Game_Player.prototype.clearTransferInfo;
	Game_Player.prototype.clearTransferInfo = function() {
		Sam.RH.Game_Player_clearTransferInfo.call(this);

		this.lockEvent = 0;
		$gameScreen.erasePicture(1);
	};

	// Changing Lock Target
	Game_CharacterBase.prototype.Sam_RH_Locking = function(x, y) {
		const eventId = $gameMap.eventIdXy(x, y);
		const event = $dataMap.events[eventId];
		if (eventId) {
			if (event.dead) {
				return false;
			}
			if (eventId != $gamePlayer.lockEvent) {
				if (event.meta.lockable) {
					// console.log("EVENT", x, y, eventId);
					$gamePlayer.lockEvent = eventId;

					return eventId;
				}
			}
		}
		return false;
	};

	Game_CharacterBase.prototype.Sam_RH_Lock = function() {
		var x_centre = $gamePlayer.x;
		var y_centre = $gamePlayer.y;

		let r = 1;
		// Target must be 3 tiles from player max
		while (r <= 3) {
			let x = 0;
			let y = r;
			let d = r - 1;

			while (y >= x) {
				// console.log("r", r);
				if (this.Sam_RH_Locking(x_centre + x, y_centre + y)) {
					return;
				}
				if (this.Sam_RH_Locking(x_centre + y, y_centre + x)) {
					return;
				}
				if (this.Sam_RH_Locking(x_centre - x, y_centre + y)) {
					return;
				}
				if (this.Sam_RH_Locking(x_centre - y, y_centre + x)) {
					return;
				}
				if (this.Sam_RH_Locking(x_centre + x, y_centre - y)) {
					return;
				}
				if (this.Sam_RH_Locking(x_centre + y, y_centre - x)) {
					return;
				}
				if (this.Sam_RH_Locking(x_centre - x, y_centre - y)) {
					return;
				}
				if (this.Sam_RH_Locking(x_centre - y, y_centre - x)) {
					return;
				}

				if (d >= 2 * x) {
					d -= 2 * x + 1;
					x++;
				} else if (d < 2 * (r - y)) {
					d += 2 * y - 1;
					y--;
				} else {
					d += 2 * (y - x - 1);
					y--;
					x++;
				}
			}
			r++;
		}

		$gamePlayer.lockEvent = 0;
		$gameScreen.erasePicture(1);
	};

	Game_CharacterBase.prototype.Sam_RH_Flash = function() {
		$gameActors.actor(1)._mp -= 100;
		const playerTile = this.Tile();
		const lookingPlayerTile = this.LookingTile();
		const jumpingPlayerTile = this.JumpingTile();
		const mapId = $gameMap._mapId;
		console.log("map", $gameMap._displayY);

		if (
			playerTile.z >= jumpingPlayerTile.z &&
			(jumpingPlayerTile.id != 0 || this.direction() == 2) &&
			!this.isCollidedWithCharacters(
				jumpingPlayerTile.x,
				jumpingPlayerTile.y
			) &&
			this.screenY() <= 528
		) {
			Sam.RH.moveRouteFlash(jumpingPlayerTile.x, jumpingPlayerTile.y);
		} else if (
			playerTile.z >= lookingPlayerTile.z &&
			(lookingPlayerTile.id != 0 || this.direction() == 2) &&
			!this.isCollidedWithCharacters(
				lookingPlayerTile.x,
				lookingPlayerTile.y
			) &&
			this.screenY() <= 576
		) {
			Sam.RH.moveRouteFlash(lookingPlayerTile.x, lookingPlayerTile.y);
		} else {
			Sam.RH.moveRouteFlash(playerTile.x, playerTile.y);
		}
	};

	Game_Player.prototype.Sam_RH_SpellA = function() {
		$gamePlayer.Sam_RH_Attack();
	};

	Game_Player.prototype.Sam_RH_SpellZ = function() {
		$gamePlayer.Sam_RH_CircleAttack();
	};

	Game_Player.prototype.Sam_RH_SpellE = function() {
		$gamePlayer.Sam_RH_Attack();
	};

	Game_Player.prototype.Sam_RH_SpellR = function() {
		$gamePlayer.Sam_RH_Attack();
	};

	Game_Player.prototype.Sam_RH_SpellD = function() {
		$gamePlayer.Sam_RH_Dash();
	};

	Game_Player.prototype.Sam_RH_SpellF = function() {
		$gamePlayer.Sam_RH_Flash();
	};

	// Game_Map.prototype.update = function(sceneActive) {
	//     this.refreshIfNeeded();
	//     if (sceneActive) {
	//         this.updateInterpreter();
	//     }
	//     this.updateScroll();
	//     this.updateEvents();
	//     this.updateVehicles();
	//     this.updateParallax();
	//     Sam.RH.updateLock();
	// };

	// Sam.RH.updateLock = function() {
	// 	$gameScreen.showPicture(1, "Lock", 1, $gamePlayer.x, $gamePlayer.y, 100, 100, 255, 0);
	// }

	// =============================================================================
	// UPDATE
	// =============================================================================

	// Sam.RH.Game_Character_update = Game_Character.prototype.update;
	// Game_Character.prototype.update = (sceneActive) => {
	// 	Sam.RH.Game_Character_update.call(this,sceneActive);
	// 	if (this._isDashing){
	// 		$gameActors.actor(1).setCharacterImage($gamePlayer.characterName(), Sam.RH.Anim_Dash);
	// 		$gamePlayer.refresh();
	// 	}
	// };

	// =============================================================================
	// Plugin Command
	// =============================================================================

	Sam.RH.Game_Interpreter_pluginCommand =
		Game_Interpreter.prototype.pluginCommand;
	Game_Interpreter.prototype.pluginCommand = function(command, args) {
		Sam.RH.Game_Interpreter_pluginCommand.call(this, command, args);

		if (command == "Sam_RH_Jump") {
			$gamePlayer.Sam_RH_Jump();
		}

		if (command == "Sam_RH_FallDown") {
			$gamePlayer.Sam_RH_FallDown();
		}

		if (command == "Sam_RH_ClimbUp") {
			$gamePlayer.Sam_RH_ClimbUp();
		}

		if (command == "Sam_RH_getTile") {
			$gamePlayer.Sam_RH_getTile(args[0], args[1]);
		}

		if (command == "Sam_RH_getInfo") {
			$gamePlayer.Sam_RH_getInfo();
		}

		if (command == "Sam_RH_Lock") {
			$gamePlayer.Sam_RH_Lock();
		}

		if (command == "Sam_RH_SpellA") {
			$gamePlayer.Sam_RH_SpellA();
		}

		if (command == "Sam_RH_SpellZ") {
			$gamePlayer.Sam_RH_SpellZ();
		}

		if (command == "Sam_RH_SpellE") {
			$gamePlayer.Sam_RH_SpellE();
		}

		if (command == "Sam_RH_SpellR") {
			$gamePlayer.Sam_RH_SpellR();
		}

		if (command == "Sam_RH_SpellD") {
			$gamePlayer.Sam_RH_SpellD();
		}

		if (command == "Sam_RH_SpellF") {
			$gamePlayer.Sam_RH_SpellF();
		}
	};
})();

// =============================================================================
// END OF FILE - Sam_RegionHeights.js
// =============================================================================
