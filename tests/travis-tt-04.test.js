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

//this test checks that front desk staff can get all the package information in one call
test("Front desk staff can retrieve complete package information", () =>
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

    //this calls getDetails to retrieve all of the package information at once
    const details = packageInfo.getDetails();

    //this checks that the returned details match the data the package was created with
    expect(details).toEqual({
        firstName: "Jane",
        lastName: "Doe",
        trackingNo: "TRK123456",
        deliveryDate: "2026-11-11",
        deliveryTime: "3:00 PM",
        status: "Logged"
    });
});