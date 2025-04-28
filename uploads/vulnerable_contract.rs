// sample.rs

fn main() {
    let x = Some(5);

    // Unsafe block
    unsafe {
        let p = 0x12345 as *const i32;
        println!("Value at address: {}", *p);
    }

    // Unwrap usage
    let value = x.unwrap();
    println!("Unwrapped value: {}", value);

    // Expect usage
    let another_value = x.expect("Expected a value but found None");
    println!("Expected value: {}", another_value);
}
