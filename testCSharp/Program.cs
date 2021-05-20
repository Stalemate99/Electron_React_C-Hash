using System;
using ElectronCgi.DotNet;

namespace testCSharp
{
    class Program
    {
        static void Main(string[] args)
        {
            var connection = new ConnectionBuilder()
                .WithLogging()
                .Build();
            
            connection.On("greeting", (string name) =>
            {
                return $"Hello {name}!";
            });

            connection.On("add",(int num) => {
                return num+1;
            });
            
            connection.Listen();   
        }
    }
}
