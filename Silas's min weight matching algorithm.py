import networkx as nx


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

    def get_edge(self, v1, v2):
        if v1 in self.vertices and v2 in self.vertices[v1]:
            return self.vertices[v1][v2]
        else:
            return None


def pair_students(students, previous_pairs, emphasis_on_new_teams, forbidden_pairs):
    graph = nx.Graph()

    # Add students as nodes to the graph
    graph.add_nodes_from(students)

    # Get to overall average rating
    average_rating = sum(student.rating for student in students) / len(students)

    # Assign weights to edges between students
    for i in range(len(students)):
        for j in range(i + 1, len(students)):
            student1 = students[i]
            student2 = students[j]

            # Calculate the edge weight based on ratings
            edge_weight = abs((student1.rating + student2.rating)/2 - average_rating)

            # Check the number of occurrences in previous pairings and increase the edge weight
            pair_count = sum(1 for pair in previous_pairs if student1 in pair and student2 in pair)
            edge_weight += pair_count * emphasis_on_new_teams

            is_forbidden = False
            # Check for forbidden pairs
            for bad_pair in forbidden_pairs:
                if (bad_pair[0] == student1.name and bad_pair[1] == student2.name) or (bad_pair[1] == student1.name and bad_pair[0] == student2.name):
                    print("Forbidden pair found.", student1.name, student2.name)
                    is_forbidden = True

            # Add weighted edge to the graph
            if is_forbidden == False:
                graph.add_edge(student1, student2, weight=edge_weight)


    # Find maximum weight matching
    matching = nx.min_weight_matching(graph, weight='weight', maxcardinality=True)

    # Create list of paired students
    paired_students = []
    for student1, student2 in matching:
        paired_students.append([student1, student2])

    # Handle the case of an odd number of teams
    if len(students) % 2 != 0:
        # find the unpared student
        unpaired_student = None
        for pair in paired_students:
            for i in range(len(pair)):
                if pair not in paired_students[i]:
                    unpaired_student = pair[i]
                    break

        # Assign unpaired student to team with a low average rating
        lowest_average_rating = float('inf')
        lowest_average_team = None
        for i in range(len(paired_students)):
            team_average_rating = (paired_students[i][0].rating + paired_students[i][1].rating) / 2
            if team_average_rating < lowest_average_rating:
                lowest_average_rating = team_average_rating
                lowest_average_team = i

        paired_students[lowest_average_team].append(unpaired_student)
        unpaired_student = None

    # Update previous pairs list
    previous_pairs.extend(paired_students)

    return paired_students


def main():
    # Example usage of the pair_students function
    students = [
        Student("DAVID1", 1),
        Student("Sarah", 4),
        Student("Mike", 4),
        Student("Emily", 2),
        Student("Jessica", 5),
        Student("DAVID2", 5),
        Student("Olivia", 5),
        Student("Matthew", 3),
        Student("Sophia", 2),
        Student("Daniel", 1),
        Student("Emma", 3),
        Student("Jacob", 5),
        Student("Silas", 2)
        # ...
    ]

    # Previous student pairings
    previous_pairs = [
        # ...
    ]

    # Special pairs of students that should never be paired
    forbidden_pairs = [
        # ...
        ("DAVID1", "DAVID2")
    ]
    emphasis_on_new_teams = 0.5

    paired_students = pair_students(students, previous_pairs, emphasis_on_new_teams, forbidden_pairs)
    choice = 'y'
    while choice.lower() == 'y':

        # Get to overall average rating
        max_student_rating = 0;
        for student in students:
            if student.rating > max_student_rating:
                max_student_rating = student.rating


        # run the student pairing script
        paired_students = pair_students(students, previous_pairs, emphasis_on_new_teams, forbidden_pairs)

        # Print the paired students
        for pair in paired_students:
            team_average_rating = 0;
            for i in range(len(pair)):
                print(pair[i].name)
                # if i != len(pair) - 1:
                    # print("&")
                team_average_rating = team_average_rating+ pair[i].rating
            print(team_average_rating)

        # Ask the user if they want to generate another pairing
        choice = input("\nGenerate another pairing? (y/n): \n")



if __name__ == "__main__":
    main()
