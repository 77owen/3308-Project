-- SQL Queries for Scheduling Website
-- 03/04/2022
-- Team 0



-- Gets

-- Get Entire Tables
SELECT * FROM cart;

SELECT * FROM schedules WHERE ScheduleNumber = 2; -- update 2 with schedule number 

SELECT * FROM userinfo;

-- Get Classes from Cart or Schedule
SELECT Class1, Class2, Class3, Class4, Class5, Class6, Class7, Class8, Class9, Class10
	FROM cart
	WHERE UserID = 1; -- 1 will need to be changed for user, might need subquery
    
SELECT Class1, Class2, Class3, Class4, Class5, Class6, Class7, Class8, Class9, Class10
	FROM schedules
    WHERE userID = 1 AND 
    ScheduleNumber = 2; -- 1 will need to be changed for user, might need subquery      2 nees to be updated with schedule number saved
    
-- Get Email/Username for forgot password
SELECT Email
	FROM UserInfo
    WHERE UserID = 1; -- 1 will need to be changed for user, might need subquery

SELECT Username
	FROM UserInfo
    WHERE Email = ""; -- "" will need to be changed for email input from user
    
-- Get Basic User Info
-- Maybe for a profile page for users to see their info
-- Maybe add dark/light preference mode for database to store
SELECT FirstName
	FROM UserInfo
    WHERE UserID = 1; -- 1 will need to be changed for user, might need subquery
    
SELECT LastName
	FROM UserInfo
    Where UserID = 1; -- 1 will need to be changed for user, might need subquery
    
SELECT Email
	FROM UserInfo
    Where UserID = 1; -- 1 will need to be changed for user, might need subquery
    
SELECT Username
	FROM UserInfo
    Where UserID = 1; -- 1 will need to be changed for user, might need subquery
    
-- Get individual class info in case its easier than parsing entire tables
-- replace # with the class# stored... class1-10
SELECT Class#
	FROM Cart
    WHERE UserID = 1; -- 1 will need to be changed for user, might need subquery
    
SELECT Class#
	FROM Schedules
    WHERE UserID = 1 AND 
    ScheduleNumber = 2; -- 1 will need to be changed for user, might need subquery      2 needs to be updated for schedule number wanted
    
-- Insert/Set things.... yeah :/
 
-- Insert fresh


-- set UserInfo
UPDATE UserInfo
	SET variable = "" -- change variable to column name and "" to what you want to put in
    WHERE UserID = 1; -- change 1 to correct userID
    
UPDATE Cart
	SET Class# = ""
    WHERE UserID = 1; -- change 1 to correct userID
    
UPDATE Schedules
	SET Class# = ""
    WHERE UserID = 1 AND -- change 1 to correct userID
		ScheduleNumber = 2; -- update 2 to schedule number pulled

    

	