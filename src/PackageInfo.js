class PackageInfo {
    constructor(firstName, lastName, trackingNo, deliveryDate, deliveryTime, status)
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.trackingNo = trackingNo;
        this.deliveryDate = deliveryDate;
        this.deliveryTime  = deliveryTime;
        this.status = status;
    }
    
    logPackage() 
    {
        // TODO:  insert code to log required package info 
    }
    markAsRetrieved()
    {
         // TODO:  insert code
    }
    applyScanResult()
    {
        // TODO:  insert code 
    }
    getDetails()
    {
        // returns all package information in one object for front desk staff
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            trackingNo: this.trackingNo,
            deliveryDate: this.deliveryDate,
            deliveryTime: this.deliveryTime,
            status: this.status
        };
    }


}
