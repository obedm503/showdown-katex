## Examples

You can write math in 2 ways: inline and code block. Inline refers to using delimiters: `$$ latex here $$` and `~ asciimath here ~`, or any custom delimiters. Code block style refers to using tagged markdown code blocks. The tags can be either `latex` or `asciimath`. Because code block style is more limited, `displayMode` will be the `displayMode` passed to the extension config or the [katex default](https://github.com/Khan/KaTeX#rendering-options).

### Inline

<div class="row" markdown="1">
  <div class="col col-md-6"  markdown="1">
    Lorem ipsum dolor sit amet, ~E=mc^2~ consectetur adipiscing elit. Pellentesque porttitor, mauris a luctus aliquam, tellus purus porta nulla, eget finibus dolor dolor nec justo.
  </div>
  <div class="col col-md-6" markdown="1">
Lorem ipsum dolor sit amet, ~E=mc^2~ consectetur adipiscing elit. Pellentesque porttitor, mauris a luctus aliquam, tellus purus porta nulla, eget finibus dolor dolor nec justo.
  </div>
</div>

### Code Block

<div class="row" markdown="1">
  <div class="col col-md-6"  markdown="1">
    ```asciimath
    E=mc^2
    ```
  </div>
  <div class="col col-md-6" markdown="1">
```asciimath
E=mc^2
```
  </div>
</div>

### square roots

<div class="row" markdown="1">
  <div class="col-md-8"  markdown="1">
    ```asciimath
    c = +- sqrt(a^2 + b^2)
    ```
  </div>
  <div class="col-md-4" markdown="1">
```asciimath
c = +- sqrt(a^2 + b^2)
```
  </div>
</div>

<div class="row" markdown="1">
  <div class="col-md-8" markdown="1">
    ```latex
    c = \pm\sqrt{a^2 + b^2}
    ```
  </div>
  <div class="col-md-4" markdown="1">
```latex
c = \pm\sqrt{a^2 + b^2}
```
  </div>
</div>

---

### sumations

<div class="row" markdown="1">
  <div class="col-md-8" markdown="1">
    ```asciimath
    sum_(i=1)^n i^3=((n(n+1))/2)^2
    ```
  </div>
  <div class="col-md-4" markdown="1">
```asciimath
sum_(i=1)^n i^3=((n(n+1))/2)^2
```
  </div>
</div>
<div class="row" markdown="1">
  <div class="col-md-8" markdown="1">
    ```latex
    \sum_{i=1}^n i^3 = \left( \frac{n(n+1)} 2 \right) ^2
    ```
  </div>
  <div class="col-md-4" markdown="1">
```latex
\sum_{i=1}^n i^3 = \left( \frac{n(n+1)} 2 \right) ^2
```
  </div>
</div>

---

### simple functions

<div class="row" markdown="1">
  <div class="col-md-8" markdown="1">
    ```asciimath
    lim_(x->0) = f(x)' = 2x + 5
    ```
  </div>
  <div class="col-md-4" markdown="1">
```asciimath
lim_(x->0) = f(x)' = 2x + 5
```
  </div>
</div>

<div class="row" markdown="1">
  <div class="col-md-8" markdown="1">
    ```latex
    \lim_{x \to{0}} = f(x)' = 2x + 5
    ```
  </div>
  <div class="col-md-4" markdown="1">
```latex
\lim_{x \to{0}} = f(x)' = 2x + 5
```
  </div>
</div>

---

### more complex math

<div class="row" markdown="1">
  <div class="col-md-8" markdown="1">
    ```latex
    \begin{aligned}
    F(\textbf{w})
    &= \sum_{k=1}^{K} \frac{n_k}{N} F_{k}(\textbf{w}) \\
    &= \sum_{k=1}^{K} \frac{n_k}{N} \frac{1}{n_k} \sum_{i \in \mathcal{P}_{k}} l(\textbf{x}_{i}, \textbf{y}_{i}; \textbf{w})
    \end{aligned}
    ```
  </div>
  <div class="col-md-4" markdown="1">
```latex
\begin{aligned}
F(\textbf{w})
&= \sum_{k=1}^{K} \frac{n_k}{N} F_{k}(\textbf{w}) \\
&= \sum_{k=1}^{K} \frac{n_k}{N} \frac{1}{n_k} \sum_{i \in \mathcal{P}_{k}} l(\textbf{x}_{i}, \textbf{y}_{i}; \textbf{w})
\end{aligned}
```
  </div>
</div>
