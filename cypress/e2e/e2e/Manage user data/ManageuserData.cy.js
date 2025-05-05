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

    
    
    cy.contains(' Download Template').should('be.visible').click();

    // cy.readFile(`${download}/createUser Tempate V2`).should('exist');

    cy.task('listFilesInDownloads',download).then((fileNames)=>{
        cy.log('filename',fileNames);

        expect(fileNames).to.include('createUser Tempate V2.xlsx');
    })


    })
})