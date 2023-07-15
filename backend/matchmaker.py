import random
import itertools
import math

class Student:
    def __init__(self, name, rating=3):
        self.name = name
        self.rating = rating

class Graph:
    def __init__(self):
        self.vertices = {}

    def add_vertex(self, vertex):
        if vertex not in self.vertices:
            self.vertices[vertex] = {}

    def add_edge(self, v1, v2, weight):
        self.add_vertex(v1)
        self.add_vertex(v2)
        self.vertices[v1][v2] = weight
        self.vertices[v2][v1] = weight

    def get_edge_weight(self, v1, v2):
        if v1 in self.vertices and v2 in self.vertices[v1]:
            return self.vertices[v1][v2]
        else:
            return float('inf')

    def delete_vertex(self, vertex):
        if vertex in self.vertices:
            for v in self.vertices[vertex]:
                del self.vertices[v][vertex]
            del self.vertices[vertex]

    def measure_group_weight(self, group):
        total_weight = 0
        for v1, v2 in itertools.combinations(group, 2):
            total_weight += self.get_edge_weight(v1, v2)
        return total_weight

    def swap_students(self, groups):
            for g in groups:
                random.shuffle(g)
            random.shuffle(groups)
            group_weights = [self.measure_group_weight(group) for group in groups]

            for i, group1 in enumerate(groups[:-1]):
                weight1 = group_weights[i]
                for j, group2 in enumerate(groups[i + 1:], start=i + 1):
                    weight2 = group_weights[j]

                    for pair in itertools.product(range(len(group1)), range(len(group2))):
                        k, l = pair

                        if k == l:
                            continue

                        # Perform the swap
                        group1[k], group2[l] = group2[l], group1[k]

                        # Calculate the weight differences
                        delta1 = self.measure_group_weight(group1) - weight1
                        delta2 = self.measure_group_weight(group2) - weight2

                        # Compare the weight differences
                        if delta1 + delta2 > 0:
                            # Swap back if the rating is not improved
                            group2[l], group1[k] = group1[k], group2[l]
                        else:
                            # Update the group weights and running totals
                            weight1 += delta1
                            weight2 += delta2
                            group_weights[i] += delta1
                            group_weights[j] += delta2


    def get_lowest_weight_group(self, previous_pairs, group_size=2):
        group_size = int(group_size)
        min_weight_grouping = []

        dead_vertices = set()
        ranked_vertices = list(self.vertices.keys())

        random.shuffle(ranked_vertices)
        for p in range(len(ranked_vertices)):
            v1 = ranked_vertices[p]
            if v1 in dead_vertices:
                continue

            lowest_weight_connections = []
            for v2 in (set(self.vertices) - dead_vertices):
                edge_weight = self.get_edge_weight(v1, v2)
                if len(lowest_weight_connections) < group_size + 1 or edge_weight < lowest_weight_connections[group_size][1]:
                    lowest_weight_connections.append((v2, edge_weight))
                    lowest_weight_connections.sort(key=lambda x: x[1])

            group = []
            if (len(self.vertices) - len(dead_vertices)) % group_size != 0:
                actual_group_size = group_size + 1
            else:
                actual_group_size = group_size

            for v2, _ in lowest_weight_connections[:actual_group_size - 1]:
                dead_vertices.add(v2)
                group.append(v2)


            group.append(v1)
            dead_vertices.add(v1)

            min_weight_grouping.append(group)
        return min_weight_grouping

def update_previous_pairs(grouping, previous_pairs):
    for group in grouping:
        for v1 in group:
            for v2 in group:
                if v1 != v2:
                    found = False
                    for p in previous_pairs:
                        if v1 in p[:2] and v2 in p[:2]:
                            p[2] += .5
                            found = True
                            break
                    if found == False:
                        previous_pairs.append([v1, v2, .5])
    return previous_pairs

def make_groups_with_equal_teammates(graph, students, previous_pairs, emphasis_on_new_teams, group_size):
    group_size = int(group_size)

    # Add each student as a node to the graph
    for student in students:
        graph.add_vertex(student)

    # Get to overall average rating
    average_rating = sum(student.rating for student in students) / len(students)

    # Assign weights to edges between students
    for i in range(len(students)):
        for j in range(i + 1, len(students)):
            student1 = students[i]
            student2 = students[j]

            # Calculate the edge weight based on ratings
            edge_weight = abs(student1.rating - student2.rating)

            # Check the number of occurrences in previous pairings and increase the edge weight
            pair_count = 0
            is_forbidden = False
            for p in previous_pairs:
                if (student1 in p and student2 in p):
                    pair_count = p[2]  # data should look like this: (student1, student2, pair_count)
                    if pair_count == -1:
                        is_forbidden = True
            edge_weight += pair_count * emphasis_on_new_teams

            # Add weighted edge to the graph
            if pair_count != -1:
                graph.add_edge(student1, student2, edge_weight)

    # Find min weight matching
    matching = graph.get_lowest_weight_group(previous_pairs, group_size)
    for i in range(3):
        graph.swap_students(matching)
    update_previous_pairs(matching, previous_pairs)
    return matching


def make_balanced_groups(graph, students, previous_pairs, emphasis_on_new_teams, group_size):
    group_size = int(group_size)

    for student in students:
        graph.add_vertex(student)

    # Calculate the length of students list
    num_students = len(students)

    # Get the overall average rating
    average_rating = sum(student.rating for student in students) / num_students

    # Convert previous_pairs to a set of tuples for pair count calculation
    previous_pairs_set = set((p[0], p[1]) for p in previous_pairs)

    # Assign weights to edges between students
    for i in range(num_students):
        student1 = students[i]
        for j in range(i + 1, num_students):
            student2 = students[j]

            # Calculate the edge weight based on ratings
            edge_weight = abs((student1.rating + student2.rating)/2 - average_rating)

            # Check the number of occurrences in previous pairings and increase the edge weight
            pair_count = sum(1 for p in previous_pairs_set if student1 in p and student2 in p)
            is_forbidden = any(p[2] == -1 for p in previous_pairs if student1 in p and student2 in p)
            edge_weight += pair_count * emphasis_on_new_teams

            # Add weighted edge to the graph
            if not is_forbidden:
                graph.add_edge(student1, student2, edge_weight)

    # Find min weight matching
    matching = graph.get_lowest_weight_group(previous_pairs, group_size)
    for i in range(3):
        graph.swap_students(matching)
    update_previous_pairs(matching, previous_pairs)
    return matching

def make_random_groups(graph, students, previous_pairs, emphasis_on_new_teams, group_size):
    group_size = int(group_size)


    for student in students:
        graph.add_vertex(student)

    # Calculate the length of students list
    num_students = len(students)

    # Convert previous_pairs to a set of tuples for pair count calculation
    previous_pairs_set = set((p[0], p[1]) for p in previous_pairs)

    # Assign weights to edges between students
    for i in range(num_students):
        student1 = students[i]
        for j in range(i + 1, num_students):
            student2 = students[j]
            edge_weight = 0
            pair_count = 0
            for p in previous_pairs:
                if student1 in p and student2 in p:
                    pair_count = p[2]
            # Check the number of occurrences in previous pairings and increase the edge weight
            is_forbidden = (edge_weight == -1)
            edge_weight += pair_count * emphasis_on_new_teams

            # Add weighted edge to the graph
            if not is_forbidden:
                graph.add_edge(student1, student2, edge_weight)

    # Find min weight matching
    matching = graph.get_lowest_weight_group(previous_pairs, group_size)
    for i in range(3):
        graph.swap_students(matching)

    previous_pairs = update_previous_pairs(matching, previous_pairs)
    return matching


def make_groups_with_leaders(graph, students, previous_pairs, emphasis_on_new_teams, group_size):
    group_size = int(group_size)

    # Put leaders in a group
    leader_count = len(students) // group_size
    leaders = students[:leader_count]

    for student in students:
        graph.add_vertex(student)

        # Get the overall average rating
        average_rating = sum(student.rating for student in students) / len(students)

    # Convert previous_pairs to a set of tuples for pair count calculation
    previous_pairs_set = set((p[0], p[1]) for p in previous_pairs)

    # Assign weights to edges between students
    for i in range(len(students)):
        student1 = students[i]
        for j in range(i + 1, len(students)):
            student2 = students[j]

            # make edges for balenced teams
            edge_weight = abs((student1.rating + student2.rating) / 2 - average_rating)

            # make edge between leaders greater
            if student1 in leaders and student2 in leaders:
                edge_weight += 10

            pair_count = 0
            for p in previous_pairs:
                if student1 in p and student2 in p:
                    pair_count = p[2]
            # Check the number of occurrences in previous pairings and increase the edge weight
            is_forbidden = (edge_weight == -1)
            edge_weight += pair_count * emphasis_on_new_teams

            # Add weighted edge to the graph
            if not is_forbidden:
                graph.add_edge(student1, student2, edge_weight)

    # Find min weight matching
    matching = graph.get_lowest_weight_group(previous_pairs, group_size)
    for i in range(3):
        graph.swap_students(matching)

    previous_pairs = update_previous_pairs(matching, previous_pairs)
    return matching

