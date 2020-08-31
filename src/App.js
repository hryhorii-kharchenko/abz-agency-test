import React from 'react';
import ReactTooltip from 'react-tooltip';

import AboutSection from './components/AboutSection';
import BannerSection from './components/BannerSection';
import Layout from './components/Layout';
import RegisterSection from './components/RegisterSection';
import UsersSection from './components/UsersSection';

class App extends React.Component {
  state = {
    users: [],
    userId: null,
    totalUsers: null,
    isLoading: false,
    isComplete: false,
    isSideDrawerActive: false,
  };

  componentDidMount() {
    this.fetchUsers();
  }

  setIsSideDrawerActive = (value) => {
    this.setState({ isSideDrawerActive: value });
  };

  showMoreClickHandler = () => {
    this.setState({ isLoading: true });
    this.fetchUsers();
  };

  fetchUsers = (clearOldUsers = false) => {
    const offset = clearOldUsers ? 0 : this.state.users.length;
    const numberToFetch = window.innerWidth < 600 ? 3 : 6;

    fetch(
      `https://frontend-test-assignment-api.abz.agency/api/v1/users?offset=${offset}&count=${numberToFetch}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (!data.success) throw new Error(data.message);

        this.setState((oldState) => ({
          users: clearOldUsers
            ? [...data.users]
            : oldState.users.concat(data.users),
          totalUsers: data.total_users,
        }));
      })
      .then(() => {
        if (this.state.users.length >= this.state.totalUsers)
          this.setState({ isComplete: true });
      })
      .then(() => setTimeout(() => ReactTooltip.rebuild()))
      .catch((error) => console.log(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  setUserId = (id) => {
    this.setState({ userId: id });
  };

  render() {
    const { users, isLoading, isComplete, isSideDrawerActive } = this.state;

    return (
      <>
        <main id="application" className="App">
          <Layout
            isSideDrawerActive={isSideDrawerActive}
            activateSideDrawer={() => this.setIsSideDrawerActive(true)}
            deactivateSideDrawer={() => this.setIsSideDrawerActive(false)}
          >
            <BannerSection />
            <AboutSection />
            <UsersSection
              users={users}
              isLoading={isLoading}
              isComplete={isComplete}
              showMoreClickHandler={this.showMoreClickHandler}
            />
            <RegisterSection
              clearUsers={() => this.fetchUsers(true)}
              setUserId={this.setUserId}
            />
          </Layout>
        </main>
        <ReactTooltip
          place="bottom"
          effect="solid"
          textColor="#fefefe"
          backgroundColor="black"
          arrowColor="transparent"
          className="tooltip"
        />
      </>
    );
  }
}

export default App;
