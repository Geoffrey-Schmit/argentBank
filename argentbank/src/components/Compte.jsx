import PropTypes from 'prop-types'

function Compte({ titre, montant, description }) {
  return (
    <section className="compte">
      <div>
        <h3> {titre} </h3>
        <p className="compte-montant"> {montant} </p>
        <p className="compte-description"> {description} </p>
      </div>
      <div className="cta">
        <button> View transactions </button>
      </div>
    </section>
  )
}

Compte.propTypes = {
  titre: PropTypes.string.isRequired,
  montant: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default Compte
