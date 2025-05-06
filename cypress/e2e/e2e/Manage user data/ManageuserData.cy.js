import login from "../../../support/login";


describe('Adding,updating,deleting',()=>{
    before(()=>{
        login()
        cy.log('Login completed')
    })

    it('Adding users through excel',()=>{

    cy.get('svg[class="chakra-icon css-6ey7w3"]').eq(2).scrollIntoView().click();

    cy.wait(500);

    cy.contains('Manage User Data').scrollIntoView().should('be.visible');

    
    const download= Cypress.config('downloads');

    cy.task('listFilesInDownloads',download).then((fileNames)=>{
        cy.log('filename',fileNames);

        expect(fileNames).to.include('createUser Tempate V2.xlsx');
    })

    const downloadsFolder = Cypress.config('downloads');
    const fileName = 'createUser Tempate V2.xlsx';
    const filePath = `${downloadsFolder}/${fileName}`;
    
    cy.get('input[type="file"]').eq(0).attachFile(filePath);

    cy.wait(500);

    cy.get('select[class="chakra-select css-161pkch"]').select('Test');

    cy.contains('Add Users').scrollIntoView().click();

    cy.task('listFilesInDownloads', download).then((fileNames) => {
        expect(
          fileNames.some(file => 
            file.toLowerCase() === 'add_user_modified_excel.xlsx'.toLowerCase()
          )
        ).to.be.true;
      });
    

    })
})