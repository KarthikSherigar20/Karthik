class Elements{
    //Login

    lo="Login";
    em="input[id='email']";
    ph="input[placeholder='Phone Number']";
    se="button[type='submit']";
    ve="Verify";
    ch="span[class='chakra-checkbox__label css-6x44c9']";

    //Add ben
    Addb="path[d='M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm192 472c0 4.4-3.6 8-8 8H544v152c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V544H328c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h152V328c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v152h152c4.4 0 8 3.6 8 8v48z']";
    FN="Full name";
    sel="select[id^='field-:r']";
    mo="input[type='tel']";
    ci="City";
    pi="Pincode";
    ad="button[class='chakra-button css-f2hjvb']";

    //  Adding Address 

    na="MANISH";
    addr="div[class='ProfileAddressDetails_editIcon__GcAKc css-0']";
    addanot="Add Another Address";
    addne="Add New";
    lab="select[class='chakra-select css-161pkch']";
    no="input[placeholder='Flat No. / House No. / Building / Company / Apartment']";
    Are="input[placeholder='Area, Street, Sector, Village']";
    Land="input[placeholder='Landmark']";
    pin="input[placeholder='Pincode']";
    Tow="input[placeholder='Town / City']";
    St="input[placeholder='State']";
    amb="select[class='chakra-select css-161pkch']";
    lft="select[class='chakra-select css-161pkch']";
    loc="Locate On Map";
    save="button[class='chakra-button css-f2hjvb']";
    propre="Profile Preview";

    //Add emergency Contacts

    ec="div[class='ProfileEmergencyContactDetails_editIcon__n0B5r css-0']";
    ean="Add Another Contact";
    fname="input[placeholder='Full Name']";
    rel="select[class='chakra-select css-161pkch']";
    Mob="input[placeholder='Mobile Number']";
    wha="span[class='chakra-switch__track css-p27qcy']";
    sav="Save";

    //Preferred hospital

    hos="Add Preferred Hospital";
    addhos="Add Hospital";
    cityn="input[placeholder='Enter City Name']";
    hosname="input[placeholder='Enter Hospital Name']";
    savhos="button[class='chakra-button css-38nwlg']";

    //Insurance information
    addins="Add InsuranceInfo";
    poid="input[placeholder='Policy Id / E-Card Number']";
    tpname="input[placeholder='TPA (Third Party Administrator) Name']";
    politype="select[id='policyType']";
    inscom="input[placeholder='Name of Insurance Company']";
    uploaddoc="Upload Document";
    addinsu="Add Insurance";
    naofinsurer="input[placeholder='Name of insurer']";
    addano="Add Another Insurance";


    //Medical profile
    Addmedin='Add Medical Info';
    crocon="div[class='dropdown-heading']";
    BG="select[class='chakra-select css-161pkch']";
    currmedno="span[class='chakra-radio__control css-8o2sux']";
    saveandc="Save and continue";
    currmedyes="span[class='chakra-radio__control css-134kubt']";


    //Login
    loginbtn(){
        cy.contains(this.lo).click();
    }
    email(ema){
        cy.get(this.em).type(ema);
    }
    sendotp(){
        cy.get(this.se).click();
    }
    verify(){
        cy.contains(this.ve).click();
    }


    //Add ben

    Addben(){
        cy.get(this.Addb).click({force: true});
    }
    Fullname(Fname){
        cy.contains(this.FN).next().clear().type(Fname);
    }
    Select(rel){
        cy.get(this.sel).select(rel);
    }
    mob(mob){
        cy.get(this.mo).clear().type(mob);
    }
    City(cty){
        cy.contains(this.ci).next().clear().type(cty);
    }
    pincode(pin){
        cy.contains(this.pi).next().clear().type(pin);
    }
    Addd(){
        cy.get(this.ad).click();
    }


    //  Adding Address 

    name(){
        cy.contains(this.na).click();
    }
    address(){
        cy.get(this.addr).scrollIntoView().should('be.visible').click();
    }
    addanotheraddress(){
        cy.contains(this.addanot).click();
    }
    addnew(){
        cy.contains(this.addne).click();
    }
    label(adlab){
        cy.get(this.lab).eq(0).select(adlab);
    }
    Houseno(Flatno){
        cy.get(this.no).type(Flatno);
    }
    Area(Street){
        cy.get(this.Are).type(Street);
    }
    Landmark(mark){
        cy.get(this.Land).type(mark);
    }
    Pincode(code){
        cy.get(this.pin).type(code);
    }
    town(city){
        cy.get(this.Tow).type(city);
    }
    State(sta){
        cy.get(this.St).type(sta);
    }
    Ambulance(ambu){
        cy.get(this.amb).eq(1).select(ambu);
    }
    lift(li){
        cy.get(this.lft).eq(2).select(li);
    }
    locate(){
        cy.contains(this.loc).click();
    }
    saveaddress(){
        cy.get(this.save).scrollIntoView().should('be.visible').click({force: true});
    }
    profilepreview(){
        
        cy.contains(this.propre).click();
    }


    //Add emergency Contacts

    emergencycontacts(){
        cy.get(this.ec).scrollIntoView().should('be.visible').click();
    }
    addanothercontact(){
        cy.contains(this.ean).click();

    }
    Funame(fnam){
        cy.get(this.fname).type(fnam);
    }
    Relationship(sub){
        cy.get(this.rel).eq(1).select(sub);
    }
    Mobileno(mono){
        cy.get(this.Mob).type(mono);
    }
    whatspp(){
        cy.get(this.wha).eq(0).click();
    }
    savee(){
        cy.contains(this.sav).click();
    }


    //Preferred hospital

    preferredhospital(){
        cy.contains(this.hos).scrollIntoView().should('be.visible').click();
    }
    Addhospital(){
        cy.contains(this.addhos).scrollIntoView().should('be.visible').click();
    }
    Cityname(cname){
        cy.get(this.cityn).type(cname);
    }
    Hospitalname(hname){
        cy.get(this.hosname).type(hname);
    }
    mousemov(){
        cy.get(this.hosname).trigger('mousemove',{clientY:50}).trigger('contextmenu', { button: 2 });
    }
    savehospital(){
        cy.get(this.savhos).click({force:true});
    }


    //Insurance information
    // addinsuranceinfo(){
    //     cy.get('body').then(($body)=>{
    //         const bodyText=$body.text();
    //         if(bodyText.includes('Add InsuranceInfo')){
    //             cy.contains(this.addins).scrollIntoView().should('be.visible').click();
    //             cy.wait(1500);
    //             if(value[2]){
    //                 P1.Policyid(value[2]);
    //                 cy.wait(1500);
    //               }
    //               if(value[3]){
    //                 P1.thirdpartyname(value[3]);
    //                 cy.wait(1500);
    //               }
    //               if(value[4]){
    //                 P1.policytype(value[4]);
    //                 cy.wait(1500);
    //               }
    //               if(value[5]){
    //                 cy.get
    //                 P1.insurancecompany(value[5]);
    //                 cy.wait(1500);
    //               }
    //               P1.uploaddocument();
    //               cy.wait(7000);
    //               if(value[2]&&value[4]&&value[5]){
    //                 P1.ADDinsurance();
    //                 cy.wait(7000);
    //               }
    //               else{
    //                 P1.ADDinsurance();
    //                 P1.Errormsgforinsu(value[2],value[4],value[5]);
    //                 cy.wait(1500);
    //                 P1.profilepreview();
    //               }
    //         }else{
    //             cy.get('div[class="ProfileInsurance_editIcon__4Mq82 css-0"]').click();
    //             cy.wait(1500);
    //             cy.contains('Add Another Insurance').click();
    //             if(value[2]){
    //                 P1.Policyid(value[2]);
    //                 cy.wait(1500);
    //               }
    //               if(value[3]){
    //                 P1.thirdpartyname(value[3]);
    //                 cy.wait(1500);
    //               }
    //               if(value[4]){
    //                 P1.policytype(value[4]);
    //                 cy.wait(1500);
    //               }
    //               if(value[5]){
    //                 cy.get
    //                 P1.nameofinsurer(value[5]);
    //                 cy.wait(1500);
    //               }
    //               P1.uploaddocument();
    //               cy.wait(7000);
    //               if(value[2]&&value[4]&&value[5]){
    //                 P1.ADDinsurance();
    //                 cy.wait(7000);
    //               }
    //               else{
    //                 P1.ADDinsurance();
    //                 P1.Errormsgforinsu(value[2],value[4],value[5]);
    //                 cy.wait(1500);
    //                 P1.profilepreview();
    //               }
    //         }
    //     })
        
    // }
    Policyid(polid){
        cy.get(this.poid).type(polid);
    }
    thirdpartyname(tpaname){
        cy.get(this.tpname).type(tpaname);
    }
    policytype(policty){
        cy.get(this.politype).select(policty);
    }
   
    uploaddocument(){
        cy.contains(this.uploaddoc).click();
    }
    ADDinsurance(){
        cy.contains(this.addinsu).click();
    }
    
    addanotherinsurance(){
        cy.contains(this.addano).click();
    }
    nameofinsurer(noi){
        cy.get(this.naofinsurer).type(noi);
    }
    insurancecompany(incom){
        cy.get(this.inscom).type(incom);
    }


    //Medical profile
    Addmedicalinfo(){
        cy.contains(this.Addmedin).scrollIntoView().should('be.visible').click();
    }
    croniccondition(){
        cy.get(this.crocon).click();
    }
    Bloodgroup(bldg){
        cy.get(this.BG).eq(0).select(bldg);
    }
    currentmedicationno(){
        cy.get(this.currmedno).eq(0).click();
    }
    allergiestomedicationno(){
        cy.get(this.currmedno).eq(1).click();
    }
    pastmedicalno(){
        cy.get(this.currmedno).eq(2).click();
    }
    Recenthospitalizationno(){
        cy.get(this.currmedno).eq(3).click();
    }
    differentlyabbeldno(){
        cy.get(this.currmedno).eq(4).click();
    }
    currentmedicationyes(){
        cy.get(this.currmedyes).eq(0).click();
    }
    allergiestomedicationyes(){
        cy.get(this.currmedyes).eq(1).click();
    }
    pastmedicalyes(){
        cy.get(this.currmedyes).eq(2).click();
    }
    Recenthospitalizationyes(){
        cy.get(this.currmedyes).eq(3).click();
    }
    differentlyabbeldyes(){
        cy.get(this.currmedyes).eq(4).click();
    }
    Mobilitystatus(mobs){
        cy.get(this.BG).eq(1).select(mobs);
    }
    saveandcontinue(){
        cy.contains(this.saveandc).click();
    }
    placeholder(){
        cy.get('input').invoke('attr','placeholder').then((placeholderText)=>{
            if(placeholderText.includes('Name of insurer')){
                nameofinsurer();
            }else{
                insurancecompany();
            }
        })
    }

    checkErrormessage(name,relationship,mobile){
        if(name===null || relationship===null|| mobile===null ){
            if(name=== null){
                cy.get('div[class="Toastify__toast-body"]').should('be.visible').and('contain','Name is required');
            }
            if(relationship===null){
                cy.get('div[class="Toastify__toast-body"]').should('be.visible').and('contain','Relationship is required');
            }
            if(mobile===null){
                cy.get('div[class="Toastify__toast-body"]').should('be.visible').and('contain','Mobile number is required');
            }
 
        }

    }

    Errormsgforben(name,relation,Mobile,City,Pincode){
        if(name===null || relation===null || Mobile===null || City===null || Pincode===null){
            cy.get('div[class="Toastify__toast-body"]').should('be.visible').and('contain','Please fill the details properly');
        }

    }
    Errormsgforadd(addlabel,houseno,Area,landmark,pincode,town,state,){
        if(addlabel===null || houseno===null || Area===null || landmark===null || pincode===null || town===null || state===null){
            if(pincode===null){
            cy.get('div[class="Toastify__toast-body"]').should('be.visible').and('contain','Pincode must be 6 digits')
            }else{
                cy.get('div[class="Toastify__toast-body"]').should('be.visible').and('contain','All fields are required')
            }
        }
    }
    Errormsgforinsu(policyid,policytype,insurancecom){
        if(policyid===null ||  policytype===null || insurancecom===null){
            if(policytype===null){
                cy.get('div[class="Toastify__toast-body"]').should('be.visible').and('contain','typeOfPolicy must be one of the following values: Corporate, Self, ESIC, Others')
            }else{
                cy.get('div[class="Toastify__toast-body"]').should('be.visible').and('contain','PolicyId , PolicyType , Insurer fields are required')
            }
        }
    }
    OTP(){
        cy.get('input[aria-label="Please enter OTP character 1"]').type('1');
        cy.wait(100);
        cy.get('input[aria-label="Please enter OTP character 2"]').type('2');
        cy.wait(100);
        cy.get('input[aria-label="Please enter OTP character 3"]').type('3');
        cy.wait(100);
        cy.get('input[aria-label="Please enter OTP character 4"]').type('4');
        cy.wait(100);
        cy.get('input[aria-label="Please enter OTP character 5"]').type('5');
        cy.wait(100);
        cy.get('input[aria-label="Please enter OTP character 6"]').type('6');
        cy.wait(100);
    }
    PTA(){
        cy.wait(5000);
        cy.get('body').then(($bodyText)=>{
            const bodyText=$bodyText.text();
        if(!bodyText.includes('Verify')){
        cy.get('button[type="submit"]').click();
        cy.wait(1000);
        if(!bodyText.includes("Couldn't find Pococare account")){
            if(!bodyText.includes('Verify')){
                this.PTA();
            }else{
            }
        }else{
            cy.log("Couldn't find Pococare account");
        }
    }
        })
    }
    FullName() {
        cy.get('input[placeholder="Full Name"]').then($FullName => {
            const FullName = $FullName.val();
            console.log('FullName',FullName);
            let modifiedValue = FullName + '1';
            console.log('modi',modifiedValue);
            cy.wait(1000);
            cy.get('input[placeholder="Full Name"]').clear().type(modifiedValue);
            cy.wait(1000);
            cy.contains('Save and continue').click();
            
            cy.get('body').then($bodyText => {
                // Ensure you uncomment this assertion if you want to use it
                // const bodyText = $bodyText.text();
                // expect(bodyText).to.include('Basic Info Updated Successfully');
            });
    
            cy.wait(1000);
            cy.get('img[class="chakra-image css-wlnxkn"]').click();
            cy.wait(1000);
    
            cy.get('span[style="color: blue;"]').then($Na => {
                const Na = $Na.text();
                console.log('Na', Na);
                expect(Na).to.include(modifiedValue + ',');
            });
            cy.get('body').then(($bodyText)=>{
                const bodyText=$bodyText.text();
                if(bodyText.includes('Edit Profile')){
                    cy.contains('Edit Profile').click();
                }else{
                cy.contains('Complete Profile').eq(0).click();
                }
            })
            cy.contains('Basic Information').click();
            cy.wait(1000);
            cy.get('input[placeholder="Full Name"]').clear().type(FullName);
            cy.wait(1000);
            cy.contains('Save and continue').click();
            cy.wait(1000);
            cy.get('img[class="chakra-image css-wlnxkn"]').click();
            cy.wait(1000);
            cy.get('span[style="color: blue;"]').invoke('text').then(Na => {
                console.log('Na', Na);
                expect(Na).to.include(FullName + ',');
            });
        });
    }
    FullName1() {
        cy.get('input[placeholder="Full Name"]').then($FullName => {
            const FullName = $FullName.val();
            console.log('FullName',FullName);
            let modifiedValue = FullName + '1';
            console.log('modi',modifiedValue);
            cy.wait(1000);
            cy.get('input[placeholder="Full Name"]').clear().type(modifiedValue);
            cy.wait(1000);
            cy.contains('Save and continue').click();
            
            cy.get('body').then($bodyText => {
                // Ensure you uncomment this assertion if you want to use it
                // const bodyText = $bodyText.text();
                // expect(bodyText).to.include('Basic Info Updated Successfully');
            });
    
            cy.wait(1000);
            cy.contains('Basic Information').click();
            cy.wait(3000);
    
            cy.get('input[placeholder="Full Name"]').then($Na => {
                const Na=$Na.val();
                console.log('Na', Na);
                expect(Na).to.include(modifiedValue);
            });
            cy.wait(1000);
            cy.get('input[placeholder="Full Name"]').clear().type(FullName);
            cy.wait(1000);
            cy.contains('Save and continue').click();
            cy.wait(1000);
            cy.contains('Basic Information').scrollIntoView().click();
            cy.wait(1000);
    
            cy.get('input[placeholder="Full Name"]').then($Na => {
                const Na=$Na.val();
                console.log('Na', Na);
                expect(Na).to.include(FullName);
            });
        });
    }
    Gender(){
        const Gen='select[class="chakra-select css-161pkch"]';
        cy.get(Gen).eq(1).then((dropdown)=>{
            const previouslyselectedoption=dropdown.val();
            if(previouslyselectedoption==='Male'){
                cy.get(Gen).eq(1).select('Female');
                cy.wait(1000);
                cy.contains('Save and continue').click();
                cy.wait(1000);
                cy.contains('Basic Information').click();
                cy.wait(1000);
                cy.get(Gen).eq(1).should('have.value','Female');
                cy.wait(1000);
                cy.get(Gen).eq(1).select(previouslyselectedoption);
                cy.wait(1000);
                cy.contains('Save and continue').click();
                cy.wait(1000);
                cy.contains('Basic Information').click();
                cy.wait(1000);
                cy.get(Gen).eq(1).should('have.value',previouslyselectedoption);
                cy.wait(1000);

            }
            if(previouslyselectedoption==='Female'){
                cy.get(Gen).eq(1).select('Male');
                cy.wait(1000);
                cy.contains('Save and continue').click();
                cy.wait(1000);
                cy.contains('Basic Information').click();
                cy.wait(1000);
                cy.get(Gen).eq(1).should('have.value','Male');
                cy.wait(1000);
                cy.get(Gen).eq(1).select(previouslyselectedoption);
                cy.wait(1000);
                cy.contains('Save and continue').click();
                cy.wait(1000);
                cy.contains('Basic Information').click();
                cy.wait(1000);
                cy.get(Gen).eq(1).should('have.value',previouslyselectedoption);
                cy.wait(1000);
            }
        
        
        })
    }
    Age(){
        const Ag='input[placeholder="Age"]';
        cy.wait(1000);
        cy.get('svg[class="chakra-icon css-onkibi"]').eq(0).click();
        cy.wait(1000);
        cy.get(Ag).then((Agee)=>{
            const Age=Agee.val();
            console.log('Age',Age)
        cy.contains('Save and continue').click();
        cy.wait(1000);
        cy.contains('Basic Information').click();
        cy.wait(1000);
        cy.get(Ag).should('have.value',Age);
        cy.wait(1000);
        cy.get('svg[class="chakra-icon css-onkibi"]').eq(1).click();
        cy.wait(1000);
        cy.get(Ag).then((Agee)=>{
            const Age=Agee.val();
        cy.contains('Save and continue').click();
        cy.wait(1000);
        cy.contains('Basic Information').click();
        cy.wait(1000);
        cy.get(Ag).should('have.value',Age);
        cy.wait(1000);
        })
    })
}
    Email(){
        let em='input[class="chakra-input css-1bqyy6o"]';
    cy.get(em).then((ema)=>{
        let email=ema.val();
    cy.wait(1000);
    cy.get(em).clear();
    cy.wait(1000);
    cy.get(em).type('123k@gmail.com');
    cy.wait(1000);
    cy.contains('Save and continue').click();
    cy.wait(1000);
    cy.contains('Basic Information').click();
    cy.wait(1000);
    cy.get(em).should('have.value','123k@gmail.com');
    cy.wait(1000);
    cy.get(em).clear().type(email);
    cy.wait(1000);
    cy.contains('Save and continue').click();
    cy.wait(1000);
    cy.contains('Basic Information').click();
    cy.wait(1000);
    cy.get(em).should('have.value',email);
    cy.wait(1000);
    })
    }
    PhoneNumber(){
        let ph='input[placeholder="Phone Number"]';
    cy.get(ph).then((pho)=>{
        let Phone=pho.val();
    cy.wait(1000);
    cy.get(ph).clear().type('9888888888');
    cy.wait(1000);
    cy.contains('Save and continue').click();
    cy.wait(1000);
    cy.contains('Basic Information').click();
    cy.wait(1000);
    cy.get(ph).invoke('val').then((PhoneN)=>{
        expect(PhoneN).to.include('9888');
    })
    cy.wait(1000);
    cy.get(ph).clear().type(Phone);
    cy.wait(1000);
    cy.contains('Save and continue').click();
    cy.wait(1000);
    cy.contains('Basic Information').click();
    cy.wait(1000);
    cy.get(ph).invoke('val').then((PhoneN)=>{
        expect(PhoneN).to.include(Phone);
    })
    cy.wait(1000);
    })
    }
}
export default Elements;