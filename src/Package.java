public class Package {
    private String packageId;
    private String recipientName;
    private String roomNumber;
    private String status;

    public Package(String packageId, String recipientName, String roomNumber, String status) {
        this.packageId = packageId;
        this.recipientName = recipientName;
        this.roomNumber = roomNumber;
        this.status = status;
    }

    public String getDetails() {
        return "ID: " + packageId + ", Recipient: " + recipientName + ", Room: " + roomNumber + ", Status: " + status;
    }
}
