(() => ({
  name: 'Organogram',
  type: 'BODY_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { env, Query, useAllQuery, useFilter } = B;
    const { model, filter, displayError } = options;
    const where = useFilter(filter);
    const { gql } = window.MaterialUI;
    const isDev = env === 'dev';
    const GET_USERINFO = gql`
    query Item {
      allTeambridge(where: {parentTeam: {name: {eq: "Product"}}}) {
        results {
          id
          childTeam {
            id
            name
            hierarchyLevel
              webuserteams {
              webuser {
                firstName
                lastName
              }
            }
          }
          parentTeam {
            id
            name
            hierarchyLevel
          }
        }
      }
    }
    
    `;

    //Creates the icon, link and name for the Card.
    const TeamList = props => {
      const { teammembers } = props;
      if (teammembers.length > 0) {
        return (
          <>
            {teammembers.map(webuser => (
              <>
                <div className={classes.employee}>
                  <div className={classes.employee_img}>
                    <img
                      src="http://placekitten.com/420"
                      className={classes.profile_pic}
                      alt="Betty Logo"
                    />
                  </div>
                  <p>
                    {webuser.webuser
                      ? webuser.webuser.firstName +
                        ' ' +
                        webuser.webuser.lastName
                      : ''}
                  </p>
                </div>
              </>
            ))}
          </>
        );
      }
      return <p>-</p>;
    };
    //TODO: Create a clickable icon that onClick() shows or hides the underlying Cards
    //This isn't working correctly yet.
    const expandButton = props => {
      const { level, name } = props;
      const [state, setState] = React.useState(false);
      const clickHandler = () => {
        // if (state == false) setState(true);
        // else setState(false);
        setState(!true);
      };
      return (
        <>
          <button
            class="btn btn-link"
            data-toggle="collapse"
            data-target={classes.employee_list}
            aria-expanded="true"
            aria-controls="collapseOne"
          >
            <i class="fa" aria-hidden="true"></i>
            button
          </button>
        </>
      );
    };

    //Creates the card itself and uses the TeamList to fill in the information.
    //Line 119 --> if there are teams, create a new card. (this is a recursive loop)
    const Card = props => {
      const { sector } = props;
      if (sector) {
        return (
          <>
            <ul>
              {sector.map(teamBridge => (
                <>
                  <li key={teamBridge.id}>
                    <span>
                      <div>
                        <h4>{teamBridge.childTeam.name}</h4>
                        <i className="fas fa-chevron-up">
                          <expandButton />
                        </i>
                      </div>
                      <hr />
                      <div className={classes.employee_list}>
                        <a href="google.com">
                          {teamBridge.childTeam.webuserteams?.length && (
                            <TeamList teammembers={teamBridge.childTeam.webuserteams} />
                          )}
                        </a>
                      </div>
                    </span>
                    {teamBridge.childTeam?.length && <Card sector={teamBridge.childTeam} />}
                    {/* {item.teams && (item.teams > 0) &&
                      item.teams.map(team => <Card sector={team.teams} />)} */}
                  </li>
                </>
              ))}
            </ul>
          </>
        );
      }
      return <> </>;
    };


    // Create a Sort function that uses your 'data' which originates from LoadCards()
    // ref: https://stackoverflow.com/questions/56993745/restructure-json-format-in-react-native
    function SortJSON(data) {
      //TODO: use your data from LoadCards() and loop through each key
      // then you have to somehow magically order these with statements so they fall
      //in the right hierarchy... good luck :p

      //We moeten een nieuwe array bouwen die de data sorteert van je Graphql array:
      // 1: We moeten een nieuwe lege array aanmaken.
      //    Daarna loopen we door de volledige data en maken we een nieuw object aan
      //    voor ieder childTeam waar we alle nodige properties van het opgehaalde
      //    object in stoppen, We moeten voor ieder nieuw childTeam object een property toevoegen
      //    waar we de waarde van de parentTeam.name (parentName) in opslaan
      //    en een lege array property die we later gaan gebruiken voor de eventuele childTeams van het object
      // 2: Push al deze nieuwe objecten in de nieuwe array.
      // 3: Nu hebben we een array van teamObjecten die allemaal op hetzelfde level staan.
      //    Dan moeten we ieder teamObject(1) in deze nieuwe array checken of deze een parentName waarde heeft.
      //    Zo ja, dan moeten we in de array checken of er een ander teamObject(2) bestaat met deze naam
      //    en teamObject(2) pushen naar teamObject(1).childrenArray[] en teamObject(2) verwijderen uit de array. Good luck :P


      debugger;
      const teams = [];
      data.allTeambridge.results.forEach((newTeam)  => {
        var newTeam = {
          id: newTeam.id,
          childId: newTeam.childTeam.id,
          childName: newTeam.childTeam.name,
          parentName: newTeam.parentTeam.name,
          childWebusers: [],
          childArray: [],
        };
        // console.log(newTeam);
        // console.log("My parent team is: ", newTeam.parentTeam);
        teams.push(newTeam);
      });
      console.log(teams);
    }

    //Creates a card that recursively loops through all cards using a GraphQL query.
    //TODO: Make use of the Betty DataModel and see if it is possible to filter out duplicates
    //and when you click on a button, pass an ID or Name so you display only that 'team' starting on HierarchyLevel 0
    function LoadCards() {
      return (
        <Query fetchPolicy="network-only" query={GET_USERINFO}>
          {({ loading, error, data }) => {
            if (loading) {
              return 'Loading...';
            }
            if (error) {
              return `Error! ${error.Message}`;
            }

            SortJSON(data);
            return (
              <div className={classes.org_tree}>
                <Card sector={data.allTeambridge.results} />
              </div>
            );
          }}
        </Query>
      );
    }

    if (isDev) {
      return (
        <div>
          <p>Howdy there stranger</p>
        </div>
      );
    }

    return LoadCards();
  })(),
  styles: () => () => ({
    body: {
      paddingLeft: '10px',
      fontFamily: '"Ubuntu", sans-serif',
    },
    '*': {
      margin: '0',
      padding: '0',
    },
    a: {
      textDecoration: 'none',
      color: 'rgb(0, 0, 0)',
    },
    org_tree: {
      display: 'flex',
      justifyContent: 'center',
      paddingTop: '10px',

      '& ul': {
        position: 'relative',
        padding: '1em 0',
        margin: '0 auto',
        textAlign: 'center',
      },
      '& ul:first-child': {
        overflow: 'auto',
      },

      '& ul::after': {
        content: '""',
        display: 'table',
        clear: 'both',
      },

      '& li': {
        display: 'inline-block',
        verticalAlign: 'top',
        textAlign: 'center',
        listStyleType: 'none',
        position: 'relative',
        padding: '1em 0.5em 0 0.5em',
      },
      '& li::before, & li::after': {
        content: '""',
        position: 'absolute',
        top: '0',
        right: '50%',
        borderTop: '1px solid #ccc',
        width: '50%',
        height: '16px',
      },
      '& li::after': {
        right: 'auto',
        left: '50%',
        borderLeft: '1px solid #ccc',
      },
      '& li:only-child::after, & li:only-child::before': {
        display: 'none',
      },
      '& li:only-child': {
        padding: '0',
      },
      '& li:only-child span': {
        top: '0',
      },
      '& li:first-child::before, & li:last-child::after': {
        border: '0 none',
      },
      '& li:last-child::before': {
        borderRight: '1px solid #ccc',
        borderRadius: '0 5px 0 0',
      },
      '& li:first-child::after': {
        borderRadius: '5px 0 0 0',
      },
      '& li span:not(:last-child) div:first-child': {
        cursor: 'pointer',
      },
      '& ul ul::before': {
        content: '""',
        position: 'absolute',
        top: '0',
        left: '50%',
        borderLeft: '1px solid #ccc',
        width: '0',
        height: '1em',
      },
      '& li span': {
        border: '1px solid #ccc',
        padding: '0.5em 0.75em',
        textDecoration: 'none',
        display: 'inline-block',
        borderRadius: '5px',
        color: '#333',
        position: 'relative',
        top: '1px',
        whiteSpace: 'normal',
        cursor: 'default',
        boxShadow: '0px 0px 3px 1px #e5e5e5',
        zIndex: '2',
        background: '#fff',
      },
      '& li span:hover, & li span:hover + ul li span': {
        background: '#e5104d',
        color: '#fff',
        border: '1px solid #e5104d',
      },
      '& li span:hover a div': {
        color: '#fff',
      },
      '& li span:hover + ul li span a div, & li span:hover p': {
        color: '#fff',
      },
      '& li span:hover + ul li span hr, & li span:hover hr': {
        borderColor: '#fff',
      },
      '& li span:hover + ul li::after, & li span:hover + ul li::before, & li span:hover + ul::before, & li span:hover + ul ul::before': {
        borderColor: '#e5104d',
      },
      '& li span h4': {
        fontSize: '14px',
        margin: '0',
        padding: '0.5em 0',
      },
    },

    profile_pic: {
      width: '35px',
      height: '35px',
      flexShrink: '0',
      objectFit: 'cover',
      borderRadius: '50%',
    },
    employee: {
      display: 'flex',
      alignItems: 'center',
      fontSize: '12px',
      marginBottom: '2px',
    },
    employee_img: {
      borderRadius: '50%',
      position: 'relative',

      '&::after': {
        position: 'absolute',
        left: '0',
        top: '0',
        right: '0',
        bottom: '0',
        content: '""',
        boxShadow: 'inset 0 0 0 2px #fff, 0px 0px 2px 0px #999',
        borderRadius: '50%',
      },
    },

    img: {
      verticalAlign: 'middle',
      borderStyle: 'none',
    },
    employee_list: {
      padding: '0.5em 0 0 0.4em',
    },
  }),
}))();
