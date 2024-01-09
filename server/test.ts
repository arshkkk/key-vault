const foo = Bun.file("test.ts"); // relative to cwd
console.log(foo.type); // '{"hello":"world"}'
