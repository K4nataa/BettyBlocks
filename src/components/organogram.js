(() => ({
  name: 'Organogram',
  type: 'BODY_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { env, Query, useAllQuery, useFilter } = B;
    const { team, filter, displayError } = options;
    const where = useFilter(filter);
    const { gql } = window.MaterialUI;
    const isDev = env === 'dev';
    const GET_USERINFO = gql`
      query Item {
        allTeam {
          results {
            id
            name
            hierachyLevel
            teams {
              id
              hierachyLevel
              name
              webuserteams {
                webuser {
                  firstName
                  lastName
                }
              }
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
                      src="http://placekitten.com/55"
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
          <button onClick={clickHandler}>
            <i class="fas fa-arrow-down"></i>
          </button>
        </>
      );
    };

    //Creates the card itself and uses the TeamList to fill in the information.
    //Line 115/116 --> if there are teams, create a new card. (this is a recursive loop)
    const Card = props => {
      const { sector } = props;
      if (sector) {
        return (
          <>
            <ul>
              {sector.map(item => (
                <>
                  <li key={item.id}>
                    <span>
                      <div>
                        <h4>{item.name}</h4>
                        <i className="fas fa-chevron-up">
                          <expandButton name={item.name} />
                        </i>
                      </div>
                      <hr />
                      <div className={classes.employee_list}>
                        <a href="google.com">
                          {item.webuserteams?.length && (
                            <TeamList teammembers={item.webuserteams} />
                          )}
                        </a>
                      </div>
                    </span>
                    {item.teams?.length && <Card sector={item.teams} />}
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

    function RemoveDupes(data) {
      let obj = {};
      const result = [];
      data.forEach(item => {
        Object.keys(item).forEach(key => {
          //   if (obj[key] && obj[key] !== item[key]) {
          //    return (obj[key] = [obj[key], item[key]].flat());
          //}
          debugger;
          if (obj[key] && obj[key] !== item.teams[key]) {
            if (item.teams.length > 0) {
              obj = obj[key] = [obj[key], item[key]].flat();
            }
          } else {
            return;
          }
          //return (obj[key] = item[key]);
        });
        result.push(obj);
      });

      console.log(result);
    }

    //Creates a card that recursively loops through all cards using a GraphQL query.
    //TODO: Make use of the Betty DataModel and see if it is possible to filter out duplicates
    //and when you click on a button, pass an ID or Name so you display only that 'team' starting on HierarchyLevel 1
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
            // console.log(data);
            RemoveDupes(data.allTeam.results);
            return (
              <div className={classes.org_tree}>
                <Card sector={data.allTeam.results} />
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
