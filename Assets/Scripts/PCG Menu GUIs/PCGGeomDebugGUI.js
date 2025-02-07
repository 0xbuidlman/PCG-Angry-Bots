#pragma strict
private var mapManager : PCGTreeNEATMapManager;

var guiSkin : GUISkin;
var cursorImage : Texture;

var backgroundSize = Vector2(600,200);

var buttonSize = Vector2(200,70);
var buttonSeperation = 25;

var inputBoxSize = Vector2(300,30);
var playerID : String = "";
var mapID : String = "";

var warningLabel : String = "";
var labelSize = new Vector2(400,35);


function Awake() {
	mapManager = gameObject.GetComponent(PCGTreeNEATMapManager);
	enabled = false;
}

function OnEnable() {
	playerID = "";
	mapID = "";
}

function OnGUI () {	
	Input.ResetInputAxes();
	if (Time.timeScale == 1)
		Time.timeScale = 0;
		
	// Background	
	GUI.skin = guiSkin;
	GUI.Box(Rect(0, 0, Screen.width, Screen.height), "Angry Bots: \nThe Procedural Map Generation Edition");
	
	// Input boxes
	var mapOffset = new Vector2((Screen.width/2)-(inputBoxSize.x/2), (Screen.height/2)-inputBoxSize.y);
	var playerOffset = new Vector2((Screen.width/2)-(inputBoxSize.x/2), mapOffset.y-inputBoxSize.y-buttonSeperation);
	
	var playerLabelOffset = new Vector2(playerOffset.x-labelSize.x-buttonSeperation, playerOffset.y);
	var mapLabelOffset = new Vector2(mapOffset.x-labelSize.x-buttonSeperation, mapOffset.y);
	
	playerID = GUI.TextField(Rect(playerOffset.x, playerOffset.y, inputBoxSize.x, inputBoxSize.y), playerID);
	mapID = GUI.TextField(Rect(mapOffset.x, mapOffset.y, inputBoxSize.x, inputBoxSize.y), mapID);
	
	GUI.Label(Rect(playerLabelOffset.x, playerLabelOffset.y, labelSize.x, inputBoxSize.y), "Player ID:", GUI.skin.customStyles[1]);
	GUI.Label(Rect(mapLabelOffset.x, mapLabelOffset.y, labelSize.x, inputBoxSize.y), "Matlab Map ID:", GUI.skin.customStyles[1]);	 
		
	// Default user check box
	var defaultOffset = new Vector2((Screen.width/2)-(labelSize.x/2), (Screen.height/2)+buttonSeperation);
	//defaultUser = GUI.Toggle(Rect(defaultOffset.x, defaultOffset.y, labelSize.x, labelSize.y), defaultUser, "Login as Default User \n(note: this account can be accessed by anyone)");
	
	// Warning label
	var warningOffset = new Vector2(defaultOffset.x, defaultOffset.y+labelSize.y+buttonSeperation);
	GUI.Label(Rect(warningOffset.x, warningOffset.y, labelSize.x, labelSize.y),warningLabel); 
	
	// Buttons
	var buttonOffset = new Vector2((Screen.width/2), warningOffset.y+labelSize.y+buttonSeperation);
	
	if (GUI.Button(Rect(buttonOffset.x-buttonSize.x-(buttonSize.x/2)-buttonSeperation, buttonOffset.y, buttonSize.x, buttonSize.y), "Back")) {
		mapManager.gameState = PCG_STATE.ShowStartScreen;
		enabled = false;	
	}
	
	if (GUI.Button(Rect(buttonOffset.x-(buttonSize.x/2), buttonOffset.y, buttonSize.x, buttonSize.y), "Capture")) {		
		var allGood : boolean = false;
		
		if (playerID == "")
			warningLabel = "Please enter a Player ID";
		else {
			if (mapID == "")
				warningLabel = "Please enter a Map ID";
			else
				allGood = true;
		}
		
		if (allGood) {	
			Time.timeScale = 1;
			mapManager.FetchArchiveGeometryData(playerID, int.Parse(mapID), PCG_STATE.ShowStartScreen);
			enabled = false;
		}
	}
	
	if (GUI.Button(Rect(buttonOffset.x+(buttonSize.x/2)+buttonSeperation, buttonOffset.y, buttonSize.x, buttonSize.y), "Play")) {		
		allGood = false;
		
		if (playerID == "")
			warningLabel = "Please enter a Player ID";
		else {
			if (mapID == "")
				warningLabel = "Please enter a Map ID";
			else
				allGood = true;
		}
		
		if (allGood) {	
			Time.timeScale = 1;
			mapManager.FetchArchiveGeometryData(playerID, int.Parse(mapID), PCG_STATE.PlayMap);
			enabled = false;
		}
	}
	
	// Draw cursor last to be on top
	var mousePos : Vector3 = Input.mousePosition;
    var pos : Rect = Rect(mousePos.x,Screen.height - mousePos.y,cursorImage.width/3,cursorImage.height/3);
    GUI.Label(pos,cursorImage);
}