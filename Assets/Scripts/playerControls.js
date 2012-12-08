#pragma strict  

// Public variables.
var groundSpeed : float = 6.0;
var airSpeed    : float = 4.0;
var jumpSpeed   : float = 8.0;
var gravity     : float = 20.0;

// Private variables.
private var velocity : Vector3 = Vector3.zero;
private var controller : CharacterController;
private var animations : spriteAnimation;
private var facingForward : boolean = true;

function Start() {
    controller = GetComponent(CharacterController);
    animations = GetComponent(spriteAnimation);
}

function Update() {
    velocity.x = Input.GetAxis("Horizontal");

    if (controller.isGrounded) {
        velocity.x *= groundSpeed;
       
        if (Input.GetButton ("Jump")) velocity.y = jumpSpeed;
    } else {
    	velocity.x *= airSpeed;
    	velocity.y -= gravity * Time.deltaTime; // Apply gravity.
    }

	// FIXME: Use a switch / case for this.
	if (velocity.x > 1) {
		facingForward = false;
		animations.updateAnimation(3,0,8);
	}
	
	if (velocity.x < -1) {
		facingForward = true;
		animations.updateAnimation(2,0,8);
	}
	
	if (Mathf.Abs(velocity.x) < 1) {
		if (facingForward) {
			animations.updateAnimation(0,0,8);
		} else {
			animations.updateAnimation(1,0,8);
		}
	}

	// Apply movement.    
    controller.Move(velocity * Time.deltaTime);
}