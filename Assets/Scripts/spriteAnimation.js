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

// Sprite dimensions.
var columnSize : int;
var rowSize    : int;

// Initial Position for the animation.
var startFrameColumn : int = 0;
var startFrameRow    : int = 0;

// Number of frames to use for the animation.
var totalFrames : int = rowSize * columnSize;

// Speed of the animation.
var framesPerSecond : int;

// Private variables.
private var scale : Vector2;
private var index  : int;
private var x      : float;
private var y      : float;

function Start () {
	scale = Vector2(1.0 / columnSize, 1.0 / rowSize);

	renderer.material.mainTextureScale = scale;
	
	StartCoroutine("animateSprite");
}

function animateSprite () {
	while (true) {
	
		// Calculate the offset for the current frame.
		x = ((index % columnSize) + startFrameColumn) * scale.x;
		y = (scale.y - 1) - ((index / columnSize) + startFrameRow);
		
		// Apply the offset.
		renderer.material.mainTextureOffset = Vector2(x, y);
		
		// Move the index on to the next frame.
		index = (index + 1) % totalFrames;
		
		// Wait for the next frame.
		yield WaitForSeconds(1.0 / framesPerSecond);
	}
}