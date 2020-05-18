import createAuthz from './createAuthz';

describe('createAuthz', () => {
  it('should never filter out things with undefined access', () => {
    const baseData = [
      {
        name: 'Tucker',
        color: 'BLUE',
      },
      {
        name: 'Church',
        color: 'BLUE',
      },
      {
        name: 'Caboose',
        color: 'BLUE',
        intelligence: 'very low',
      },
    ];
    // Test with a session
    const authzWithSession = createAuthz({});
    expect(authzWithSession.filter(baseData)).toEqual(baseData);

    // Test without a session
    const authzWithoutSession = createAuthz();
    expect(authzWithoutSession.filter(baseData)).toEqual(baseData);
  });

  it('should always filter out objects or functions that need access if there is no session data yet', () => {
    const baseData = [
      {
        name: 'Tucker',
        color: 'BLUE',
        access: session => session.awesome,
      },
      {
        name: 'Church',
        color: 'BLUE',
        access: {
          status: ['tired', 'so tired'],
        },
      },
    ];

    const authzWithoutSession = createAuthz();
    expect(authzWithoutSession.filter(baseData)).toHaveLength(0);
  });

  it('should always use truthiness of access if they are not objects or functions', () => {
    const baseData = [
      {
        name: 'Tucker',
        color: 'BLUE',
        access: true,
      },
      {
        name: 'Church',
        color: 'BLUE',
        access: 8,
      },
      {
        name: 'Caboose',
        color: 'BLUE',
        intelligence: 'very low',
        access: 'hello sir',
      },
      {
        name: 'Sarge',
        color: 'RED',
        rank: 'Also Sarge',
        access: false,
      },
      {
        name: 'Donut',
        color: 'LIGHTISH RED',
        actualColor: 'PINK',
        access: false,
      },
    ];

    // Test with a session
    const authzWithSession = createAuthz({});
    expect(authzWithSession.filter(baseData)).toEqual(baseData.slice(0, 3));

    // Test without a session
    const authzWithoutSession = createAuthz();
    expect(authzWithoutSession.filter(baseData)).toEqual(baseData.slice(0, 3));
  });

  it('should run access functions with the session data and filter based on truthiness', () => {
    const baseData = [
      {
        name: 'Tucker',
        color: 'BLUE',
        access: () => true,
      },
      {
        name: 'Church',
        color: 'BLUE',
        access: session => session.blue,
      },
      {
        name: 'Griff',
        color: 'ORANGE',
        whoHatesMe: 'everyone',
        access: session => session.red,
      },
      {
        name: 'Wyoming',
        color: 'White',
        whoHatesMe: 'everyone',
        access: () => false,
      },
    ];

    const authz = createAuthz({
      blue: true,
      red: false,
    });

    // First two are truthy, the rest are falsy
    expect(authz.filter(baseData)).toEqual(baseData.slice(0, 2));

    // Also test that evaluate works the same way
    // Church
    expect(authz.evaluate(baseData[1].access)).toBeTruthy();
    // Griff
    expect(authz.evaluate(baseData[2].access)).toBeFalsy();
  });

  it('should check the properties of the session object against properties of the access object', () => {
    const baseData = [
      {
        name: 'Griff',
        color: 'ORANGE',
        whoHatesMe: 'everyone',
        access: {
          team: ['RED', 'GRIFF'],
        },
      },
      {
        name: 'Simmons',
        color: 'MAROON',
        hates: 'Griff',
        loves: 'Sarge',
        access: {
          team: 'RED',
        },
      },
      {
        name: 'Wyoming',
        color: 'WHITE',
        access: {
          // access is an AND for different properties SO
          team: ['FREELANCE', 'BLUE'], // true
          members: 'Tex', // and false
          // = false
        },
      },
      {
        name: 'Donut',
        color: 'LIGHTISH RED',
        actualColor: 'PINK',
        access: {
          // friends with this member
          members: 'Caboose',
        },
      },
      {
        name: 'Tucker',
        color: 'BLUE',
        ghost: true,
        access: {
          team: 'BLUE',
        },
      },
      {
        name: 'Church',
        color: 'BLUE',
        access: {
          team: ['BLUE'],
        },
      },
      {
        name: 'Tex',
        color: 'GRAY',
        access: {
          team: ['FREELANCE', 'BLUE'],
          // former girlfriend of
          members: ['Church'],
        },
      },
    ];

    const authz = createAuthz({
      team: 'BLUE',
      members: ['Church', 'Tucker', 'Caboose'],
    });

    // First three are false, the rest are true
    expect(authz.filter(baseData)).toEqual(baseData.slice(3));

    // Also test that evaluate works the same way
    // Simmons
    expect(authz.evaluate(baseData[1].access)).toBeFalsy();
    // Tex
    expect(authz.evaluate(baseData[6].access)).toBeTruthy();
  });

  it('should memoize if session changes but not if session does not change', () => {
    const oldSession = {
      team: 'BLUE',
    };
    const newSession = {
      team: ['BLUE', 'FREELANCE'],
    };
    const oldAuthz = createAuthz(oldSession);

    expect(createAuthz(oldSession)).toBe(oldAuthz);
    expect(createAuthz(newSession)).not.toBe(oldAuthz);
    expect(createAuthz(newSession)).toBe(createAuthz(newSession));
  });
});
