
pub fn multiple_threats() {
    let some_option: Option<i32> = None;
    let _ = some_option.unwrap();
    unsafe {
        let mut x = 5;
        let ptr = &mut x as *mut i32;
        *ptr = 10;
    }
}
