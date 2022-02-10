import got from 'got';
import input from 'input';

async function github(username) {
    const resp = got(`https://api.github.com/users/${username}/repos`)
    const data = await resp.json();
    return data;
}
function display(projects) {


    const sorted = projects.sort((projectA, projectB) => {
        const a = projectA.stargazers_count;
        const b = projectB.stargazers_count;
        if (a > b) {
            return -1;
        } else if (a < b) {
            return 1;
        } else {
            return 0
        }
    });
    for (let project of sorted) {
        console.log(`${project.stargazers_count} ${project.name}`)
    }
}
async function main() {
    const resp = await input.text('What is your username?');
    const repos = await github(resp);
    display(repos);
}

main();