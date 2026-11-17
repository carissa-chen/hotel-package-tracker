//this imports the file system module so we can read the source file from disk
const fs = require("fs");

//this imports the vm module so we can run the source code in an isolated context
const vm = require("vm");

//this reads the contents of the PackageInfo source file as a text string
const source = fs.readFileSync("./src/PackageInfo.js", "utf8");

//this creates a fake module object so the sandboxed code has somewhere to export to
const packageModule = { exports: {} };

//this runs the source code in a new sandbox and exports the PackageInfo class through the fake module
vm.runInNewContext(
    `${source}\nmodule.exports = PackageInfo;`,
    {
        module: packageModule,
        exports: packageModule.exports
    }
);

//this pulls the PackageInfo class out of the fake module so the tests can use it
const PackageInfo = packageModule.exports;

//this test checks that a new PackageInfo object stores every required field correctly
test("PackageInfo creates an object with the required package information fields", () =>
{
    //this creates a PackageInfo object with sample package data
    const packageInfo = new PackageInfo(
        "Jane",
        "Doe",
        "TRK123456",
        "2026-11-11",
        "3:00 PM",
        "Logged"
    );

    //this checks that the first name was stored correctly
    expect(packageInfo.firstName).toBe("Jane");

    //this checks that the last name was stored correctly
    expect(packageInfo.lastName).toBe("Doe");

    //this checks that the tracking number was stored correctly
    expect(packageInfo.trackingNo).toBe("TRK123456");

    //this checks that the delivery date was stored correctly
    expect(packageInfo.deliveryDate).toBe("2026-11-11");

    //this checks that the delivery time was stored correctly
    expect(packageInfo.deliveryTime).toBe("3:00 PM");

    //this checks that the status was stored correctly
    expect(packageInfo.status).toBe("Logged");
});