
pub fn dangerous() {
    unsafe {
        let mut a = 42;
        let r = &mut a as *mut i32;
        *r += 1;
    }
}
