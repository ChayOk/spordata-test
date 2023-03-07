// import React from 'react';
// import axios from 'axios';


// export class TournamentList extends React.Component {
//   state = {
//     tournaments: [],
//     events: []
//   }

//   componentDidMount() {
//     axios.get(`http://localhost:8081/api/tournaments`)
//       .then(res => {
//         const tournaments = res.data;
//         this.setState({ tournaments });
//       })

//     axios.get(`http://localhost:8081/api/events`)
//     .then(res => {
//         const events = res.data;
//         this.setState({ events });
//     })
//   }

//   render() {
//     return (
//       <>
//         { this.state.tournaments.map(tournament => 
//         <li>
//           <label className='labelBtn'>
//             <span className='tournamentTitle'>
//               {tournament.tournament_name}
//             </span>
//             <input type="checkbox" class="tournamentCheckbox" />
//             {/* <div></div> */}

//           </label>
//         </li>
//         )}
//       </>
//     )
//   }
// }

import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateTournaments } from '../store/sportsActions';

class TournamentList extends React.Component {

  render() {
        return (
          <>
            { this.props.tournaments.map(tournament => 
            <li>
              <label className='labelBtn'>
                <span className='tournamentTitle'>
                  {tournament.tournament_name}
                </span>
                <input type="checkbox" className="tournamentCheckbox" />
                {/* <div></div> */}
    
              </label>
            </li>
            )}
          </>
        )
      }
    }

const mapStateToProps = (state) => ({
  tournaments: state.tournaments,
  // events: state.events
});

const mapDispatchToProps = {
  updateTournaments
};

export default connect(mapStateToProps, mapDispatchToProps)(TournamentList);