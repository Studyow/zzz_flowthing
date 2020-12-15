

# S = [x[1,5,8], y[2,3,4, z[6,7,9]]

# data = 
# print(s)

class Sec:
    def __init__(self, x, y):
        self.xpart = x
        self.ypart = y

    def printWhose(self):
        print(self.xpart, self.ypart)


s_new = Sec([1,2,3],[7,8,9])
s_new.printWhose()
# print(S(1,2,3))



# scanning absence if != ord(QR) #if (true) conflict



# Title: performance
# top=[1,2,3,4,5,6,7,8,9]
# sub=[]
# print('top=', top[:3])
# print('sub = ', sub+top[2:])