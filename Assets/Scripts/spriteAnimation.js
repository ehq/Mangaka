#pragma strict

// NOTES:
// This script implements the basic functionality for animating a sprite sheet.
// It assumes that only a main texture is used, and no maps are added to it.
// To animate a secondary texture as well, use:
// `renderer.material.setTextureScale("the_texture_name", scale)` and
// `renderer.material.setTextureOffset("the_texture_name", offset)`.

// If no starting position is specified, the script defaults to 0, 0.
// If no total number of frames is specified,
// it defaults to the sprite sheet total.

// Turns the animation on or off.
var animationEnabled : boolean = true;

// Sprite dimensions.
var columnSize : int;
var rowSize    : int;

// Initial Position for the animation.
var startFrameColumn : int = 0;
var startFrameRow    : int = 0;

// Number of frames to use for the animation.
var totalFrames : int;

// Speed of the animation.
var framesPerSecond : int;

// Private variables.
private var scale : Vector2;
private var index  : int = 0;
private var flat_position : int;
private var current_position : int;

function Start () {
	scale = Vector2(1.0 / columnSize, 1.0 / rowSize);

	renderer.material.mainTextureScale = scale;
	
	flat_position = index_at(startFrameRow, startFrameColumn);
	
	StartCoroutine("animateSprite");
}

function animateSprite () {
	while (true) {
		if (animationEnabled) {
		
			current_position = flat_position + index;
			
			// Apply the offset.
			renderer.material.mainTextureOffset = coordinates_for(current_position);
			
			// Move the index on to the next frame.
			index = (index + 1) % totalFrames;
		}
		
		// Wait for the next frame.
		yield WaitForSeconds(1.0 / framesPerSecond);
	}
}

function updateAnimation(row : int, column : int, length : int) {
	totalFrames = length;
	startFrameRow = row;
	startFrameColumn = column;
	
	// Reset frame position and index.
	flat_position = index_at(startFrameRow, startFrameColumn);
}

private function index_at(row : int, column : int) : int {
	return row * columnSize + column;
}

private function coordinates_for(position : int) : Vector2 {
	return Vector2(position % columnSize * scale.x,
				   (rowSize - 1 - (position / columnSize)) * scale.y);
}