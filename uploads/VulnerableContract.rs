
pub fn risky_function() {
    let some_option: Option<i32> = None;
    let _value = some_option.unwrap(); // Potential panic risk
}

pub fn another_risky_function() {
    let some_result: Result<i32, &str> = Err("error");
    let _value = some_result.expect("Failed to get value"); // Potential panic risk
}

pub unsafe fn dangerous_block() {
    let mut x: i32 = 0;
    let r: *mut i32 = &mut x;
    *r += 1;
}
