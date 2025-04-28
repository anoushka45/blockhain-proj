
pub fn risky_expect() {
    let res: Result<i32, &str> = Err("fail");
    let _val = res.expect("This will panic!");
}
