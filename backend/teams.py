from matchmaker import (Student, Graph, make_groups_with_equal_teammates,
                        make_balanced_groups, make_groups_with_leaders)


options = {
    'equal ratings': make_groups_with_equal_teammates,
    'balanced': make_balanced_groups,
    'teams with leaders': make_groups_with_leaders
}


def makeTeams(matching_option, participants, size, previous_pairs=[]) -> list:
    participants_lst = []
    for p in participants:
        participants_lst.append(Student(p[0], p[-1]))

    graph = Graph()
    option = options[matching_option]

    teams = option(graph=graph, students=participants_lst,
                   previous_pairs=previous_pairs, emphasis_on_new_teams=1, group_size=int(size))

    team_names = []
    for team in teams:
        team_names.append([t.name for t in team])
    return team_names
