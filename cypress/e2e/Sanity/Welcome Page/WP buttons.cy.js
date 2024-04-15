import url from '../../../fixtures/urls.json';
import un from '../../../fixtures/UN&PASS.json';

describe('WP buttons',()=>{
    it('Checking Wp buttons',()=>{
        const selectedEnvironments=url.selectedEnvironment;
        const selectUrl=url.environments[selectedEnvironments];

        cy.visit(selectUrl);
        cy.wait(1500);
        cy.contains('Login').click();
        cy.wait(1500);
        cy.get('input[id="email"]').type(un.Un);
        cy.wait(1500);
        cy.get('button[type="submit"]').click();
        cy.wait(15000);
        cy.contains('Verify').click();
        cy.wait(1500);
        cy.get('body').then(($bodyText)=>{
            const bodyText=$bodyText.text();
            if(bodyText.includes('Add Beneficiary ')){
                should('exist');
            }else{
                cy.get('svg[class="DashBoard_floatingbutton__JYFh9"]').should('exist');
            }
        })
        cy.contains('SELF').prev().invoke('text').then((self)=>{
            const selfname = self.split(' ').map(word => {
                return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            }).join(' ');
            cy.log('selfname',selfname);
            cy.contains('Welcome').next().prev().invoke('text').then((wl)=>{
                cy.log('wl',wl);
                const wlname=wl.split('Welcome')[1].trim().replace(',','');
                expect(selfname.trim()).to.equal(wlname.trim());
            })
        })
        cy.get('body').then(($bodyText)=>{
            const bodyText=$bodyText.text();
            if(bodyText.includes('Edit Profile')){
                cy.contains('Edit Profile').then(($elments)=>{
                    const noofele=$elments.length;
                    console.log('noofel',noofele);
                    for(let i=0;i<noofele;i++){
                        console.log('noofele',noofele);
                        cy.wrap($elments.eq(i)).should('be.visible').should('not.be.disabled');
                        console.log('i',i);
        
                    }
                })
            }else{
            }
        })
       
        cy.wait(1500);
        cy.contains('View Profile').then(($elements)=>{
            const no=$elements.length;
            for(let i=0;i<no;i++){
                console.log('no',no);
                cy.wrap($elements.eq(i)).should('be.visible').should('not.be.disabled');
                console.log('i',i);
            }
        })
        cy.wait(1500);
        cy.contains('Complete Profile').then(($elements)=>{
            const no=$elements.length;
            for(let i=0;i<no;i++){
                console.log('no',no);
                cy.wrap($elements.eq(0)).should('be.visible').should('not.be.disabled');
            }
        })
        cy.get('button[class="chakra-button chakra-menu__menu-button css-7pfzb9"]').should('be.visible').should('not.be.disabled');
        cy.wait(1500);
        cy.get('button[class="chakra-button css-cfauig"]').eq(0).click();
        cy.wait(1500);
        cy.get('body').contains('Please scan if you find me in any Medical Emergency').should('exist');
        cy.wait(1500);
        cy.contains('Download').should('be.visible').should('not.be.disabled');
        cy.wait(1500);
        cy.contains('Close').should('be.visible').should('not.be.disabled').click();
        cy.wait(1500);
        cy.get('button[class="chakra-button css-1o5vbmg"]').eq(0).should('be.visible').should('not.be.disabled').click();
        cy.wait(1500);
        cy.contains('Emergency Call').should('be.visible').should('not.be.disabled');
        cy.wait(1500);
        cy.contains('Make Call').should('be.visible').should('not.be.disabled');
        cy.wait(1500);
        cy.contains('Cancel').should('be.visible').should('not.be.disabled').click();
    })
})