using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;


namespace ClassDataGenerator
{
    class Program
    {
        static void Main(string[] args)
        {
            if (args.Length != 2)
            {
                Console.WriteLine("Please enter arguments: 1. text file path, 2. output path");
                Console.WriteLine("Enter the first path and hit enter, then enter the second path and hit enter.");
                args = new string[2];
                args[0] = Console.ReadLine();
                args[1] = Console.ReadLine();
            }

            try
            {
                string JSON = ReadFile(args[0]);
                WriteFile(args[1], JSON);
            }
            catch (Exception e)
            {
                Console.WriteLine("Error:\n" + e.Message);
                Console.ReadLine();
            }

        }

        static string ReadFile(string path)
        {
            string data = File.ReadAllText(path);
            var classList = Parser.ParseClasses(data);
            var JSON = Parser.ToJson(classList);

            return JSON;
        }

        static void WriteFile(string path, string JSON)
        {
            using (StreamWriter file = new StreamWriter(path))
            {
                file.Write(JSON);
            }
        }
    }

    public class CSEClass
    {
        public string ID { get; set; }
        public string ClassNum { get; set; }
        public string ClassName { get; set; }
        public string Professor { get; set; }
        public string Description { get; set; }
    }

    public class Parser
    {
        public static List<CSEClass> ParseClasses(string classData)
        {

            var list = classData.Split('\n', StringSplitOptions.RemoveEmptyEntries)
                .Select(x => x.Replace("\r", ""))
                .Select(x => x.Replace("\"", ""))
                .Select(x => x.Split('\t'))
                .Select(x => new CSEClass
                {
                    ID = x[0],
                    ClassNum = x[1],
                    ClassName = x[2],
                    Professor = x[3],
                    Description = x[4],
                })
                .Select(x => 
                {
                    Console.WriteLine($"{x.ID} {x.ClassNum} {x.ClassName} {x.Professor} {x.Description}");
                    return x;
                })
                .ToList();

            list.RemoveAt(0);

            return list;
        }

        // Due to formatting of Firebase, we manually serialize
        public static string ToJson(List<CSEClass> classData)
        {
            string classesJSON = "";
            foreach (var classObj in classData)
            {
                classesJSON += $"\"{classObj.ID}\":{{\"classnum\":\"{classObj.ClassNum}\",";
                classesJSON += $"\"classname\":\"{classObj.ClassName}\",";
                classesJSON += $"\"professor\":\"{classObj.Professor}\",";
                classesJSON += $"\"description\":\"{classObj.Description}\"}}";

                if (classObj != classData.Last())
                {
                    classesJSON += ",";
                }
            }

            string finalJson = $"{{\"classes\":{{{classesJSON}}}}}";

            return finalJson;
        }
    }
}
