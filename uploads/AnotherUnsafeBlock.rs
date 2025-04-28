
pub unsafe fn another_unsafe() {
    let mut arr = [1, 2, 3];
    let ptr = arr.as_mut_ptr();
    *ptr.offset(1) = 99;
}
