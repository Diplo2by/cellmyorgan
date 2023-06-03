describe.only('PatientListing', () => {
    it("should list and retrieve patient details", async function () {
        const Patient = await ethers.getContractFactory("Patient");
        const pat = await Patient.deploy();
        await pat.deployed()
        const contractAddress = pat.address
        console.log(contractAddress)

        await pat.listNewPatient(contractAddress, ".xyz", "Gopi", 69);
        await pat.listNewPatient(contractAddress, ".xyz", "Gopal", 74);
        await pat.listNewPatient(contractAddress, ".xyz", "Govind", 89);
        let count = await pat.getPatientCount();
        console.log(Number(count));

        let val = await pat.getPatientAtIndex(2)
        console.log(val)

    })
})