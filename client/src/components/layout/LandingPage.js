import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className='content-area'>
    <Fragment>
      <h1>DIN BEDRIFT - DINE BEHOV</h1>

      <h4>En lavterskels markedsplass som digitaliserer bestillingsprosessen mellom små bedrifter i et lokalt økosystem.</h4>

      <h5>En åpen plattform med gratis tilgang til å registrere din bedrift med dine produkter. Gjennomfør bestillinger og salg på en enkel og oversiktelig måte. Ved større katalog/omsetning abonnerer du på PRO-planen uten begrensninger, eller ENTERPRISE-planen med integrasjoner. Produkter og firmaer er tilgjengelige for søk uten registrering.</h5>

      <h5>Handel mellom små bedrifter er tradisjonelt basert på tillit. Dette foregår i lokale økosystemer og håndteres via telefon og e-post. Alternativer for å digitalisere prosessen er rettet mot større selskaper eller isolerte enkeltbedrifter, og er ofte kun tilgjengelige på forespørsel.</h5>

      <Link to='/login'><button>Logg inn</button></Link>
      <button>Registrering</button>
 
    </Fragment>
    </div>
  )
}

export default LandingPage;
