module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins:[[
      "import",
    {
      libraryName:"ant-desigin-vue",
      libraryDirectory: "es",
      style: "true"
    }
  ]]
}
