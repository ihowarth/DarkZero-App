exports.createTeamCollection = function() {
    var benK = Alloy.createModel('team', {
        name           : 'Ben Knowles',
        occupation     : 'Hitman',
        favouriteGames : "Soda Drinker Pro, Spyro 2: Ripto's Rage, Windjammers, Street Fighter: The Movie: The Game",
        bio            : 'Runs a pretty awesome website called DarkZero.co.uk, where he has formed a team of super-human reviewers. Is also a time travelling cyborg who must stop SkyNet at all costs. Hasta la Vista, baby.',
        image          : '/Settings.png'
    });
    benK.save();
    Alloy.Collections.team.add(benK);

    var domS = Alloy.createModel('team', {
        name           : 'Dominic Sheard',
        occupation     : 'Energy drink tester',
        favouriteGames : 'lol',
        bio            : "I 'unno",
        image          : '/Information.png'
    });
    domS.save();
    Alloy.Collections.team.add(domS);

    var ianH = Alloy.createModel('team', {
        name           : 'Ian Howarth',
        occupation     : 'Application Dev',
        favouriteGames : 'Spelunky, Street Fighter IV, other stuff',
        bio            : 'meh',
        image          : '/Settings.png'
    });
    ianH.save();
    Alloy.Collections.team.add(ianH);

    var thomas = Alloy.createModel('team', {
        name           : 'Thomas',
        occupation     : 'Application Dev',
        favouriteGames : 'Spelunky, Street Fighter IV, other stuff',
        bio            : 'meh',
        image          : '/Settings.png'
    });
    thomas.save();
    Alloy.Collections.team.add(thomas);

    var simon = Alloy.createModel('team', {
        name           : 'Simon',
        occupation     : 'Application Dev',
        favouriteGames : 'Spelunky, Street Fighter IV, other stuff',
        bio            : 'meh',
        image          : '/Settings.png'
    });
    simon.save();
    Alloy.Collections.team.add(simon);

    Alloy.Collections.team.fetch();
};
