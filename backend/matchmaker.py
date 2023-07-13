import random
import itertools
# import tkinter as tk
# from tkinter import font
import networkx as nx
import matplotlib.pyplot as plt


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

    def draw_graph(self):
        # Create an empty graph
        G = nx.Graph()
        # Clear the graph window
        plt.clf()
        # Add edges with pair counts as edge attributes
        for v1 in self.vertices:
            for v2 in self.vertices:
                if v1 != v2:
                    edge = self.get_edge_weight(v1, v2)
                    G.add_edge(v1.name, v2.name, weight=edge)

        # Extract edge weights
        weights = [G[u][v]['weight'] for u, v in G.edges()]

        # Normalize the edge weights
        normalized_weights = [
            (weight - min(weights)) / (max(weights) - min(weights) + 0.001) for weight in weights]

        # Define a colormap based on the pair counts
        cmap = plt.cm.get_cmap('YlGnBu')

        # Draw the graph
        pos = nx.spring_layout(G)
        nx.draw_networkx_nodes(G, pos, node_color='lightgray', node_size=200)
        nx.draw_networkx_edges(G, pos, width=weights,
                               edge_color='lightblue', edge_cmap=cmap)

        # Add labels to the nodes
        nx.draw_networkx_labels(G, pos)

        # Show the graph
        plt.axis('off')
        plt.show()

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
                    if delta1 + delta2 <= 0:
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

                # Update previous pairs
                need_new_pairing = True
                for pp in previous_pairs:
                    if v1 in pp and v2 in pp:
                        pp[2] += 1
                        need_new_pairing = False
                if need_new_pairing:
                    previous_pairs.append([v1, v2, 1])

            group.append(v1)
            dead_vertices.add(v1)

            min_weight_grouping.append(group)
        return min_weight_grouping, previous_pairs


def make_groups_with_equal_teammates(graph, students, previous_pairs, emphasis_on_new_teams, group_size):
    group_size = int(group_size)

    # Add each student as a node to the graph
    for student in students:
        graph.add_vertex(student)

    # Get to overall average rating
    average_rating = sum(
        student.rating for student in students) / len(students)

    # Assign weights to edges between students
    for i in range(len(students)):
        for j in range(i + 1, len(students)):
            student1 = students[i]
            student2 = students[j]

            # Calculate the edge weight based on ratings
            edge_weight = abs(
                (student1.rating + student2.rating)/2 - average_rating)

            # Check the number of occurrences in previous pairings and increase the edge weight
            pair_count = 0
            is_forbidden = False
            for p in previous_pairs:
                if (student1 in p and student2 in p):
                    # data should look like this: (student1, student2, pair_count)
                    pair_count = p[2]
                    if pair_count == -1:
                        is_forbidden = True
            edge_weight += pair_count * emphasis_on_new_teams

            # Add weighted edge to the graph
            if pair_count != -1:
                graph.add_edge(student1, student2, edge_weight)

    # Find min weight matching
    matching, previous_pairs = graph.get_lowest_weight_group(
        previous_pairs, group_size)
    for i in range(3):
        graph.swap_students(matching)
    return matching, previous_pairs


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
            edge_weight = abs(student1.rating - student2.rating)

            # Check the number of occurrences in previous pairings and increase the edge weight
            pair_count = sum(
                1 for p in previous_pairs_set if student1 in p and student2 in p)
            is_forbidden = pair_count > 0 and any(
                p[2] == -1 for p in previous_pairs if student1 in p and student2 in p)
            edge_weight += pair_count * emphasis_on_new_teams

            # Add weighted edge to the graph
            if not is_forbidden:
                graph.add_edge(student1, student2, edge_weight)

    print("graph constructed")

    # Find min weight matching
    matching, previous_pairs = graph.get_lowest_weight_group(
        previous_pairs, group_size)
    for i in range(3):
        graph.swap_students(matching)
    return matching, previous_pairs


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
            # Check the number of occurrences in previous pairings and increase the edge weight
            pair_count = sum(
                1 for p in previous_pairs_set if student1 in p and student2 in p)
            is_forbidden = pair_count > 0 and any(
                p[2] == -1 for p in previous_pairs if student1 in p and student2 in p)
            edge_weight += pair_count * emphasis_on_new_teams

            # Add weighted edge to the graph
            if not is_forbidden:
                graph.add_edge(student1, student2, edge_weight)

    # Find min weight matching
    matching, previous_pairs = graph.get_lowest_weight_group(
        previous_pairs, group_size)
    for i in range(3):
        graph.swap_students(matching)
    return matching, previous_pairs


def make_groups_with_leaders(graph, students, previous_pairs, emphasis_on_new_teams, group_size):
    group_size = int(group_size)

    # Put leaders in a group
    leader_count = len(students) // group_size
    leaders = students[:leader_count]

    # Add each student as a node to the graph
    for student in students:
        graph.add_vertex(student)

    # Assign weights to edges between students
    pair_counts = {}
    forbidden_pairs = set()
    for i in range(len(students)):
        student1 = students[i]
        for j in range(i + 1, len(students)):
            student2 = students[j]
            # Calculate the length of students list
            num_students = len(students)

            # Get the overall average rating
            average_rating = sum(
                student.rating for student in students) / num_students
            edge_weight = average_rating

            # Calculate the edge weight based on ratings
            if student1 in leaders and student2 in leaders:
                edge_weight += 5

            # Check the number of occurrences in previous pairings and increase the edge weight
            if (student1, student2) in pair_counts:
                pair_count = pair_counts[(student1, student2)]
                if pair_count == -1:
                    forbidden_pairs.add((student1, student2))
                edge_weight += pair_count * emphasis_on_new_teams

            # Add weighted edge to the graph
            if (student1, student2) not in forbidden_pairs:
                graph.add_edge(student1, student2, edge_weight)

        # Find min weight matching
    matching, previous_pairs = graph.get_lowest_weight_group(
        previous_pairs, group_size)
    for i in range(3):
        graph.swap_students(matching)
    return matching, previous_pairs


def make_students(how_many_students):
    students = []
    for i in range(how_many_students):
        students.append(Student("student" + str(i), random.randint(1, 5)))
    return students


def draw_previous_pairs_graph(previous_pairs):
    # Create an empty graph
    G = nx.Graph()

    # Add edges with pair counts as edge attributes
    for edge in previous_pairs:
        student1, student2, pair_count = edge
        G.add_edge(student1.name, student2.name, weight=pair_count)

    # Extract edge weights
    weights = [G[u][v]['weight'] for u, v in G.edges()]

    # Normalize the edge weights
    normalized_weights = [(weight - min(weights)) /
                          (max(weights) - min(weights)+0.2) for weight in weights]

    # Define a colormap based on the pair counts
    cmap = plt.cm.get_cmap('YlGnBu')

    # Draw the graph
    pos = nx.spring_layout(G)
    nx.draw_networkx_nodes(G, pos, node_color='lightgray', node_size=200)
    nx.draw_networkx_edges(G, pos, width=weights,
                           edge_color='lightblue', edge_cmap=cmap)

    # Add labels to the nodes
    nx.draw_networkx_labels(G, pos)

    # Draw the edges with the normalized weights
    nx.draw_networkx_edges(G, pos, width=normalized_weights,
                           edge_color='lightblue', edge_cmap=cmap)

    # Show the graph
    plt.axis('off')
    plt.show()


# def main():
#     # Example usage of the pair_students function
#     students = [
#         Student("Daniel", 1),
#         Student("Baniel", 1),
#         Student("Shaniel", 2),
#         Student("Maniel", 2),
#         Student("Sydney", 3),
#         Student("Bidney", 4),
#         Student("Kidney", 5),
#         Student("Fidney", 5),
#         Student("James", 5),
#         Student("Ava", 3),
#         Student("David", 2),
#         Student("Emma", 1),
#         Student("Joseph", 4),
#         Student("Chloe", 2),
#         Student("Samuel", 3),
#         Student("Grace", 1),
#         # Student("Benjamin", 3),
#         # Student("Mia", 2),
#         # Student("William", 4),
#         # Student("Isabella", 1),
#         # Student("Michael", 2),
#         # Student("Ella", 3),
#         # Student("Jacob", 4),
#         # Student("Abigail", 2),
#         # Student("Alexander", 3),
#         # Student("Sofia", 5),
#         # Student("Matthew", 2),
#         # Student("Victoria", 1),
#         # Student("Ryan", 4),
#         # Student("Madison", 3),
#         # Student("Joshua", 5),
#         # Student("Lily", 5),
#         # Student("Nathan", 4),
#         # Student("Grace", 5),
#         # Student("Christopher", 5),
#         # Student("Zoe", 1),
#         # Student("Hannah", 5),
#         # Student("Anthony", 5),
#         # Student("Natalie", 5),
#         # Student("William", 1),
#         # Student("Elizabeth", 4),
#         # Student("David", 3),
#         # Student("Samantha", 2),
#         # Student("Joseph", 1),
#         # Student("Addison", 4),
#         # Student("Andrew", 3),
#         # Student("Avery", 2),
#         # Student("Nicholas", 1),
#         # Student("Evelyn", 4),
#         # Student("Tyler", 3),
#         # Student("Aria", 2),
#         # Student("Benjamin", 1),
#         # Student("Grace", 5),
#         # Student("Christian", 5),
#         # Student("Charlotte", 5),
#         # Student("Jonathan", 5),
#         # Student("Chloe", 5),
#         # Student("Julian", 3),
#         # Student("Sofia", 2),
#         # Student("Daniel", 1),
#         # Student("Ella", 4),
#         # Student("Samuel", 3),
#         # Student("Avery", 5),
#         # Student("Liam", 1),
#         # Student("Evelyn", 4),
#         # Student("Caleb", 3),
#         # Student("Scarlett", 5),
#         # Student("Elijah", 1),
#         # Student("Audrey", 4),
#         # Student("Gabriel", 3),
#         # Student("Hazel", 2),
#         # Student("Jackson", 1),
#         # Student("Brooklyn", 4),
#         # Student("Benjamin", 3),
#         # Student("Layla", 2),
#         # Student("Mason", 1),
#         # Student("Paisley", 4),
#         # Student("Samuel", 3),
#         # Student("Nora", 5),
#         # Student("Logan", 1),
#         # Student("Ellie", 4),
#         # Student("Daniel", 3),
#         # Student("Zoey", 2),
#         # Student("Christopher", 1),
#         # Student("Lucy", 4),
#         # Student("Jacob", 3),
#         # ...
#     ]

#     #students = make_students(100)

#     # Previous student pairings
#     previous_pairs = [
#         # ...
#     ]

#     # Special pairs of students that should never be paired
#     # forbidden pairs need to be added as a previous pairing with -1 ocurrences


#     # should priority be on newness or balanced teams:
#     emphasis_on_new_teams = 1 # higher = more newness

#     #Group sizes - how many students should be in each group
#     global group_size
#     group_size = 2


#     choice = 'y'
#     graph = Graph()

#     while choice.lower() == 'y':
#         # get initial groupings


#         def run_algorithm1():
#             previous_pairs = []
#             paired_students, previous_pairs = make_balanced_groups(graph, students, previous_pairs, emphasis_on_new_teams, group_size)
#             draw_previous_pairs_graph(previous_pairs)
#             graph.draw_graph()
#             # Clear the previous result display
#             result_text.delete("1.0", tk.END)
#             # Populate the result text widget with the paired students
#             for group in paired_students:
#                 add_line = True
#                 for student in group:
#                     line = "______________________________________________________________________________________________________________________________________________________"
#                     if add_line:
#                         result_text.insert(tk.END, str(line + "\n\n\t" + student.name) + "\t" + "\t" + str(
#                             student.rating) + "\n")
#                     else:
#                         result_text.insert(tk.END, str("\t" + student.name) + "\t" + "\t" + str(student.rating) + "\n")
#                     add_line = False

#         def run_algorithm2():
#             previous_pairs = []
#             paired_students, previous_pairs = make_groups_with_equal_teammates(graph, students, previous_pairs, emphasis_on_new_teams, group_size)
#             draw_previous_pairs_graph(previous_pairs)
#             graph.draw_graph()
#             # Clear the previous result display
#             result_text.delete("1.0", tk.END)

#             # Populate the result text widget with the paired students
#             for group in paired_students:
#                 add_line = True
#                 for student in group:
#                     line = "______________________________________________________________________________________________________________________________________________________"
#                     if add_line:
#                         result_text.insert(tk.END, str(line + "\n\n\t" + student.name) + "\t" + "\t" + str(
#                             student.rating) + "\n")
#                     else:
#                         result_text.insert(tk.END, str("\t" + student.name) + "\t" + "\t" + str(student.rating) + "\n")
#                     add_line = False

#         def run_algorithm3():
#             previous_pairs = []
#             paired_students, previous_pairs = make_groups_with_leaders(graph, students, previous_pairs, emphasis_on_new_teams, group_size)
#             draw_previous_pairs_graph(previous_pairs)
#             graph.draw_graph()
#             # Clear the previous result display
#             result_text.delete("1.0", tk.END)

#             # Populate the result text widget with the paired students
#             for group in paired_students:
#                 add_line = True
#                 for student in group:
#                     line = "______________________________________________________________________________________________________________________________________________________"
#                     if add_line:
#                         result_text.insert(tk.END, str(line + "\n\n\t" + student.name) + "\t" + "\t" + str(
#                             student.rating) + "\n")
#                     else:
#                         result_text.insert(tk.END, str("\t" + student.name) + "\t" + "\t" + str(student.rating) + "\n")
#                     add_line = False

#         # Create the Tkinter window
#         window = tk.Tk()
#         window.title("Teammate Pairs")

#         def update_group_size(event):
#             global group_size  # Declare 'group_size' as a global variable
#             group_sz = int(entry.get())  # Get the value from the entry box and convert it to an integer

#             group_size = group_sz
#             label.config(text="Group Size: " + str(group_size))  # Update the label with the new group size
#             entry.delete(0, tk.END)  # Clear the entry box

#         # Create a label for the entry box
#         label = tk.Label(window, text="Group Size: " + str(group_size))
#         label.grid(row=0, column=0, padx=5, pady=10, sticky="W")

#         # Create an entry box
#         entry = tk.Entry(window)
#         entry.grid(row=0, column=1, padx=5, pady=10, sticky="W")

#         # Configure the entry box to call the update_group_size function whenever the Enter key is pressed
#         entry.bind('<Return>', update_group_size)

#         # Create the buttons and place them side by side using the grid layout manager
#         button = tk.Button(window, text="Make Balanced Groups", command=run_algorithm1)
#         button.grid(row=0, column=2, padx=5, pady=10, sticky="W")

#         button1 = tk.Button(window, text="Make Even Students Groups", command=run_algorithm2)
#         button1.grid(row=0, column=3, padx=5, pady=10, sticky="W")

#         button2 = tk.Button(window, text="Make Groups With Leaders", command=run_algorithm3)
#         button2.grid(row=0, column=4, padx=5, pady=10, sticky="W")

#         # Create a text widget to display the result
#         result_text = tk.Text(window, width=150, height=40)
#         result_text.grid(row=1, column=0, columnspan=5, padx=10, pady=10)

#         # Configure the font size of the result text widget
#         result_font = font.Font(size=12, family="Verdana")
#         result_text.configure(font=result_font)

#         # Create a scrollbar for the result text widget
#         scrollbar = tk.Scrollbar(window, command=result_text.yview)
#         scrollbar.grid(row=1, column=5, sticky="NS")
#         result_text.config(yscrollcommand=scrollbar.set)

#         # Start the Tkinter event loop
#         window.mainloop()
#         #####################################################################################################


#         # Ask the user if they want to generate another pairing
#         choice = input("\nGenerate another pairing? (y/n): \n")


# if __name__ == "__main__":
#     main()
