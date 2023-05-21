import random
import networkx as nx
import matplotlib.pyplot as plt

av = [('name1', 'name2')]

students = ['name1',
            'name2',
            'name3',
            # ...
            ]

prt = [('name1', 'name2'),
       ('name2', 'name3'),
       # ...
       ]

def get_matched(s, p):
    alreadyPartnered = {i: [i] for i in s}
    for student in s:
        for team in p:
            if student not in team:
                continue
            alreadyPartnered[student].extend([i for i in team if i != student])
    return alreadyPartnered

def get_unmatched(s, p, alreadyPartnered):
    unmatched = {i: [] for i in s}
    for i in unmatched:
        unmatched[i] = [j for j in s if j not in alreadyPartnered[i]]
    return unmatched

def make_graph(s, d):
    g = nx.Graph()
    for i in s:
        g.add_node(i)
    for i in d:
        for nbr in d[i]:
            if i == nbr:
                continue
            g.add_edge(i, nbr)
    return g

def get_random_pairing(s1, s2):
    if len(s1) == len(s2) == 1:
        return s1, s2
    while any([s1[i] == s2[i] for i in range(len(s1))]):
        random.shuffle(s2)
    return s1, s2

def get_partners(s1, s2, alreadyPartnered):
    partners = []
    unmatched = []
    matched_students = set()
    for i in range(len(s1)):
        if s1[i] in matched_students or s2[i] in matched_students or s2[i] in alreadyPartnered[s1[i]]:
            if s1[i] not in matched_students:
                unmatched.append(s1[i])
            if s2[i] not in matched_students:
                unmatched.append(s2[i])
            continue
        else:
            if [s2[i], s1[i]] not in partners:
                partners.append([s1[i], s2[i]])
                alreadyPartnered[s1[i]].append(s2[i])
                alreadyPartnered[s2[i]].append(s1[i])
                matched_students.add(s1[i])
                matched_students.add(s2[i])
                if s1[i] in unmatched:
                    unmatched.remove(s1[i])
                if s2[i] in unmatched:
                    unmatched.remove(s2[i])
    return partners, list(set(unmatched)), alreadyPartnered

def reshuffle_matches(partners, unmatched, g):
    dens = 0
    while len(unmatched) > 1:
        breakflag = False
        sg = nx.subgraph(g, unmatched)
        dens = nx.density(sg)
        if dens < 1:
            for s1 in unmatched:
                for s2 in unmatched:
                    if s2 not in list(sg.neighbors(s1)):
                        partners.append([s1, s2])
                        unmatched.remove(s1)
                        unmatched.remove(s2)
                        sg.remove_node(s1)
                        sg.remove_node(s2)
                        breakflag = True
                    if breakflag:
                        break
                if breakflag:
                    break
        else: break

    if dens == 1.:
        for student in unmatched:
            for i in range(len(partners)):
                check = partners[i] + [student]
                sg = nx.subgraph(g, check)
                dens = nx.density(sg)
                if dens == 1.:
                    continue
                for student2 in partners[i]:
                    if student2 not in list(sg.neighbors(student)):
                        pass

    return partners

def get_matching(s, alreadyPartnered):

    unmatched = s[:]
    partners = []
    num_solo = len(unmatched)
    print(f'Starting with unmatched={unmatched}')
    while unmatched:
        s1, s2 = get_random_pairing(unmatched[:], unmatched[:])
        string1 = " ".join(s1)
        string2 = " ".join(s2)
        print(f'Trying to match:\n\t{string1}\n\t{string2}')
        newpartners, unmatched, alreadyPartnered = get_partners(s1, s2, alreadyPartnered)
        partners.extend(newpartners)
        print(f'Current partners={partners}')
        if len(unmatched) in [num_solo, 1]:
            break
        num_solo = len(unmatched)

    return partners, unmatched, alreadyPartnered

def insert_one(partners, student, g):
    for i in range(len(partners)):
        check = partners[i] + [student]
        sg = nx.subgraph(g, check)
        dens = nx.density(sg)
        if dens > .5:
            continue
        partners[i].append(student)
        break
    return partners

def make_teams(s, p, alreadyWorkedTogether=True):

    alreadyPartnered = get_matched(s, p)
    unmatched = get_unmatched(s, p, alreadyPartnered)

    if alreadyWorkedTogether:
        mydict = alreadyPartnered
    else:
        mydict = unmatched

    g = make_graph(s, mydict)

    partners, unmatched, alreadyPartnered = get_matching(s, alreadyPartnered)

    if len(unmatched) == 1:
        partners = insert_one(partners, unmatched[0], g)
        unmatched.pop()
    elif unmatched:
        partners = reshuffle_matches(partners, unmatched, g)

    for t in partners:
        print(tuple(t))
    print('UNMATCHED: ', unmatched)

    nx.draw_networkx(g, node_color=(.5, .5, .9, .5), edge_color=(.75, .75, .75, .75))
    plt.show()

def maketeamsof(n, s):
    random.shuffle(s)
    numteams = len(s) // n
    numleft = len(s) % n
    if numleft > n / 2:
        numteams += 1
    teams = [[] for i in range(numteams)]
    for i in range(len(s)):
        teams[i%numteams].append(s[i])
    for i in range(len(teams)):
        for a in av:
            if all([k in teams[i] for k in a]):
                p1 = teams[(i-1)%numteams][0]
                teams[(i-1)%numteams][0] = teams[i][teams[i].index(a[0])]
                teams[i][teams[i].index(a[0])] = p1

    for t in teams:
        print(tuple(t))

make_teams(students, prt)
# maketeamsof(4, students)
